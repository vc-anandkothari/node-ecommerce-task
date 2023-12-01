// #region require section
const Cart = require('../schema/cart.schema');
const Product = require('../schema/product.schema');
const STATUS_CODE = require('../constants/status-code');
const CART_CONSTANTS = require('../constants/cart.constants');
// #endregion

//#region api's
/* The `exports.addProductToCart` function is responsible for adding a product to the cart. It takes in
the request (`req`) and response (`res`) objects as parameters. */
exports.addProductToCart = async function addProductToCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(STATUS_CODE.NOT_FOUND.code).send({
        message: CART_CONSTANTS.PRODUCT_NOT_FOUND,
        error: [error],
      });
    }

    let cartItem = await Cart.findOne({ productId });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new Cart({ productId, quantity });
    }

    await cartItem.save();
    res.status(STATUS_CODE.OK.code).send({
      message: CART_CONSTANTS.ADD_CART_SUCCESS,
    });
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST.code).send({
      message: STATUS_CODE.BAD_REQUEST.message,
      error: [error],
    });
  }
};

/* The `updateProductInCart` function is responsible for updating the quantity of a product in the
cart. It takes in the request (`req`) and response (`res`) objects as parameters. */
exports.updateProductInCart = async function updateProductInCart(req, res) {
  try {
    const itemId = req.params.id;
    const { quantity, type } = req.body;

    const cartDetail = await Cart.findById({ _id: itemId });
    if (!cartDetail) {
      return res.status(STATUS_CODE.NOT_FOUND.code).send({
        message: CART_CONSTANTS.PRODUCT_NOT_FOUND_CART,
        error: [error],
      });
    }
    // Update the quantity of the cart item
    let updatedQuantity;
    if (type === 'add') {
      updatedQuantity = cartDetail.quantity + quantity;
    } else {
      updatedQuantity = cartDetail.quantity - quantity;
    }
    if (updatedQuantity < 1) {
      return res.status(STATUS_CODE.BAD_REQUEST.code).send({
        message: CART_CONSTANTS.ATLEAST_ONE_ITEM_CART,
        error: [error],
      });
    }
    await Cart.findByIdAndUpdate(itemId, { quantity: updatedQuantity });

    res.status(STATUS_CODE.OK.code).send({
      message: CART_CONSTANTS.UPDATE_CART_SUCCESS,
    });
  } catch (error) {
    return res.status(STATUS_CODE.BAD_REQUEST.code).send({
      message: STATUS_CODE.BAD_REQUEST.message,
      error: [error],
    });
  }
};

/* The `deleteProductFromCart` function is responsible for deleting a product from the cart. It takes
in the request (`req`) and response (`res`) objects as parameters. */
exports.deleteProductFromCart = async function deleteProductFromCart(req, res) {
  try {
    await Cart.findOneAndDelete({ _id: req.params.id });
    res.status(STATUS_CODE.OK.code).send({
      message: CART_CONSTANTS.DELETE_CART_SUCCESS,
    });
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST.code).send({
      message: STATUS_CODE.BAD_REQUEST.message,
      error: [error],
    });
  }
};

/* The `getCart` function is responsible for retrieving the items in the cart. */
exports.getCart = async function getCart(req, res) {
  try {
    const cartItems = await Cart.find();

    const productIds = cartItems.map((item) => item.productId);

    const productsInCart = await Product.find({ _id: { $in: productIds } });

    const cartList = cartItems.map((item) => {
      const product = productsInCart.find((data) =>
        data._id.equals(item.productId)
      );
      return {
        productId: item.productId,
        quantity: item.quantity,
        id: item._id,
        productDetails: product,
      };
    });
    res.status(STATUS_CODE.OK.code).send({
      message: STATUS_CODE.OK.message,
      data: cartList,
    });
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST.code).send({
      message: STATUS_CODE.OK.message,
      error: [error],
    });
  }
};
// #endregion
