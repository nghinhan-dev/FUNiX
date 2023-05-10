import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: `p1`,
    price: 3,
    title: `The Book 1`,
    desc: `Good one for philosophy`,
  },
  {
    id: `p2`,
    price: 6,
    title: `The Book 2`,
    desc: `Good one for english`,
  },
];

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item) => {
          return (
            <ProductItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.desc}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
