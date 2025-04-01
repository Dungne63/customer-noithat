import {
  Home_Cate_Armchair_Image,
  Home_Cate_Bed_Image,
  Home_Cate_Chair_Image,
  Home_Cate_Sofa_Image,
  Home_Cate_Table_Image,
} from "@assets/images";
import { useNavigate } from "react-router";

export type ReceivedProps = Record<string, any>;

const useHomeHomeCategory = (props: ReceivedProps) => {
  const navigate = useNavigate();
  const mockCategory = [
    { _id: "1", label: "Sofa", image: Home_Cate_Sofa_Image },
    { _id: "2", label: "Bàn", image: Home_Cate_Table_Image },
    { _id: "3", label: "Giường", image: Home_Cate_Bed_Image },
    { _id: "4", label: "Ghế tựa", image: Home_Cate_Chair_Image },
    { _id: "5", label: "Ghế ăn", image: Home_Cate_Armchair_Image },
  ];
  return {
    navigate,
    mockCategory,
    ...props,
  };
};

export type Props = ReturnType<typeof useHomeHomeCategory>;

export default useHomeHomeCategory;
