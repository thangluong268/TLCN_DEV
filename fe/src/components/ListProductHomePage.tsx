import React from "react";
import Slick from "./Slick";
import CardProduct from "./CardProduct";

function ListProductHomePage(props: any) {
  const { title, listHighLight, listProduct } = props;
  const [check, setCheck] = React.useState(0);
  return (
    <div className="flex flex-col bg-white p-4 rounded-xl mb-2">
      <div className="flex justify-between font-bold">
        <div>{title}</div>
        <div
          className="text-blue-600 cursor-pointer"
          onClick={(e) => {
            if (listHighLight) {
              window.location.href =
                "/store/" + listHighLight[check][0].storeId;
            } else {
              window.location.href = "/product";
            }
          }}
        >
          Xem tất cả
        </div>
      </div>
      <div className="flex my-2 ms-2">
        {listHighLight &&
          listHighLight.map((item: any, index: number) => {
            return (
              <div
                className={`px-4 py-2 border-2 rounded-2xl hover:bg-slate-100 hover:cursor-pointer hover:border-slate-100 mr-2 ${
                  check == index && "bg-slate-100 border-slate-100"
                }`}
                key={index}
                onClick={(e) => setCheck(index)}
              >
                {item[0].storeName}
              </div>
            );
          })}
      </div>
      <Slick
        config={{
          infinite: false,
          slidesToShow: 5,
          slidesToScroll: 1,
        }}
        buttonRight={true}
        buttonLeft={true}
      >
        {listHighLight
          ? listHighLight[check]?.map((item: any) => {
              return <CardProduct data={item} />;
            })
          : listProduct.map((item: any) => {
              return <CardProduct data={item} />;
            })}
      </Slick>
    </div>
  );
}

export default ListProductHomePage;
