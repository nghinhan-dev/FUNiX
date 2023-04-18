import Subscribe from "../Subscribe/Subscribe";
import footerData from "/data/footer.json";

export default function Footer() {
  let renderFooterList = footerData.map((item) => {
    return (
      <ul className="footer-col" key={item.col_number + `fcol`}>
        {item.col_values.map((liText) => (
          <li>
            <p>{liText}</p>
          </li>
        ))}
      </ul>
    );
  });

  return (
    <>
      <Subscribe />
      <section id="footer">
        <div className="container">{renderFooterList}</div>
      </section>
    </>
  );
}
