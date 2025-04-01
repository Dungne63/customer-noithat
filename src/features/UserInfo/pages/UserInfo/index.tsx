import { FC } from "react";
import useUserInfo, { Props, ReceivedProps } from "./hook";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SelectItem,
} from "@heroui/react";
import AppInput from "@components/common/AppInput";
import AppSelect from "@components/common/AppSelect";
import { gender } from "@features/UserInfo/services/const";
import AppPhoneNumberInput from "@components/common/AppPhoneNumberInput";
import AppDatePicker from "@components/common/AppDatePicker";

const UserInfoLayout: FC<Props> = ({
  isOpen,
  onClose,
  handleSubmit,
  onSubmit,
  errors,
  control,
  onOpenUserAddress,
  addresses,
}) => {
  console.log("addresses", addresses);
  return (
    <div>
      <Modal
        size="3xl"
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                Thông tin người dùng
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12">
                    <div className="mb-2">Email</div>
                    <AppInput control={control} name="email" isReadOnly />
                    <div className="text-danger text-xs mt-1">
                      {errors.email?.message}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div className="mb-2">Họ và tên</div>
                    <AppInput control={control} name="fullName" />
                    <div className="text-danger text-xs mt-1">
                      {errors.fullName?.message}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div className="mb-2">Số điện thoại</div>
                    <AppPhoneNumberInput control={control} name="phoneNumber" />
                    <div className="text-danger text-xs mt-1">
                      {errors.phoneNumber?.message}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div className="mb-2">Giới tính</div>
                    <AppSelect control={control} name="gender" size="md">
                      {gender.map((item) => (
                        <SelectItem key={item.value}>{item.label}</SelectItem>
                      ))}
                    </AppSelect>
                    <div className="text-danger text-xs mt-1">
                      {errors.gender?.message}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div className="mb-2">Ngày sinh</div>
                    <AppDatePicker control={control} name="birthday" />
                    <div className="text-danger text-xs mt-1">
                      {errors.birthday?.message}
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="text-xl mb-2">
                      Danh sách địa chỉ ({addresses?.length | 0})
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                      {addresses?.length > 0 &&
                        addresses.map((item: any, index: number) => {
                          return (
                            <div
                              key={index}
                              className="flex justify-between w-full border-1 rounded-lg p-2 shadow-lg hover:scale-105 duration-200"
                            >
                              <div className="flex flex-col w-full">
                                <div>
                                  <span className="font-semibold">
                                    địa chỉ:
                                  </span>{" "}
                                  {item.ward.name} - {item.district.name} -{" "}
                                  {item.province.name}
                                </div>
                                <div>
                                  <span className="font-semibold">
                                    chi tiết:
                                  </span>{" "}
                                  {item.address}
                                </div>
                              </div>
                              <div className="w-[100px]">
                                {item?.isDefault && "(Mặc định)"}
                              </div>
                            </div>
                          );
                        })}
                    </div>

                    <Button
                      onPress={onOpenUserAddress}
                      color="primary"
                      className="mt-4"
                    >
                      Thêm địa chỉ giao hàng
                    </Button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button color="primary" type="submit">
                  Lưu
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

const UserInfo: FC<ReceivedProps> = (props) => (
  <UserInfoLayout {...useUserInfo(props)} />
);

export default UserInfo;
