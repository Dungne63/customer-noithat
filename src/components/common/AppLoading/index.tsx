import { Spinner } from "@heroui/react";
import { FC } from "react";

const AppLoading: FC<{ isLoading: boolean; size?: "md" | "lg" | "sm" }> = ({
  isLoading,
  size = "lg",
}) => {
  return isLoading ? (
    <div className="absolute w-full h-full flex justify-center items-center bg-black bg-opacity-5 z-50">
      <Spinner size={size} variant="gradient" />
    </div>
  ) : null;
};

export default AppLoading;
