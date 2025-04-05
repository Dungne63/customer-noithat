import { FC } from "react";
import useHomeCategory, { Props, ReceivedProps } from "./hook";
import AppImage from "@components/AppImage";

const HomeCategoryLayout: FC<Props> = ({ mockCategory, navigate }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 mx-4 h-[700px] gap-2 select-none">
      {mockCategory.map((item, index) => {
        return (
          <div
            className={`relative col-span-${index === 0 ? "2" : "1"} ${
              index === 0 && "row-span-2"
            } border-1 overflow-hidden shadow-inner cursor-pointer bg-black group`}
            key={item._id}
            onClick={() => navigate("/")}
            data-aos={item.aos}
          >
            <AppImage
              src={item.image}
              className={`h-full w-full object-cover group-hover:scale-110 ease-linear duration-300 group-hover:opacity-50`}
            />
            <div className="absolute top-1/2 left-1/2 font-semibold text-2xl group-hover:text-4xl ease-linear duration-300 text-white translate-x-[-50%] translate-y-[-50%]">
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const HomeCategory: FC<ReceivedProps> = (props) => (
  <HomeCategoryLayout {...useHomeCategory(props)} />
);

export default HomeCategory;
