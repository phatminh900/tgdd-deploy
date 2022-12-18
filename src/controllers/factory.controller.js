import mongoose from "mongoose";
import {
  createOne,
  findAllDocs,
  findOne,
  updateOne,
  deleteOne,
  findOneBySlug,
} from "../services/factory.service.js";
import catchAsync from "../utils/catchAsync.js";
export const isValidMongooseID = (req, res, next, value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid ID try again.",
    });
  }
  next();
};
export const createOneHandler = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await createOne(Model, req.body);
    res.status(200).json({
      status: "success",
      data: newDoc,
    });
  });
export const findAllDocsHandler = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    const docs = await findAllDocs(Model, req.query, populateOptions);
    res.status(200).json({
      status: "success",
      results: docs.length,
      data: docs,
    });
  });
export const getOneHandler = (Model, populateOption) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = populateOption
      ? await findOne(Model, id, populateOption)
      : await findOne(Model, id);
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
// slug version
export const getOneBySlugHandler = (Model, populateOption, selectOptions) =>
  catchAsync(async (req, res, next) => {
    const { slug } = req.params;
    const query = req.query;
    // valid id next middleware
    if (mongoose.Types.ObjectId.isValid(slug)) return next();
    const doc = populateOption
      ? // combine populate and query together
        await findOneBySlug(
          Model,
          slug,
          { ...populateOption, options: req.query },
          selectOptions
        )
      : await findOneBySlug(Model, slug);
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
//
export const updateOneHandler = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await updateOne(Model, id, req.body);
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
export const deleteOneHandler = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await deleteOne(Model, id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
//# sourceMappingURL=factory.controller.js.map
