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
  revealFitK: 0.49,
  setModelFit: (k: number) => {
    if (!rawModelDims || !modelFit || !sceneBus.scene) return;
    const s = modelFit.initialScale * k;
    sceneBus.scene.scale.setScalar(s);
    sceneBus.scene.position.set(
      -rawModelDims.center[0] * s,
      -rawModelDims.center[1] * s,
      -rawModelDims.center[2] * s,
    );
    // One continuous surface: a unit disc folded 90° on the X axis, so the
    // floor and wall share the fold line with no gap and no overlap.
    const floorY = (rawModelDims.minY - rawModelDims.center[1]) * s;
    const foldZ = -(rawModelDims.halfZ + 0.02) * s;
    const r = modelFit.stageR * k;
    if (sceneBus.stage) {
      sceneBus.stage.position.set(0, floorY, foldZ);
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
      visibleHAtTarget: +(2 * tanHalf * dist).toFixed(2),
      visibleWAtTarget: +(2 * tanHalf * cam.aspect * dist).toFixed(2),
      fillPct: {
        w: +(((Math.max(size.x, size.y) / 2) / (tanHalf * cam.aspect * dist)) * 100).toFixed(1),
        h: +(((Math.max(size.y, size.z) / 2) / (tanHalf * dist)) * 100).toFixed(1),
      },
    };
  },
};

const MODEL_URL = "/models/office-hero.glb";

if (
  process.env.NODE_ENV !== "production" &&
  typeof window !== "undefined"
) {
  (window as unknown as { __heroBus: typeof sceneBus }).__heroBus = sceneBus;
}

// A unit disc folded 90° along the X axis: upper half stays vertical (wall),
// lower half folds flat toward +Z (floor). The crease vertices are shared, so
// the two halves meet exactly — no gap, no overlap, and a hard crease normal.
function createFoldedDiscGeometry(segments = 96): THREE.BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];

  const addHalf = (wall: boolean) => {
    const base = positions.length / 3;
    positions.push(0, 0, 0);
    normals.push(0, wall ? 0 : 1, wall ? 1 : 0);
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI;
      const c = Math.cos(t);
      const s = Math.sin(t);
      if (wall) {
        positions.push(c, s, 0);
        normals.push(0, 0, 1);
      } else {
        positions.push(c, 0, s);
        normals.push(0, 1, 0);
      }
    }
    for (let i = 1; i <= segments; i++) {
      if (wall) indices.push(base, base + i, base + i + 1);
      else indices.push(base, base + i + 1, base + i);
    }
  };

  addHalf(true);
  addHalf(false);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  return geometry;
}

let rawModelDims: {
  center: [number, number, number];
  maxDim: number;
  minY: number;
  halfX: number;
  halfY: number;
  halfZ: number;
} | null = null;
let modelFit: {
  initialScale: number;
  stageR: number;
} | null = null;

function OfficeModel() {
  const gltf = useLoader(GLTFLoader, MODEL_URL);
  const { scene } = gltf;
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;

  useEffect(() => {
    if (!rawModelDims) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      rawModelDims = {
        center: [center.x, center.y, center.z],
        maxDim: Math.max(size.x, size.y, size.z) || 1,
        minY: box.min.y,
        halfX: size.x / 2,
        halfY: size.y / 2,
        halfZ: size.z / 2,
      };
    }

    const raw = rawModelDims;

    const portrait = camera.aspect < 1;
    const dist = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
    const tanHalf = Math.tan((camera.fov * Math.PI) / 360);
    const visibleW = 2 * tanHalf * camera.aspect * dist;

    const fitFill = portrait ? 0.82 : 0.7;
    const revealFill = portrait ? 0.46 : 0.34;
    const initialScale = (fitFill * visibleW) / raw.maxDim;

    const STAGE_MARGIN = 1.25;
    // Folded-circle radius must reach the farthest footprint corner, which is
    // the front corner: distance from the fold line to (halfX, 2 * halfZ).
    const stageR =
      STAGE_MARGIN *
      Math.max(raw.halfX * initialScale, raw.halfZ * 2 * initialScale);

    modelFit = { initialScale, stageR };
    sceneBus.revealFitK = revealFill / fitFill;
    sceneBus.setModelFit(1);
    sceneBus.scene = scene;
    scene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
  }, [scene, camera]);

  return <primitive object={scene} />;
}

function SceneContent() {
  const { camera, gl } = useThree();
  const controlsRef = useRef<OrbitControls | null>(null);
  const stageRef3d = useRef<THREE.Mesh | null>(null);
  const foldedGeometry = useMemo(() => createFoldedDiscGeometry(96), []);

  useEffect(() => {
    sceneBus.stage = stageRef3d.current;
    sceneBus.setModelFit(1);
    return () => {
      sceneBus.stage = null;
      foldedGeometry.dispose();
    };
  }, [foldedGeometry]);

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controls.minDistance = 1.4;
    controls.maxDistance = 14;
    controls.maxPolarAngle = Math.PI * 0.92;
    controls.minAzimuthAngle = -Math.PI / 2;
    controls.maxAzimuthAngle = Math.PI / 2;
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

  useFrame(() => {
    controlsRef.current?.update();
  });

  return (
    <>
      {/* Key: warm, front-right-above. The only shadow caster. */}
      <directionalLight
        position={[4.5, 7, 5]}
        intensity={3.4}
        color="#fff1de"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-3.6}
        shadow-camera-right={3.6}
        shadow-camera-top={3.6}
        shadow-camera-bottom={-3.6}
        shadow-camera-near={0.5}
        shadow-camera-far={24}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      />
      {/* Fill: warm sky over an orange ground bounce off the stage. */}
      <hemisphereLight intensity={0.55} color="#ffc79a" groundColor="#ff5c00" />
      {/* Rim: hot orange from behind to lift the model off the wall. */}
      <directionalLight position={[-5, 3.5, -6]} intensity={1.6} color="#ff8a3d" />
      <ambientLight intensity={0.18} color="#ffb37a" />

      <mesh ref={stageRef3d} position={[0, -0.3, 0]} receiveShadow>
        <primitive object={foldedGeometry} attach="geometry" />
        <meshStandardMaterial
          color="#ff5c00"
          roughness={0.7}
          metalness={0.1}
          emissive="#ff5c00"
          emissiveIntensity={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>

      <OfficeModel />
    </>
  );
}

export default function HeroStage({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"interactive" | "scroll">("interactive");

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const applyScrollState = useCallback(() => {
    const lg = window.matchMedia("(min-width: 1024px)").matches;
    gsap.set(stageRef.current, {
      x: lg ? window.innerWidth * 0.25 : 0,
      y: lg ? 0 : window.innerHeight * 0.05,
      scale: lg ? 0.94 : 1,
    });
    sceneBus.setModelFit(sceneBus.revealFitK);
    gsap.set(wordsRef.current, { autoAlpha: 1, x: 0, filter: "blur(0px)" });
    gsap.set(hintRef.current, { autoAlpha: 0 });
  }, []);

  const applyInteractiveState = useCallback(() => {
    gsap.set(stageRef.current, { x: 0, y: 0, scale: 1 });
    sceneBus.setModelFit(1);
    gsap.set(wordsRef.current, { autoAlpha: 0, x: -64, filter: "blur(6px)" });
    gsap.set(hintRef.current, { autoAlpha: 1 });
  }, []);

  // "Continue to scroll": run the reveal, then hand the page back to the user
  // by switching the scene out of interaction mode.
  const toScroll = useCallback(() => {
    if (sceneBus.revealed) return;
    sceneBus.revealed = true;
    setMode("scroll");
    if (sceneBus.controls) sceneBus.controls.enabled = false;

    if (prefersReducedMotion()) {
      applyScrollState();
      return;
    }

    const lg = window.matchMedia("(min-width: 1024px)").matches;
    gsap.to(stageRef.current, {
      x: lg ? window.innerWidth * 0.25 : 0,
      y: lg ? 0 : window.innerHeight * 0.05,
      scale: lg ? 0.94 : 1,
      duration: 1.5,
      ease: "power3.inOut",
    });
    const fit = { k: 1 };
    gsap.to(fit, {
      k: sceneBus.revealFitK,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: () => sceneBus.setModelFit(fit.k),
    });
    gsap.to(wordsRef.current, {
      autoAlpha: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
      delay: lg ? 0.1 : 0,
    });
    gsap.to(hintRef.current, { autoAlpha: 0, duration: 0.3 });
  }, [applyScrollState]);

  // "Make interactive": reverse everything and give control back.
  const toInteractive = useCallback(() => {
    if (!sceneBus.revealed) return;
    sceneBus.revealed = false;
    setMode("interactive");
    if (sceneBus.controls) sceneBus.controls.enabled = true;

    if (prefersReducedMotion()) {
      applyInteractiveState();
      return;
    }

    gsap.to(stageRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 1.5,
      ease: "power3.inOut",
    });
    const fit = { k: sceneBus.revealFitK };
    gsap.to(fit, {
      k: 1,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: () => sceneBus.setModelFit(fit.k),
    });
    gsap.to(wordsRef.current, {
      autoAlpha: 0,
      x: -64,
      filter: "blur(6px)",
      duration: 0.8,
      ease: "power2.in",
    });
    gsap.to(hintRef.current, { autoAlpha: 1, duration: 0.4, delay: 0.5 });
  }, [applyInteractiveState]);

  useEffect(() => {
    const entrance = gsap.fromTo(
      stageRef.current,
      { autoAlpha: 0, scale: 0.96, y: 24 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 1.4, ease: "power3.out" },
    );
    gsap.set(wordsRef.current, { autoAlpha: 0, x: -64, filter: "blur(6px)" });
    gsap.set(hintRef.current, { autoAlpha: 1 });

    function onScroll() {
      if (window.scrollY > 24) toScroll();
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      entrance.kill();
    };
  }, [toScroll]);

  return (
    <>
      <div
        ref={stageRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ touchAction: "pan-y" }}
      >
        <Canvas
          shadows
          onCreated={({ gl, scene }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFShadowMap;

            // Warm orange IBL so reflections and ambient bounce match the stage.
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
            scene.environmentIntensity = 0.35;
            pmrem.dispose();
            shell.geometry.dispose();
            (shell.material as THREE.Material).dispose();
          }}
          camera={{ position: [0, 0.9, 5.8], fov: 34, near: 0.1, far: 100 }}
          dpr={[1, 2]}
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
        className="pointer-events-none absolute bottom-6 left-6 z-20 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
      >
        drag · rotate · zoom
      </div>

      {/* Masked controls: difference blend keeps them legible over both the
          orange stage and the dark page. */}
      {mode === "interactive" ? (
        <button
          type="button"
          onClick={toScroll}
          className="absolute bottom-6 right-6 z-30 cursor-pointer bg-white px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-black mix-blend-difference"
        >
          Continue to scroll
        </button>
      ) : (
        <button
          type="button"
          onClick={toInteractive}
          className="absolute bottom-6 right-6 z-30 cursor-pointer bg-white px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-black mix-blend-difference"
        >
          Make interactive
        </button>
      )}
    </>
  );
}