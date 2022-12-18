import multer from "multer";
import catchAsync from "../utils/catchAsync.js";
import {
  createOneHandler,
  deleteOneHandler,
  findAllDocsHandler,
  getOneBySlugHandler,
  getOneHandler,
  updateOneHandler,
} from "./factory.controller.js";
import { BadRequestError } from "../utils/AppError.js";
import resizeImgUtil from "../utils/resizeImg.js";
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      // @ts-ignore
      cb(new BadRequestError("Please upload image file."), false);
    }
  },
});
// export const uploadPhoneImgs = upload.fields([
//   {
//     name: "imgCover",
//     maxCount: 1,
//   },
//   {
//     name: "imgHighlights",
//     maxCount: 20,
//   },
//   { name: "imgConfiguration", maxCount: 1 },
// ]);
export const uploadProductImgs = upload.any();
export const resizingProductImg = (resource) =>
  catchAsync(async (req, res, next) => {
    if (!req.files) return next();
    const imgCoverWidth = resource === "laptops" ? 450 : 600;
    const imgCoverHeight = resource === "laptops" ? 300 : 600;
    // 1) IMG COVER
    // @ts-ignore
    // 2) IMGS
    const imgsObj = Object.values(req.files).reduce(
      (obj, field) => {
        // imgCover not touch
        if (field.fieldname === "imgCover") return obj;
        if (field.fieldname === "imgColorsCover") return obj;
        if (obj[field.fieldname]) return obj;
        return { ...obj, [field.fieldname]: [] };
      },
      { imgHighlights: [], imgConfiguration: [], imgGeneralInformation: [] }
    );
    const imgColorsObj = [];
    await Promise.all(
      Object.values(req.files).map(async (file, i) => {
        // img cover
        if (file.fieldname === "imgCover") {
          req.body.imgCover = `/img/products/product-${
            req.params.id
          }-${Date.now()}-cover.jpg`;
          const fileName = `/product-${req.params.id}-${Date.now()}-cover.jpg`;
          await resizeImgUtil({
            id: req.params.id,
            width: imgCoverWidth,
            fileName,
            height: imgCoverHeight,
            fileStorageResource: "products",
            fileBuffer: file.buffer,
            quality: 90,
          });
          return;
        }
        if (file.fieldname === "imgColorsCover") {
          const fileName = `/product-${
            req.params.id
          }-${Date.now()}-img-color-cover-${i + 1}.jpg`;
          await resizeImgUtil({
            id: req.params.id,
            width: 200,
            fileName,
            height: 200,
            fileStorageResource: "products",
            fileBuffer: file.buffer,
            quality: 90,
          });
          // @ts-ignore
          imgColorsObj.push("/img/products/" + fileName);
          return;
        }
        const fileName = `product-${req.params.id}-${Date.now()}-${i + 1}.jpg`;
        // // @ts-ignore
        await resizeImgUtil({
          id: req.params.id,
          fileName,
          width: 1020,
          height: file.fieldname === "imgHighlights" ? 570 : 680,
          fileStorageResource: "products",
          fileBuffer: file.buffer,
          quality: 90,
        });
        imgsObj[file.fieldname].push("/img/products/" + fileName);
      })
    );
    req.body.imgs = imgsObj;
    req.body.imgColorsCover = imgColorsObj;
    // @ts-ignore
    next();
  });
export const createProductHandler = (Model) => createOneHandler(Model);
export const getAllProductsHandler = (Model) => findAllDocsHandler(Model);
// populate
export const getProductHandler = (Model) =>
  getOneHandler(Model, { path: "reviews" });
export const getProductBySlugHandler = (Model) =>
  getOneBySlugHandler(Model, { path: "reviews" });
export const updateProductHandler = (Model) => updateOneHandler(Model);
export const deleteProductHandler = (Model) => deleteOneHandler(Model);
//# sourceMappingURL=product.controller.js.map
