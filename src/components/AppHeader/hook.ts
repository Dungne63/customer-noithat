import { AppSelectors } from "@app/slice";
import {
  CartSiderActions,
  CartSiderSelectors,
} from "@features/CartSider/services/slice";
import {
  CategorySiderActions,
  CategorySiderSelectors,
} from "@features/CategorySider/services/slice";
import { UserInfoActions } from "@features/UserInfo/services/slice";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useLocation, useNavigate } from "react-router";
import qs from "qs";
import { ROUTE_PATHS } from "@constants/route.const";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import SysFetch from "@services/axios";

export type ReceivedProps = Record<string, any>;

const useAppHeader = (props: ReceivedProps) => {
  const navigate = useNavigate();
  const { pathname: currentPath } = useLocation();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>();
  const [resultsSearch, setResultsSearch] = useState<any>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  console.log("show", show);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const cartLength = useAppSelector(CartSiderSelectors.cart)?.length || 0;
  const user = useAppSelector(AppSelectors.userInfo);
  const categories = useAppSelector(CategorySiderSelectors.categories);

  const navigateWithQueryURL = (productName: string) => {
    navigate(
      `${ROUTE_PATHS.PRODUCT_ALL}?${qs.stringify({ search: productName })}`
    );
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpenSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchResults = async (value: string) => {
    const body = {
      limit: 100,
      page: 1,
      // totalItems: 0,
      // totalPages: 1,
      search: value,
    };
    try {
      setIsLoadingSearch(true);
      const response: any = await SysFetch.get(
        `/product?${qs.stringify(body)}`
      );
      if (response.statusCode === 200) {
        setResultsSearch(response.data.data);
      } else {
        throw new Error("Failed to fetch search results");
      }
    } catch (error) {
      setResultsSearch([]);
    } finally {
      setIsLoadingSearch(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      fetchResults(value);
    }, 500),
    []
  );

  useEffect(() => {
    if (isOpenSearch) {
      debouncedSearch(searchValue?.trim());
    }
  }, [searchValue]);

  const onFilterChange = (value: string) => {
    setSearchValue(value);
  };

  const onOpenCategorySider = () => {
    dispatch(CategorySiderActions.setIsOpening(true));
  };
  const onOpenCartSider = () => {
    dispatch(CartSiderActions.setIsOpening(true));
  };

  const onOpenUserInfoModal = () => {
    dispatch(UserInfoActions.setIsOpenModalUser(true));
  };

  return {
    user,
    navigateWithQueryURL,
    navigate,
    currentPath,
    onOpenCategorySider,
    onOpenCartSider,
    onOpenUserInfoModal,
    cartLength,
    categories,
    searchValue,
    setSearchValue,
    wrapperRef,
    isOpenSearch,
    setIsOpenSearch,
    onFilterChange,
    resultsSearch,
    setResultsSearch,
    isLoadingSearch,
    show,
    ...props,
  };
};

export type Props = ReturnType<typeof useAppHeader>;

export default useAppHeader;
