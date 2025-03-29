import { FC } from "react";

const AppImage: FC<any> = ({ src, ...props }) => {
  const formatBase64Image = (base64: string) => {
    // Nếu có 2 lần `data:image`, chỉ lấy phần sau dấu phẩy cuối cùng
    if (!base64) return null;
    if (base64.includes("base64,")) {
      return base64.substring(base64.lastIndexOf("data:image"));
    }
    return base64;
  };

  return <img src={formatBase64Image(src)} {...props} />;
};

export default AppImage;
