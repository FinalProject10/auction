import "./style/itemHader.css";
import Link from "next/link";

const ItemHeader = ({ items }) => {
  return (
    <div className="autobid-breadcrumbs">
      {items.map((item) => (
        <div className="container" key={item.id}>
          <div className="">
            <Link href={"/home"}>
              {" "}
              <h1 className="text-[#999999] inline-block mb-[2%]">Home / </h1>
            </Link>
            <Link href={"/shop"}>
              <span className="text-[#999999]">Shop /</span>
            </Link>

            <span className="text-[#999999]">Product</span>

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
