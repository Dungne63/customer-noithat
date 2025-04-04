import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Button, Input, InputProps } from "@heroui/react";
import { useCallback } from "react";

export function SearchForm({
  valueInput,
  onChangeInput,
  onSearch,
  placeholder = "Nhập từ khóa tìm kiếm",
  ...rest
}: {
  valueInput: string;
  onChangeInput: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
} & InputProps) {
  const onSubmitSearch = useCallback(
    (event: any) => {
      onSearch();
      event.preventDefault();
    },
    [valueInput]
  );

  return (
    <form onSubmit={onSubmitSearch}>
      <Input
        size="md"
        classNames={{ inputWrapper: "rounded-full shadow-inner" }}
        placeholder={placeholder}
        value={valueInput}
        onValueChange={(e) => onChangeInput(e)}
        {...rest}
        endContent={
          <Button
            isIconOnly
            variant="light"
            size="sm"
            type={"submit"}
            // startContent={<MagnifyingGlassIcon className="size-6" />}
          >
            <MagnifyingGlassIcon className="size-5" />
          </Button>
        }
      />
    </form>
  );
}
