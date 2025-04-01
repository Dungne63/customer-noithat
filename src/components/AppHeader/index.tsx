import { FC } from "react";
import useAppHeader, { Props, ReceivedProps } from "./hook";
import { ChevronDownIcon, PhoneIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon,
  MapPinIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Badge,
} from "@heroui/react";
import { SITE_CONTACT, SITE_NAME, SITE_NAVBAR } from "@config/site";
import { Link } from "react-router";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ROUTE_PATHS } from "@constants/route.const";
import { SearchForm } from "@components/SearchInput";

const AppHeaderLayout: FC<Props> = ({
  navigate,
  currentPath,
  onOpenCategorySider,
  onOpenCartSider,
  onOpenUserInfoModal,
  cartLength,
  user,
}) => {
  return (
    <div className="flex flex-col w-full bg-white">
      <div className="bg-orange-50 w-full flex justify-center px-4">
        <div className="flex w-full max-w-[1280px] items-center justify-between gap-4 h-[40px] shadow-sm border-b-1">
          <div className="flex gap-4">
            <div className="flex items-center gap-1 font-semibold">
              <PhoneIcon className="size-4" />
              {SITE_CONTACT.PHONE}
            </div>
            {[
              { label: "Giới thiệu", to: "/About" },
              { label: "Khuyến mãi", to: "/Voucher" },
              { label: "Giảm giá đặc biệt", to: "/Voucher" },
            ].map((item) => (
              <Link
                key={item.label}
                aria-current="page"
                to={item.to || "/"}
                className={`text-sm hover:text-primary ${
                  item.label === "Giảm giá đặc biệt" && "text-danger"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-4">
            <div className="cursor-pointer hover:text-black flex items-center">
              <MapPinIcon className="size-6" />
            </div>

            <div className="cursor-pointer hover:text-black flex items-center">
              <Badge content={1} isInvisible={false} color="primary" size="sm">
                <HeartIcon className="size-6" />
              </Badge>
            </div>
            <div
              className="cursor-pointer hover:text-black flex items-center"
              onClick={onOpenCartSider}
            >
              <Badge
                content={cartLength}
                isInvisible={!cartLength}
                color="primary"
                size="sm"
              >
                <ShoppingBagIcon className="size-6" />
              </Badge>
            </div>
            {user.id ? (
              <div className="flex text-sm items-center gap-1 select-none">
                Tài khoản{" "}
                <div
                  className="hover:text-black cursor-pointer font-semibold"
                  onClick={onOpenUserInfoModal}
                >
                  {user.email}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <div
                  className="flex text-sm hover:text-black cursor-pointer"
                  onClick={() => navigate("/" + ROUTE_PATHS.LOGIN)}
                >
                  Đăng nhập
                </div>
                /
                <div
                  className="flex text-sm hover:text-black cursor-pointer"
                  onClick={() => navigate("/" + ROUTE_PATHS.REGISTER)}
                >
                  Đăng ký
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center px-4 select-none">
        <div className="max-w-[1280px] w-full">
          <Navbar
            maxWidth="full"
            classNames={{
              // base: ["bg-[#b6eafa]"],
              item: ["data-[active=true]:text-primary"],
              wrapper: ["px-0"],
            }}
          >
            <div className="cursor-pointer" onClick={onOpenCategorySider}>
              <Bars3Icon className="size-8" />
            </div>
            <NavbarBrand>
              <div
                className="text-primary font-bold text-2xl cursor-pointer flex gap-4 items-center select-none"
                onClick={() => navigate("/")}
              >
                <img src="/logo.jfif" className="w-[50px]" /> {SITE_NAME}
              </div>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              {SITE_NAVBAR.map((item) => {
                return !item?.children?.length ? (
                  <NavbarItem
                    key={item.label}
                    isActive={currentPath === "/" + item.to}
                  >
                    <Link
                      aria-current="page"
                      to={item.to || "/"}
                      className="text-lg hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </NavbarItem>
                ) : (
                  <Dropdown key={item.label}>
                    <NavbarItem>
                      <DropdownTrigger>
                        <Button
                          disableRipple
                          className="p-0 bg-transparent data-[hover=true]:bg-transparent text-lg hover:text-primary"
                          radius="sm"
                          variant="light"
                        >
                          {item.label}{" "}
                          <ChevronDownIcon className="size-4 ml-[-4px]" />
                        </Button>
                      </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                      aria-label="ACME features"
                      itemClasses={{
                        base: "gap-4",
                      }}
                    >
                      {item.children.map((child) => (
                        <DropdownItem
                          key={child.to}
                          // description="ACME scales apps based on demand and load"
                          onPress={() => navigate(child.to)}
                        >
                          {child.label}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                );
              })}
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem className="hidden lg:flex">
                {/* <SearchForm
                  onChangeInput={() => null}
                  onSearch={() => null}
                  valueInput=""
                /> */}
              </NavbarItem>
            </NavbarContent>
          </Navbar>
        </div>
      </div>
    </div>
  );
};

const AppHeader: FC<ReceivedProps> = (props) => (
  <AppHeaderLayout {...useAppHeader(props)} />
);

export default AppHeader;
