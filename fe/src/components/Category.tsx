import React from "react";
import Image from "next/image";
import { GetAllCategory } from "@/services/Category";

function Category() {
  const [category, setCategory] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const lst = await GetAllCategory().then((res) => res);
      setCategory(lst);
    };
    fetchData();
  }, []);
  return (
    <>
      {category.map((item: { name: string; url: string; _id: string }) => {
        return (
          <div
            key={item._id}
            className="grid grid-cols-4 p-2 items-center hover:bg-slate-100 hover:rounded-md hover:cursor-pointer"
            onClick={(e) => console.log(item)}
          >
            <div className="mr-2 col-span-1">
              <img src={item.url} alt={""} className="rounded-xl w-8 h-8" />
            </div>
            <div className="col-span-3">{item.name}</div>
          </div>
        );
      })}
    </>
  );
}

export default Category;
