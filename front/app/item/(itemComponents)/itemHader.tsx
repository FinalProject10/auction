import "./style/itemHader.css";
const ItemHeader = ({ items }) => {
  console.log(items, "items");

  return (
    <div className="autobid-breadcrumbs">
      {items.map((item) => (
        <div className="container" key={item.id}>
          <div className="">
            <div className="col-md-6">
              <h1>{item.name}</h1>
              <div className="description">
                <p>2019 · 94 000 km · 2 967 cm3 · Diesel</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemHeader;
