import * as sharp from "sharp";
export declare class SharpService {
    resizeImage(fileFormat: string, originalFile: string, resizedFile: string): Promise<sharp.OutputInfo>;
}
