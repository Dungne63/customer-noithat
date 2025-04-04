import { FC } from "react";
import useCategorySider, { Props, ReceivedProps } from "./hook";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/react";
import AppAccordion from "@components/common/AppAccordion";

const CategorySiderLayout: FC<Props> = ({
  isOpen,
  onClose,
  categories,
  navigateWithQueryURL,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            x: 0,
            duration: 0.3,
          } as any,
          exit: {
            x: -100,
            opacity: 0,
            duration: 0.3,
          } as any,
        },
      }}
      onClose={onClose}
      placement="left"
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              Danh mục sản phẩm
            </DrawerHeader>
            <DrawerBody>
              <AppAccordion
                data={categories}
                childrenField="children"
                onChooseItem={(item) => {
                  onClose();
                  navigateWithQueryURL(item._id);
                }}
              />
            </DrawerBody>
            <DrawerFooter>
              {/* <Button color="danger" variant="light" onPress={onClose}>
                Đóng
              </Button> */}
              {/* <Button color="primary" onPress={onClose}>
                Action
              </Button> */}
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

const CategorySider: FC<ReceivedProps> = (props) => (
  <CategorySiderLayout {...useCategorySider(props)} />
);

export default CategorySider;
