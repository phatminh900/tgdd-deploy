import multer from "multer";
import Review from "../models/review.model.js";
import { updateOne } from "../services/factory.service.js";
import catchAsync from "../utils/catchAsync.js";
import { findAllDocs } from "../services/factory.service.js";
import {
  deleteOneHandler,
  getOneHandler,
  getOneBySlugHandler,
} from "./factory.controller.js";
import { BadRequestError } from "../utils/AppError.js";
import resizeImgUtil from "../utils/resizeImg.js";
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      //@ts-ignore
      cb(new BadRequestError("Please upload an image."), false);
    }
  },
});
export const uploadReviewImg = upload.single("photo");
export const resizeImg = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  // later on using filename
  const fileName = `review-${req.body.user}-${Date.now()}.png`;
  req.file.filename = `/img/reviews/${fileName}`;
  await resizeImgUtil({
    id: req.body.user,
    width: 125,
    height: 125,
    fileBuffer: req.file.buffer,
    fileName,
    quality: 90,
    fileStorageResource: "reviews",
  });
  //   await sharp(req.file.buffer)
  // .resize(125, 125)
  // .toFormat("png")
  // .png({ quality: 90 })
  // .toFile(
  //   `src/public/img/reviews/${fileName}`
  // );
  next();
});
const getProductId = (doc) => {
  const document = { ...doc };
  // @ts-ignore
  const { _doc } = document;
  const { review, rating, __v, user, _id, ...product } = _doc;
  return product;
};
export const setProductId = (req, res, next) => {
  // ex{phoneId:21323123}
  const paramKey = Object.keys(req.params)[0];
  const productKey = paramKey.slice(0, paramKey.indexOf("Id"));
  // req.productId;
  req.body[productKey] = req.params[paramKey];
  next();
};
export const setUserId = (req, res, next) => {
  // productId => product
  // @ts-ignore
  req.body.user = req.user?.id || req.body.userId;
  next();
};
// @ts-ignore
export const createReviewHandler = async (req, res, next) => {
  try {
    const newDoc = req.file
      ? await Review.create({ ...req.body, photo: req.file.filename })
      : await Review.create(req.body);
    // add to product rating section
    // @ts-ignore
    // @ts-ignore
    newDoc?.constructor.calcRatingAverage(getProductId(newDoc), req.Product);
    res.status(200).json({
      status: "success",
      data: newDoc,
    });
  } catch (error) {
    const err = error;
    if (err.code === 11000) {
      return res.status(400).json({
        status: "fail",
        message: "You're already reviews",
      });
    }
    res.status(400).json({
      status: "fail",
      data: error,
    });
  }
};
// export const getAllReviewsHandler = findAllDocsHandler(Review);
export const getAllReviewsHandler = catchAsync(async (req, res, next) => {
  const productKey = Object.keys(req.body)[0];
  const reviews = await findAllDocs(Review, req.query);
  res
    .status(200)
    .json({ status: "success", result: reviews.length, data: reviews });
});
export const getReviewHandler = getOneHandler(Review);
export const updateReviewHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const doc = await updateOne(Review, id, req.body);
  // update quantity and average on the product
  // @ts-ignore
  // @ts-ignore
  doc?.constructor.calcRatingAverage(getProductId(doc), req.Phone);
  res.status(200).json({
    status: "success",
    data: doc,
  });
});
// slug
export const getReviewBySlugHandler = (Model) =>
  getOneBySlugHandler(Model, { path: "reviews" }, [
    "reviews",
    "ratingAverage",
    "ratingQuantity",
    "imgCover",
    "title",
    "firm",
    "category",
    "price",
  ]);
export const deleteReviewHandler = deleteOneHandler(Review);
//# sourceMappingURL=review.controller.js.map
