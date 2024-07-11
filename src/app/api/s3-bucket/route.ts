// src/app/api/s3-bucket/route.ts
import { NextResponse } from "next/server";
import { uploadFileLocally } from "../../utils/upload";

export const POST = async (req: Request) => {
  console.log("Request received at /api/s3-bucket");
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      console.log("No file found in formData");
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("File buffer created");

    const { filePath, base64 } = await uploadFileLocally(buffer, file.type);
    console.log("File uploaded locally");

    return NextResponse.json({ filePath, base64 });
  } catch (error) {
    console.error("Error in POST /api/s3-bucket:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
};
