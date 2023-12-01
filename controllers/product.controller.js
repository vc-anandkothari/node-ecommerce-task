// #region require section
const Product = require('../schema/product.schema');
const STATUS_CODE = require('../constants/status-code');
const PRODUCT_CONSTANTS = require('../constants/product.constants');
// #endregion

// #endregion api's

/* The `exports.getProducts` function is a controller function that handles the retrieval of all
products. */
exports.getProducts = async function getProducts(_req, res) {
  try {
    const products = await Product.find();

    res.status(STATUS_CODE.OK.code).send({
      message: PRODUCT_CONSTANTS.PRODUCT_LIST_SUCCESS,
      products,
    });
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST.code).send({
      message: STATUS_CODE.BAD_REQUEST.message,
      error: [error],
    });
  }
};

/* The `exports.createProduct` function is a controller function that handles the creation of a new
product. */
exports.createProduct = async function createProduct(req, res) {
  try {
    const prod = new Product(req.body);

    await prod.save();
    res.status(STATUS_CODE.OK.code).send({
      message: PRODUCT_CONSTANTS.ADD_PRODUCT_SUCCESS,
    });
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST.code).send({
      message: STATUS_CODE.BAD_REQUEST.message,
      error: [error],
    });
  }
};

/* The `exports.updateProduct` function is a controller function that handles the updating of a
product. */
exports.updateProduct = async function updateProduct(req, res) {
  try {
    await Product.updateOne({ _id: req.body.id }, req.body);
    res.status(STATUS_CODE.OK.code).send({
      message: PRODUCT_CONSTANTS.UPDATE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST.code).send({
      message: STATUS_CODE.BAD_REQUEST.message,
      error: [error],
    });
  }
};

/* The `exports.deleteProduct` function is a controller function that handles the deletion of a
product. */
exports.deleteProduct = async function deleteProduct(req, res) {
  try {
    await Product.findOneAndDelete({ _id: req.params.id });
    res.status(STATUS_CODE.OK.code).send({
      message: PRODUCT_CONSTANTS.DELETE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST.code).send({
      message: STATUS_CODE.BAD_REQUEST.message,
      error: [error],
    });
  }
};
// #endregion
