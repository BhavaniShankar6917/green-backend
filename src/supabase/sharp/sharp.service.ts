import { Injectable } from "@nestjs/common";
import * as sharp from "sharp";

@Injectable()
export class SharpService {
  async resizeImage(
    fileFormat: string,
    originalFile: string,
    resizedFile: string
  ) {
    if (fileFormat == "png") {
      console.log("resized png file created");
      return await sharp(originalFile).png({ quality: 70 }).toFile(resizedFile);
    }
    if (fileFormat == "jpeg" || fileFormat == "jpg") {
      console.log("resized jpeg file created");
      return await sharp(originalFile)
        .jpeg({ quality: 70 })
        .toFile(resizedFile);
    }
  }
}
