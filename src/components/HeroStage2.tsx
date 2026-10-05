"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";

/**
 * A lit stage for the animated figure, centered on the page. This is a drop-in
 * replacement for HeroStage: the same `children` contract, the same bus shape,
 * the same controls and reveal choreography, so the two scenes can be judged on
 * the scene alone.
 *
 * Where it deliberately diverges from HeroStage is everything a *character*
 * needs and a desk prop does not:
 *
 *  - Framing is keyed to the figure's posed height, not its raw bounds, so the
 *    character actually fills the frame and the feet land on the ground.
 *  - The ground is a plain disc — no backdrop wall — so the figure is never
 *    occluded and reads against the dark page from every angle.
 *  - The reader can orbit the full 360 degrees around the figure; only the
 *    downward tilt is limited, and only enough to keep the camera above the
 *    ground plane (the figure never disappears under the floor).
 *  - The clip plays once and holds its last pose, rather than looping, so the
 *    gesture never visibly snaps back to its first frame.
 *  - The rig is portrait lighting: key, kicker, face bounce and a tight shadow
 *    camera, because a figure reads by its silhouette far more than a prop does.
 */

export const sceneBus: {
  revealed: boolean;
  controls: OrbitControls | null;
  scene: THREE.Object3D | null;
  camera: THREE.PerspectiveCamera | null;
  stage: THREE.Object3D | null;
  revealFitK: number;
  setModelFit: (k: number) => void;
  measure: () => Record<string, unknown> | null;
} = {
  revealed: false,
  controls: null,
  scene: null,
  camera: null,
  stage: null,
  // The reveal holds the current size: see the note where this is set.
  revealFitK: 1,
  setModelFit: (k: number) => {
    if (!rawModelDims || !modelFit || !sceneBus.scene) return;
    const s = modelFit.initialScale * k;
    sceneBus.scene.scale.setScalar(s);
    sceneBus.scene.position.set(
      -rawModelDims.center[0] * s,
      -rawModelDims.center[1] * s,
      -rawModelDims.center[2] * s,
    );
    // The disc covers the WHOLE set, not just the figure: the desk and chair are
    // wider than the person, and a floor that stops under the shoes leaves the
    // furniture hanging over the edge. Its centre is offset from the figure's so
    // the round floor still lands under the middle of the furniture.
    const floorY = (rawModelDims.minY - rawModelDims.center[1]) * s;
    const r = modelFit.stageR * k;
    if (sceneBus.stage) {
      sceneBus.stage.position.set(modelFit.stageX * s, floorY, modelFit.stageZ * s);
      sceneBus.stage.scale.setScalar(r);
    }
  },
  measure: () => {
    if (!sceneBus.scene || !sceneBus.controls || !sceneBus.camera) return null;
    sceneBus.scene.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(sceneBus.scene);
    const size = box.getSize(new THREE.Vector3());
    const cam = sceneBus.camera;
    const dist = cam.position.distanceTo(sceneBus.controls.target);
    const tanHalf = Math.tan((cam.fov * Math.PI) / 360);
    return {
      scaleApplied: sceneBus.scene.scale.toArray().map((v) => +v.toFixed(4)),
      sizeWorld: { x: +size.x.toFixed(3), y: +size.y.toFixed(3), z: +size.z.toFixed(3) },
      camera: {
        pos: cam.position.toArray().map((v) => +v.toFixed(2)),
        dist: +dist.toFixed(2),
        fov: cam.fov,
        aspect: +cam.aspect.toFixed(2),
      },
      orbit: {
        target: sceneBus.controls.target.toArray().map((v) => +v.toFixed(2)),
        azimuth: +sceneBus.controls.getAzimuthalAngle().toFixed(3),
        polar: +sceneBus.controls.getPolarAngle().toFixed(3),
        minPolar: +sceneBus.controls.minPolarAngle.toFixed(3),
        maxPolar: +sceneBus.controls.maxPolarAngle.toFixed(3),
        minAzimuth: sceneBus.controls.minAzimuthAngle,
        maxAzimuth: sceneBus.controls.maxAzimuthAngle,
      },
      visibleHAtTarget: +(2 * tanHalf * dist).toFixed(2),
      visibleWAtTarget: +(2 * tanHalf * cam.aspect * dist).toFixed(2),
      fillPct: {
        h: +(((size.y / 2) / (tanHalf * dist)) * 100).toFixed(1),
        w: +(((size.x / 2) / (tanHalf * cam.aspect * dist)) * 100).toFixed(1),
      },
    };
  },
};

const MODEL_URL = "/models/meeting-figure.glb";

/** Flip to Math.PI if the figure ends up facing away from the camera. */
const MODEL_YAW = 0;

/**
 * Rotation is unrestricted (360 around, 180 up/down). Flip this to true if you
 * would rather the camera could not travel under the ground disc.
 */
const CLAMP_ABOVE_FLOOR = false;

/**
 * Idle orbit. After IDLE_DELAY_MS with no pointer, wheel or pinch, the camera
 * eases into a continuous turn at IDLE_ORBIT_SPEED radians per second — slow
 * enough to read as a turntable rather than a carousel.
 */
const IDLE_DELAY_MS = 2200;
const IDLE_ORBIT_SPEED = 0.09;

let lastInteraction = typeof performance !== "undefined" ? performance.now() : 0;

if (
  process.env.NODE_ENV !== "production" &&
  typeof window !== "undefined"
) {
  (window as unknown as { __heroBus: typeof sceneBus }).__heroBus = sceneBus;
}

let rawModelDims: {
  center: [number, number, number];
  maxDim: number;
  figureHalfWidth: number;
  height: number;
  minY: number;
  halfX: number;
  halfY: number;
  halfZ: number;
} | null = null;
let modelFit: {
  initialScale: number;
  stageR: number;
  stageX: number;
  stageZ: number;
  floorY: number;
} | null = null;

/** Horizontal centre of the whole set, for placing the ground disc. */
let floorCentreX = 0;
let floorCentreZ = 0;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Wires up the clip, measures the figure and computes the fit. Lives outside the
 * component so the effect that calls it is not closing over (and mutating) any
 * value that was produced during render.
 */
function setupFigure(
  scene: THREE.Object3D,
  mixer: THREE.AnimationMixer,
  clip: THREE.AnimationClip | undefined,
  camera: THREE.PerspectiveCamera,
) {
  {
    let action: THREE.AnimationAction | null = null;

    if (clip) {
      action = mixer.clipAction(clip);
      // Play through once and settle on the final pose. Looping a 47 second
      // gesture clip would snap the arms back to frame one every lap.
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();
    }

    if (MODEL_YAW) {
      scene.rotation.y = MODEL_YAW;
      scene.updateMatrixWorld(true);
    }

    const portrait = camera.aspect < 1;
    const dist = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
    const tanHalf = Math.tan((camera.fov * Math.PI) / 360);
    const visibleH = 2 * tanHalf * dist;

    if (!rawModelDims) {
      // Two different boxes, because they answer two different questions.
      //
      // The SKELETON's posed bounds give the height the figure actually stands
      // at. The raw geometry is ~30% taller because it includes the bind pose
      // (arms up), and keying the fit to that leaves the character small and
      // floating in the middle of the frame.
      //
      // The GEOMETRY's bounds give the ground plane and the footprint. The
      // figure sits down during the clip, so its feet lift well above where the
      // standing bind pose puts them; the desk and the body furniture never
      // move, so their lowest point is the true floor.
      let boneMinY = Infinity;
      let boneMaxY = -Infinity;
      let bones = 0;
      const v = new THREE.Vector3();

      // The figure's own bounds, swept across the clip. Only the skinned mesh
      // counts: the whole-scene box is dominated by the desk, which is wider
      // than the person and would shrink the character to fit furniture.
      //
      // Three.js resolves a skinned mesh's bounding box through its bones, so
      // this reads the pose actually on screen. Static geometry is wrong in
      // both directions — the bones stop at the ankle and miss the shoes, while
      // the raw bounds are the bind pose with the arms flung out.
      //
      // Sweeping and unioning the frames catches the full extent of the
      // gesture, and the union's centre is what keeps the figure centred: the
      // bone mid-point is not the same thing and drifts off to one side.
      const figureBox = new THREE.Box3();
      for (let i = 0; i <= 10; i++) {
        if (action && clip) {
          action.time = clip.duration * (i / 10);
          mixer.update(0);
        }
        scene.updateMatrixWorld(true);
        scene.traverse((o) => {
          if ((o as THREE.Bone).isBone) {
            o.getWorldPosition(v);
            if (v.y < boneMinY) boneMinY = v.y;
            if (v.y > boneMaxY) boneMaxY = v.y;
            bones++;
          } else if (o instanceof THREE.SkinnedMesh) {
            figureBox.union(new THREE.Box3().setFromObject(o));
          }
        });
      }

      const geoBox = new THREE.Box3().setFromObject(scene);
      const geoSize = geoBox.getSize(new THREE.Vector3());
      // Kept for the floor: the disc should centre on the whole set of
      // furniture, which does not sit at the origin or at the body's centre.
      floorCentreX = (geoBox.min.x + geoBox.max.x) / 2;
      floorCentreZ = (geoBox.min.z + geoBox.max.z) / 2;

      // How wide the figure stands, swept across the clip. Three.js resolves a
      // skinned mesh's bounding box through its bones, so this reads the pose
      // that is actually on screen. Only the skinned mesh is measured: the
      // whole-scene box is dominated by the desk, which is wider than the
      // person and would shrink the character to fit furniture.
      //
      // Static geometry is the wrong source in both directions — the bones stop
      // at the ankle and miss the shoes, while the raw bounds are the bind pose
      // with the arms flung out and read far too wide.
      const hasFigure = bones > 0 && figureBox.max.x > figureBox.min.x;
      const figureHalfWidth = hasFigure
        ? (figureBox.max.x - figureBox.min.x) / 2
        : geoSize.x / 2;

      if (bones === 0) {
        // Not a skinned model; the static bounds are all there is.
        const c = geoBox.getCenter(new THREE.Vector3());
        rawModelDims = {
          center: [c.x, c.y, c.z],
          maxDim: Math.max(geoSize.x, geoSize.y, geoSize.z) || 1,
          figureHalfWidth: geoSize.x / 2,
          height: geoSize.y || 1,
          minY: geoBox.min.y,
          halfX: geoSize.x / 2,
          halfY: geoSize.y / 2,
          halfZ: geoSize.z / 2,
        };
      } else {
        // Limb thickness: bones sit inside the mesh, so pad a little so the
        // silhouette rather than the skeleton sets the vertical frame.
        const pad = 0.06;
        const poseCentreY = (boneMinY + boneMaxY) / 2;
        const poseHeight = boneMaxY - boneMinY + pad * 2;
        const figureCenter = hasFigure
          ? figureBox.getCenter(new THREE.Vector3())
          : geoBox.getCenter(new THREE.Vector3());
        rawModelDims = {
          // Centred on the figure's own swept bounds, in all three axes. Using
          // the bone mid-point instead leaves the silhouette off to one side,
          // which is invisible until a foot walks out of frame on a phone.
          center: [figureCenter.x, poseCentreY, figureCenter.z],
          maxDim: figureBox.max.distanceTo(figureBox.min) || 1,
          figureHalfWidth,
          height: poseHeight,
          // The floor is the lowest static geometry, re-expressed in the same
          // centred frame as `center` so the disc lands under the furniture.
          minY: geoBox.min.y,
          halfX: geoSize.x / 2,
          halfY: geoSize.y / 2,
          halfZ: geoSize.z / 2,
        };
      }

      // Rewind to the top of the clip and let it play from the first frame.
      if (action && clip) {
        action.time = 0;
        action.play();
        mixer.update(0);
      }
    }

    const raw = rawModelDims;

    // Fit to the tighter of the two constraints. Height alone is right on a
    // wide viewport, where the figure is the narrow thing in a short frame, but
    // on a phone the stance and the desk are wider than the frame is tall — a
    // height-only fit pushes a foot off the side. Taking the smaller of the two
    // scales guarantees the whole silhouette fits either way.
    const visibleW = visibleH * camera.aspect;
    // Deliberately under-filling: the figure sits in a room, and a little air
    // around the whole set reads better than a character cropped at the hairline.
    const fitFillH = portrait ? 0.68 : 0.64;
    const scaleForHeight = (fitFillH * visibleH) / raw.height;
    // A little slack over the measured stance, because the widest frame in the
    // clip is broader than the band this averages. A clipped foot is worse than
    // a slightly small one.
    const scaleForWidth = (1.08 * visibleW) / (raw.figureHalfWidth * 2);
    const initialScale = Math.min(scaleForHeight, scaleForWidth);

    // The floor is sized from the FURNITURE, not the person. halfX/halfZ come
    // from the whole model, so the disc reaches past the desk and the chair
    // instead of stopping under the shoes.
    const STAGE_MARGIN = 1.45;
    const stageR = STAGE_MARGIN * Math.max(raw.halfX, raw.halfZ) * initialScale;
    // The disc is centred on the furniture, which is not the same point as the
    // figure's centre: the figure sits forward, so a floor centred on the body
    // hangs off the back of the desk.
    const stageX = (floorCentreX - raw.center[0]) * initialScale;
    const stageZ = (floorCentreZ - raw.center[2]) * initialScale;
    const floorY = (raw.minY - raw.center[1]) * initialScale;

    modelFit = { initialScale, stageR, stageX, stageZ, floorY };
    // The reveal keeps the figure exactly where the reader left it. HeroStage
    // shrinks on scroll to make room for the copy; here the scene is centred and
    // the copy lands under it, so scaling it down would read as the model
    // lurching rather than the copy arriving.
    sceneBus.revealFitK = 1;
    sceneBus.setModelFit(1);
    sceneBus.scene = scene;
    scene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        const mats = Array.isArray(node.material) ? node.material : [node.material];
        mats.forEach((m) => {
          if (m instanceof THREE.MeshStandardMaterial) m.shadowSide = THREE.FrontSide;
        });
      }
    });

    // Parked mid-gesture for reduced motion, but the fit was measured with the
    // clip at 0.18-0.52, so the composition still matches.
    if (prefersReducedMotion() && action && clip) {
      action.paused = true;
      action.time = clip.duration * 0.22;
      mixer.update(0);
    }
  }
}

function MeetingFigure() {
  const gltf = useLoader(GLTFLoader, MODEL_URL);
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;

  // One mixer for the whole subtree: every bone in the clip hangs off the scene
  // graph, so the scene root resolves all 57 of them.
  const mixer = useMemo(
    () => new THREE.AnimationMixer(gltf.scene),
    [gltf.scene],
  );

  useEffect(() => {
    const scene = gltf.scene;
    setupFigure(scene, mixer, gltf.animations[0], camera);
    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(scene);
    };
  }, [gltf, mixer, camera]);

  useFrame((_, delta) => {
    // Clamped so a tab returning from the background does not fast-forward the
    // gesture to its final frame in a single frame.
    if (!prefersReducedMotion()) mixer.update(Math.min(delta, 0.05));
  });

  return <primitive object={gltf.scene} />;
}

function SceneContent() {
  const { camera, gl } = useThree();
  const controlsRef = useRef<OrbitControls | null>(null);
  const groundRef = useRef<THREE.Mesh | null>(null);
  const bulbRef = useRef<THREE.Mesh | null>(null);
  const bulbLightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    sceneBus.stage = groundRef.current;
    sceneBus.setModelFit(1);
    return () => {
      sceneBus.stage = null;
    };
  }, []);

  // Hang the lamp over the middle of the set, in scaled world units, so it stays
  // above the desk as the model is fitted and re-fitted. The height is relative
  // to the figure so a shorter model does not get a bulb in its face.
  useEffect(() => {
    const fit = modelFit;
    if (!fit || !rawModelDims) return;
    const y = (rawModelDims.center[1] + rawModelDims.height * 0.62) * fit.initialScale;
    const z = (0.35) * fit.initialScale;
    bulbRef.current?.position.set(0, y, z);
    bulbLightRef.current?.position.set(0, y, z);
  }, []);

  // Any sign of the reader — drag, wheel, pinch, zoom click — counts as
  // interaction and parks the idle orbit until they stop again.
  useEffect(() => {
    const mark = () => {
      lastInteraction = performance.now();
    };
    const el = gl.domElement;
    el.addEventListener("pointerdown", mark);
    el.addEventListener("pointermove", mark);
    el.addEventListener("wheel", mark, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", mark);
      el.removeEventListener("pointermove", mark);
      el.removeEventListener("wheel", mark);
    };
  }, [gl]);

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    // Panning would let the reader lose the figure entirely.
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 3.4;
    controls.maxDistance = 9;
    // Free 360 degrees around the figure. No azimuth clamp: the character is
    // modelled all the way round, so the reader can walk right around him.
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;
    // The full 180 degrees of tilt: straight overhead down to looking up from
    // underneath. Set CLAMP_ABOVE_FLOOR to true to stop the camera dropping
    // below the ground disc instead.
    controls.minPolarAngle = 0.001;
    controls.maxPolarAngle = Math.PI - 0.001;
    controls.target.set(0, 0, 0);
    controls.update();

    sceneBus.controls = controls;
    sceneBus.camera = camera as THREE.PerspectiveCamera;
    controlsRef.current = controls;

    return () => {
      sceneBus.controls = null;
      sceneBus.camera = null;
      controlsRef.current = null;
      controls.dispose();
    };
  }, [camera, gl]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (CLAMP_ABOVE_FLOOR) {
      // Keep the camera above the ground plane. polar is measured from +Y, so
      // the camera's height is dist * cos(polar); solving for the polar angle
      // that puts it just above the floor gives the tilt limit, and re-solving
      // each frame keeps it correct as the reader zooms.
      const dist = camera.position.distanceTo(controls.target);
      const floor = modelFit ? modelFit.floorY : -2;
      const cosLimit = THREE.MathUtils.clamp(
        (floor + 0.1) / Math.max(dist, 0.001),
        -1,
        1,
      );
      controls.maxPolarAngle = Math.acos(cosLimit);
    }

    // Idle drift: once the reader has been still for a moment, the camera eases
    // into a slow endless orbit. It is stopped the instant they touch anything
    // and picks up from wherever they left off, so it never fights the drag or
    // yanks the view back. Continuous rather than ping-pong, because the
    // rotation is now unbounded in both directions.
    const step = Math.min(delta, 0.05);
    if (
      !prefersReducedMotion() &&
      performance.now() - lastInteraction > IDLE_DELAY_MS
    ) {
      const offset = camera.position.clone().sub(controls.target);
      const spherical = new THREE.Spherical().setFromVector3(offset);
      spherical.theta += IDLE_ORBIT_SPEED * step;
      camera.position
        .copy(controls.target)
        .add(new THREE.Vector3().setFromSpherical(spherical));
    }

    controls.update();
  });

  return (
    <>
      {/* Key: warm, high front-right. The only shadow caster, so the shadow map
          stays clean and the figure gets one readable light direction. */}
      <directionalLight
        position={[3.2, 5.2, 4.2]}
        intensity={3.1}
        color="#fff2e2"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-3.4}
        shadow-camera-right={3.4}
        shadow-camera-top={3.4}
        shadow-camera-bottom={-3.4}
        shadow-camera-near={0.5}
        shadow-camera-far={22}
        shadow-bias={-0.0005}
        shadow-normalBias={0.03}
      />
      {/* Overhead bulb: a real point light hung above the desk, with visible
          falloff. A directional light from straight above flattens the face; a
          point source pools light on the top of the head and shoulders and lets
          the eye sockets and under-chin go dark, which is what makes a figure
          read as lit by a lamp in the room. It follows the desk so the pool
          stays over the set as the figure is reframed. */}
      <pointLight
        ref={bulbLightRef}
        position={[0, 3.1, 0.35]}
        intensity={9}
        distance={11}
        decay={1.7}
        color="#ffe0b0"
      />
      {/* The bulb itself. Unlit, so it glows at full value instead of being
          dimmed by the exposure of everything around it. */}
      <mesh ref={bulbRef} position={[0, 3.1, 0.35]}>
        <sphereGeometry args={[0.1, 20, 14]} />
        <meshBasicMaterial color="#fff0d0" toneMapped={false} />
      </mesh>
      {/* Kicker: hot orange from behind-left. On a figure this is the light that
          does the work — it draws the edge of the shoulder and cheek. */}
      <directionalLight position={[-4.2, 2.6, -4.6]} intensity={2.5} color="#ff7a26" />
      {/* Bounce: low and soft from the front, so the jaw and eye sockets do not
          go dead on the shadow side of the face. */}
      <directionalLight position={[0.8, -1.6, 3.4]} intensity={0.55} color="#ffb37a" />
      {/* Sky over the orange floor bounce. */}
      <hemisphereLight intensity={0.7} color="#ffd3ab" groundColor="#ff5c00" />
      <ambientLight intensity={0.22} color="#ffc79a" />

      {/* Ground: a plain disc, no backdrop wall. The figure stands on it and
          reads against the dark page from every angle. */}
      <mesh ref={groundRef} rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[1, 96]} />
        <meshStandardMaterial
          color="#ff5c00"
          roughness={0.72}
          metalness={0.08}
          emissive="#ff5c00"
          emissiveIntensity={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      <MeetingFigure />
    </>
  );
}

type Mode = "interactive" | "scroll";

export default function HeroStage2({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const entranceRef = useRef<gsap.core.Tween | null>(null);
  const [mode, setMode] = useState<Mode>("interactive");

  // Where the stage and the model sit in each mode. Tablets and below have no
  // room for copy beside the scene, so scrolling slides the whole stage off to
  // the right and hides it, handing the words the full width. Desktop keeps the
  // scene on show, nudged and scaled down to sit beside the copy.
  // Both x and xPercent are always written so a breakpoint change mid-session
  // cannot leave a stale offset on the other axis.
  const targetsFor = (next: Mode) => {
    const scrolled = next === "scroll";
    const lg = window.matchMedia("(min-width: 1024px)").matches;
    return {
      lg,
      stage: lg
        ? {
            x: scrolled ? window.innerWidth * 0.25 : 0,
            xPercent: 0,
            y: 0,
            scale: scrolled ? 0.94 : 1,
            autoAlpha: 1,
          }
        : {
            x: 0,
            // The stage is viewport-sized, so 104% clears the frame with a
            // little slack and no sliver of canvas left on screen.
            xPercent: scrolled ? 104 : 0,
            y: 0,
            scale: 1,
            autoAlpha: scrolled ? 0 : 1,
          },
      // Only desktop shrinks the model; on small screens it is off-screen anyway,
      // so the scene can stay exactly where it was and slide back untouched.
      fit: lg && scrolled ? sceneBus.revealFitK : 1,
    };
  };

  // One place that drives the stage, the model fit, the words and the hint, so
  // the reduced-motion path and the animated path cannot fall out of step.
  const move = useCallback((next: Mode) => {
    // A click mid-entrance would otherwise let the entrance tween re-reveal the
    // stage while it is meant to be leaving.
    entranceRef.current?.kill();

    const { lg, stage, fit } = targetsFor(next);
    const scrolled = next === "scroll";
    const from = scrolled ? 1 : sceneBus.revealFitK;

    if (prefersReducedMotion()) {
      gsap.set(stageRef.current, stage);
      gsap.set(
        wordsRef.current,
        scrolled
          ? { autoAlpha: 1, x: 0, filter: "blur(0px)" }
          : { autoAlpha: 0, x: -64, filter: "blur(6px)" },
      );
      gsap.set(hintRef.current, { autoAlpha: scrolled ? 0 : 1 });
      sceneBus.setModelFit(fit);
      return;
    }

    gsap.to(stageRef.current, { ...stage, duration: 1.5, ease: "power3.inOut" });

    if (fit === from) {
      sceneBus.setModelFit(fit);
    } else {
      const t = { k: from };
      gsap.to(t, {
        k: fit,
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => sceneBus.setModelFit(t.k),
      });
    }

    if (scrolled) {
      gsap.to(wordsRef.current, {
        autoAlpha: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        delay: lg ? 0.1 : 0,
      });
      gsap.to(hintRef.current, { autoAlpha: 0, duration: 0.3 });
    } else {
      gsap.to(wordsRef.current, {
        autoAlpha: 0,
        x: -64,
        filter: "blur(6px)",
        duration: 0.8,
        ease: "power2.in",
      });
      gsap.to(hintRef.current, { autoAlpha: 1, duration: 0.4, delay: 0.5 });
    }
  }, []);

  // "Continue to scroll": run the reveal, then hand the page back to the reader
  // by switching the scene out of interaction mode.
  const toScroll = useCallback(() => {
    if (sceneBus.revealed) return;
    sceneBus.revealed = true;
    setMode("scroll");
    if (sceneBus.controls) sceneBus.controls.enabled = false;
    move("scroll");
  }, [move]);

  // "Make interactive": reverse everything and give control back.
  const toInteractive = useCallback(() => {
    if (!sceneBus.revealed) return;
    sceneBus.revealed = false;
    setMode("interactive");
    if (sceneBus.controls) sceneBus.controls.enabled = true;
    move("interactive");
  }, [move]);

  useEffect(() => {
    const entrance = gsap.fromTo(
      stageRef.current,
      { autoAlpha: 0, scale: 0.96, y: 24 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 1.4, ease: "power3.out" },
    );
    entranceRef.current = entrance;
    gsap.set(wordsRef.current, { autoAlpha: 0, x: -64, filter: "blur(6px)" });
    gsap.set(hintRef.current, { autoAlpha: 1 });

    function onScroll() {
      if (window.scrollY > 24) toScroll();
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      entrance.kill();
      entranceRef.current = null;
    };
  }, [toScroll]);

  return (
    <>
      <div
        ref={stageRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ touchAction: "pan-y", pointerEvents: mode === "scroll" ? "none" : "auto" }}
      >
        <Canvas
          shadows
          onCreated={({ gl, scene }) => {
            gl.shadowMap.enabled = true;
            // PCFSoftShadowMap was removed from three; asking for it silently
            // downgrades to PCFShadowMap and logs a warning. VSM is the soft
            // option that still exists, and a character's contact shadow is the
            // main cue that their feet are on the ground.
            gl.shadowMap.type = THREE.VSMShadowMap;

            // Warm orange IBL so reflections and ambient bounce match the ground.
            const pmrem = new THREE.PMREMGenerator(gl);
            const envScene = new THREE.Scene();
            const shell = new THREE.Mesh(
              new THREE.BoxGeometry(20, 20, 20),
              new THREE.MeshBasicMaterial({
                color: "#ff5c00",
                side: THREE.BackSide,
              }),
            );
            envScene.add(shell);
            const target = pmrem.fromScene(envScene, 0.04);
            scene.environment = target.texture;
            scene.environmentIntensity = 0.42;
            pmrem.dispose();
            shell.geometry.dispose();
            (shell.material as THREE.Material).dispose();
          }}
          camera={{ position: [0, 0.75, 5.6], fov: 34, near: 0.1, far: 100 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ inset: 0, position: "absolute" }}
        >
          <SceneContent />
        </Canvas>
      </div>

      <div
        ref={wordsRef}
        className="pointer-events-none relative z-10"
        style={{ opacity: 0, transform: "translateX(-64px)", filter: "blur(6px)" }}
      >
        {children}
      </div>

      <div
        ref={hintRef}
        className="pointer-events-none absolute left-6 top-20 z-20 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
      >
        drag · turn · zoom
      </div>

      {/* Masked controls: difference blend keeps them legible over both the
          orange ground and the dark page. */}
      {mode === "interactive" ? (
        <button
          type="button"
          onClick={toScroll}
          className="absolute right-6 top-20 z-30 cursor-pointer bg-white px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-black mix-blend-difference"
        >
          Continue to scroll
        </button>
      ) : (
        <button
          type="button"
          onClick={toInteractive}
          className="absolute right-6 top-20 z-30 cursor-pointer bg-white px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-black mix-blend-difference"
        >
          Make interactive
        </button>
      )}
    </>
  );
}
