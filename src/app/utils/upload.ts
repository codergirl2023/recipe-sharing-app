// src/utils/upload.ts
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { getPlaiceholder } from "plaiceholder";

const uploadDirectory = "./uploads/";

export async function uploadFileLocally(fileBuffer: Buffer, contentType: string) {
  const fileExtension = contentType.split("/")[1];
  const fileName = `${uuidv4()}.${fileExtension}`;
  const filePath = `${uploadDirectory}${fileName}`;

  try {
    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }

    console.log("Writing file to upload directory");
    // Write the file to the upload directory
    await fs.promises.writeFile(filePath, fileBuffer);

    // Generate placeholder
    console.log("Generating placeholder for the file");
    const { base64 } = await getPlaiceholder(fileBuffer);

    return { filePath, base64 };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to upload file locally:", error.message);
      throw new Error(`Failed to upload file: ${error.message}`);
    } else {
      console.error("An unknown error occurred:", error);
      throw new Error("An unknown error occurred while uploading the file.");
    }
  }
}
