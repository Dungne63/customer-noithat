import { Input, InputProps } from "@heroui/react";
import { validateOnlyNumber } from "@utils/validate.util";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type WithControl<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};

type WithoutControl = {
  control?: never;
  name?: never;
};

type AppPhoneNumberInputProps<T extends FieldValues> = InputProps &
  (WithControl<T> | WithoutControl);

const AppPhoneNumberInput = <T extends FieldValues>({
  control,
  name,
  ...rest
}: AppPhoneNumberInputProps<T>) => {
  return !!control && !!name ? (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        return (
          <Input
            value={value}
            onChange={(e: any) => {
              if (
                validateOnlyNumber(
                  e?.currentTarget?.value || e?.currentTarget?.value === ""
                )
              ) {
                onChange?.(e?.currentTarget?.value);
              }
            }}
            {...rest}
          />
        );
      }}
    />
  ) : (
    <Input {...rest} />
  );
};

export default AppPhoneNumberInput;
