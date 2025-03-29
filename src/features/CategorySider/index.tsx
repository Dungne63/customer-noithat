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

const CategorySiderLayout: FC<Props> = ({ isOpen, onClose }) => {
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
              Custom Motion Drawer
            </DrawerHeader>
            <DrawerBody>
              <p>This drawer has custom enter/exit animations.</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                pulvinar risus non risus hendrerit venenatis. Pellentesque sit
                amet hendrerit risus, sed porttitor quam.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
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
