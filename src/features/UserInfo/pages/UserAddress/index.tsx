import { FC } from "react";
import useUserAddress, { Props, ReceivedProps } from "./hook";
import {
  Autocomplete,
  AutocompleteItem,
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
import AppSwitch from "@components/common/AppSwitch";

const UserAddressLayout: FC<Props> = ({
  navigate,
  isOpen,
  onClose,
  onSubmit,
  province,
  district,
  ward,
  onChooseProvince,
  onChooseDistrict,
  onChooseWard,
  address,
  setAddress,
  isDefault,
  setIsDefault,
  setFilterProvinceValue,
  setFilterDistrictValue,
  setFilterWardValue,
  provinceFiltered,
  districtFiltered,
  wardFiltered,
}) => {
  return (
    <div>
      <Modal
        size="3xl"
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Cập nhật địa chỉ giao hàng
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                  <p className="text-xs sm:text-base">Tỉnh/Thành phố</p>
                  <Autocomplete
                    allowsEmptyCollection={false}
                    aria-label="province list"
                    classNames={{
                      clearButton: "pointer-events-auto absolute right-[30px]",
                    }}
                    isClearable={true}
                    items={provinceFiltered}
                    placeholder="Chọn Tỉnh/Thành phố"
                    selectedKey={String(province?.code)}
                    size="md"
                    onInputChange={setFilterProvinceValue}
                    onSelectionChange={onChooseProvince}
                  >
                    {(oneItem: any) =>
                      oneItem && (
                        <AutocompleteItem key={`${oneItem?.code}`}>
                          {oneItem.name}
                        </AutocompleteItem>
                      )
                    }
                  </Autocomplete>
                </div>
                <div className="col-span-4">
                  <p className="text-xs sm:text-base">Quận/Huyện</p>
                  <Autocomplete
                    allowsEmptyCollection={false}
                    aria-label="district list"
                    classNames={{
                      clearButton: "pointer-events-auto absolute right-[30px]",
                    }}
                    isClearable={true}
                    isDisabled={!province}
                    items={districtFiltered}
                    placeholder="Chọn Quận/Huyện"
                    selectedKey={String(district?.code)}
                    size="md"
                    onInputChange={setFilterDistrictValue}
                    onSelectionChange={(value) => {
                      onChooseDistrict(value);
                    }}
                  >
                    {(oneItem: any) =>
                      oneItem && (
                        <AutocompleteItem key={`${oneItem?.code}`}>
                          {oneItem.name}
                        </AutocompleteItem>
                      )
                    }
                  </Autocomplete>
                </div>
                <div className="col-span-4">
                  <p className="text-xs sm:text-base">Phường/Xã</p>
                  <Autocomplete
                    allowsEmptyCollection={false}
                    aria-label="ward list"
                    classNames={{
                      clearButton: "pointer-events-auto absolute right-[30px]",
                    }}
                    isClearable={true}
                    isDisabled={!district}
                    items={wardFiltered}
                    placeholder="Chọn Phường/Xã"
                    selectedKey={String(ward?.code)}
                    size="md"
                    onInputChange={setFilterWardValue}
                    onSelectionChange={(value) => onChooseWard(value)}
                  >
                    {(oneItem: any) =>
                      oneItem && (
                        <AutocompleteItem key={`${oneItem?.code}`}>
                          {oneItem.name}
                        </AutocompleteItem>
                      )
                    }
                  </Autocomplete>
                </div>

                <div className="col-span-12">
                  <div className="mb-2">Địa chỉ chi tiết</div>
                  <AppInput
                    onValueChange={(e) => setAddress(e)}
                    value={address}
                    placeholder="Số nhà, số ngõ, tên đường, ..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <div className="mb-2">Đặt làm địa chỉ mặc định</div>
                  <AppSwitch
                    isSelected={isDefault}
                    onValueChange={setIsDefault}
                    placeholder="Số nhà, ngõ, tên đường, ..."
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Đóng
              </Button>
              <Button color="primary" onPress={onSubmit}>
                Lưu
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

const UserAddress: FC<ReceivedProps> = (props) => (
  <UserAddressLayout {...useUserAddress(props)} />
);

export default UserAddress;
