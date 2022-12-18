import APIFeatures from "../utils/apiFeatures.js";
export const createOne = async (Model, input) => {
  try {
    return await Model.create(input);
  } catch (error) {
    throw error;
  }
};
export const findAllDocs = async (Model, queryOptions, populateOptions) => {
  try {
    const features = new APIFeatures(Model.find(), queryOptions)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    return populateOptions
      ? await features.query.populate(populateOptions)
      : await features.query;
  } catch (error) {
    throw error;
  }
};
export const findOne = async (Model, id, populateOption) => {
  try {
    return populateOption
      ? await Model.findById(id).populate(populateOption)
      : await Model.findById(id);
  } catch (error) {
    throw error;
  }
};
export const findOneBySlug = async (
  Model,
  slug,
  populateOption,
  selectOptions
) => {
  try {
    return populateOption
      ? await Model.findOne({ slug })
          .populate(populateOption)
          .select(selectOptions)
      : await Model.findOne({ slug });
  } catch (error) {
    throw error;
  }
};
export const updateOne = async (
  Model,
  id,
  update,
  options = { new: true, runValidators: true }
) => {
  try {
    return await Model.findByIdAndUpdate(id, update, options);
  } catch (error) {
    throw error;
  }
};
export const deleteOne = async (Model, id) => {
  try {
    return await Model.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
//# sourceMappingURL=factory.service.js.map
