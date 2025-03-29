import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Button, Input, InputProps } from "@heroui/react";

const PasswordInput = (props: InputProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <Input
      endContent={
        <Button
          isIconOnly
          className="z-50"
          size="sm"
          variant="light"
          onPress={() => setIsShowPassword(!isShowPassword)}
        >
          {isShowPassword ? (
            <EyeSlashIcon className="size-4" />
          ) : (
            <EyeIcon
              className="size-4"
              onClick={() => setIsShowPassword(!isShowPassword)}
            />
          )}
        </Button>
      }
      type={isShowPassword ? "text" : "password"}
      {...props}
    />
  );
};

export default PasswordInput;
