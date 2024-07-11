// pages/api/upload-image.ts
import { NextApiRequest, NextApiResponse } from "next";
import { uploadFileLocally } from "utils/upload";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return res.status(400).json({ error: "File is required" });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const { filePath, base64 } = await uploadFileLocally(buffer, file.type);

    return res.status(200).json({ filePath, base64 });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
