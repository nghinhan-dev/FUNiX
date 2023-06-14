const fs = require("fs");
const path = require("path");

const mainModulePath = require.main.filename;
const p = path.join(path.dirname(mainModulePath), "data", "cart.json");

module.exports = class Cart {
  static addProduct(prdId, prdPrice) {
    // Fecth the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existedProductIndex = cart.products.findIndex(
        (item) => item.id === prdId
      );
      console.log("existedProductIndex:", existedProductIndex);
      if (existedProductIndex !== -1) {
        let updatedProduct = cart.products[existedProductIndex];
        updatedProduct.qty++;
        cart.products[existedProductIndex] = updatedProduct;
      } else {
        const newProduct = {
          id: prdId,
          qty: 1,
        };
        cart.products = [...cart.products, newProduct];
      }
      cart.totalPrice += +prdPrice;
      console.log("cart:", cart);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
