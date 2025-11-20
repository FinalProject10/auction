import "./style/itemHader.css";
import Link from "next/link";

const ItemHeader = ({ items }) => {
  return (
    <div className="autobid-breadcrumbs">
      {items.map((item) => (
        <div className="container" key={item.id}>
          <div className="">
            <div className="breadcrumb-nav">
              <Link href={"/home"}>
                <span className="text-[#999999]">Home</span>
              </Link>
              <span className="text-[#999999] breadcrumb-separator"> / </span>
              <Link href={"/shop"}>
                <span className="text-[#999999]">Shop</span>
              </Link>
              <span className="text-[#999999] breadcrumb-separator"> / </span>
              <span className="text-[#999999]">Product</span>
            </div>

            <div className="col-md-6">
              <h1>{item.name}</h1>
              <div className="description">
                <p>{item.short_description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemHeader;
