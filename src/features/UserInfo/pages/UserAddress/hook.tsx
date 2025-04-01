import { editUserSchemas } from "@features/UserInfo/schemas/editUserSchemas";
import { defaultEditUserForm } from "@features/UserInfo/services/const";
import {
  UserInfoActions,
  UserInfoSelectors,
} from "@features/UserInfo/services/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export type ReceivedProps = Record<string, any>;

const useUserAddress = (props: ReceivedProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isOpen = useAppSelector(UserInfoSelectors.isOpenModalUserAddress);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState<any>();
  const [district, setDistrict] = useState<any>();
  const [ward, setWard] = useState<any>();
  const [address, setAddress] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const [filterProvinceValue, setFilterProvinceValue] = useState<string>("");
  const [filterDistrictValue, setFilterDistrictValue] = useState<string>("");
  const [filterWardValue, setFilterWardValue] = useState<string>("");

  const provinceFiltered = useMemo(
    () =>
      provinces.filter((item: any) =>
        item.name.toLowerCase().includes(filterProvinceValue.toLowerCase())
      ),
    [filterProvinceValue, provinces]
  );

  const districtFiltered = useMemo(
    () =>
      districts?.filter((item: any) =>
        item.name.toLowerCase().includes(filterDistrictValue.toLowerCase())
      ),
    [filterDistrictValue, districts]
  );

  const wardFiltered = useMemo(
    () =>
      wards.filter((item: any) =>
        item.name.toLowerCase().includes(filterWardValue.toLowerCase())
      ),
    [filterWardValue, wards]
  );

  const onClose = () => {
    dispatch(UserInfoActions.setIsOpenModalUserAddress(false));
    resetForm();
  };

  const onChooseProvince = (data: any) => {
    if (data) {
      setProvince(provinces.find((item: any) => item?.code == data));
      dispatch(
        UserInfoActions.getDistricts({
          provinceCode: data,
          onSuccess: (rs: any) => setDistricts(rs),
        })
      );
    }
    setDistrict(null);
    setWard(null);
  };

  const onChooseDistrict = (data: any) => {
    if (data) {
      setDistrict(districts.find((item: any) => item?.code == data));
      dispatch(
        UserInfoActions.getWards({
          districtCode: data,
          onSuccess: (rs: any) => setWards(rs),
        })
      );
    }

    setWard(null);
  };

  const onChooseWard = (data: any) => {
    if (!data) return;
    setWard(wards.find((item: any) => item?.code == data));
  };

  useEffect(() => {
    dispatch(
      UserInfoActions.getProvinces({
        onSuccess: (rs: any) => setProvinces(rs),
      })
    );
  }, []);

  const onSubmit = () => {
    if (province && district && ward && address) {
      dispatch(
        UserInfoActions.updateUserAddress({
          body: {
            province,
            district,
            ward,
            address,
            isDefault: !!isDefault,
          },
          onSuccess: onClose,
        })
      );
    }
  };

  const resetForm = () => {
    setProvince(null);
    setDistrict(null);
    setWard(null);
    setAddress("");
    setIsDefault(false);
  };

  return {
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
    ...props,
  };
};

export type Props = ReturnType<typeof useUserAddress>;

export default useUserAddress;
