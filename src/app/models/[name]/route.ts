import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";

const MODEL_DIR = path.join(process.cwd(), "src", "model");

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ name: string }> },
) {
  const { name } = await context.params;

  const filename = path.basename(name);
  if (filename !== name || !filename.endsWith(".glb")) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const buffer = await readFile(path.join(MODEL_DIR, filename));
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "model/gltf-binary",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}