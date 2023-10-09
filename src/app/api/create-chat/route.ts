// /api/create-chat

import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { fileKey, fileName } = body;

    console.log({ fileKey, fileName });
    await loadS3IntoPinecone(fileKey);
    const pages = await loadS3IntoPinecone(fileKey);
    return NextResponse.json({ pages });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
