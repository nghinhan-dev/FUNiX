const fs = require("fs");
const path = require("path");

const mainModulePath = require.main.filename;
const p = path.join(path.dirname(mainModulePath), "data", "cart.json");

module.exports = class Cart {
  static addProduct(prdId, prdTitle, prdPrice) {
    // Fecth the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existedProductIndex = cart.products.findIndex(
        (item) => item.id === prdId
      );
      if (existedProductIndex !== -1) {
        let updatedProduct = cart.products[existedProductIndex];
        updatedProduct.qty++;
        cart.products[existedProductIndex] = updatedProduct;
      } else {
        const newProduct = {
          id: prdId,
          title: prdTitle,
          price: prdPrice,
          qty: 1,
        };
        cart.products = [...cart.products, newProduct];
      }
      cart.totalPrice += +prdPrice;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(prdId, prdPrice) {
    // Fecth the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const deletedProductIndex = cart.products.findIndex(
        (item) => item.id === prdId
      );

      if (deletedProductIndex === -1) {
        return;
      }
      let deletedProduct = cart.products[deletedProductIndex];

      cart.totalPrice -= deletedProduct.qty * prdPrice;
      cart.products.splice(deletedProductIndex, 1);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(fileContent));
      }
    });
  }
};
