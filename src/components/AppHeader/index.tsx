import { FC } from "react";
import useAppHeader, { Props, ReceivedProps } from "./hook";
import { PhoneIcon } from "@heroicons/react/24/solid";
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
} from "@heroui/react";
import { SITE_CONTACT, SITE_NAME, SITE_NAVBAR } from "@config/site";
import { Link } from "react-router";

const AppHeaderLayout: FC<Props> = ({ navigate, currentPath }) => {
  return (
    <div className="w-full max-w-[1200px]">
      <div className="flex w-full px-6">
        <div className="flex items-center gap-1">
          <PhoneIcon className="size-4" />
          {SITE_CONTACT.PHONE}
        </div>
      </div>
      <Navbar
        maxWidth="full"
        classNames={{
          // base: ["bg-[#b6eafa]"],
          item: ["data-[active=true]:text-primary"],
        }}
      >
        <NavbarBrand>
          <div
            className="text-primary font-bold text-2xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            {/* logo here */} {SITE_NAME}
          </div>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {SITE_NAVBAR.map((item) => {
            return !item?.children?.length ? (
              <NavbarItem
                key={item.to}
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
              <Dropdown>
                <NavbarItem>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="p-0 bg-transparent data-[hover=true]:bg-transparent text-lg hover:text-primary"
                      radius="sm"
                      variant="light"
                    >
                      {item.label}
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
            <Link to="/login">Đăng nhập</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" to="/register" variant="flat">
              Đăng ký
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

const AppHeader: FC<ReceivedProps> = (props) => (
  <AppHeaderLayout {...useAppHeader(props)} />
);

export default AppHeader;
