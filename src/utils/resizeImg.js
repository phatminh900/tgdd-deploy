import * as url from "url";
import path from "path";
import sharp from "sharp";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const resizeImgUtil = async (resizeInfo) => {
  // const fileName = `phone-${resizeInfo.id}-${Date.now()}-img-color-cover.jpg`;
  // @ts-ignore
  await sharp(resizeInfo.fileBuffer)
    .resize(resizeInfo.width, resizeInfo.height)
    .toFormat("jpeg")
    .jpeg({ quality: resizeInfo.quality })
    .toFile(
      `${path.join(__dirname, "..", "..", "public")}/img/${
        resizeInfo.fileStorageResource
      }/${resizeInfo.fileName}`
    );
};
export default resizeImgUtil;
//# sourceMappingURL=resizeImg.js.map
