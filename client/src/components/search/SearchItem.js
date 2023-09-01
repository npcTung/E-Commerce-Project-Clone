import React, { memo, useEffect, useState } from "react";
import icons from "ultils/icons";
import { colors } from "ultils/contants";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import * as apis from "apis";
import useDebounce from "hooks/useDebounce";
import Swal from "sweetalert2";

const { MdOutlineKeyboardArrowDown } = icons;

const SearchItem = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
}) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [params] = useSearchParams();
  const [selected, setSelected] = useState([]);
  const [bestPrice, setBestPrice] = useState(null);
  const [price, setPrice] = useState({ from: "", to: "" });
  const debouncePriceFrom = useDebounce(price.from, 1500);
  const debouncePriceTo = useDebounce(price.to, 1500);
  // SELECT CHEACKBOK
  const handleSelect = (e) => {
    changeActiveFilter(null);
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl)
      setSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
  };
  // BEST PRICE PRODUCT
  const fetchBestPriceProduct = async () => {
    const response = await apis.apiGetProducts({ sort: "-price", limit: 1 });
    if (response.success) setBestPrice(response.products[0]?.price);
  };
  // CHECK PRICE
  useEffect(() => {
    if (price.from < 0) return;
    if (price.to > +bestPrice) return;
    const TimeOutId = setTimeout(() => {
      if (price.from && price.to && price.from > price.to)
        Swal.fire(
          "Oops!",
          "From price cannot greater than To price",
          "error"
        ).then(() => {
          setPrice({ from: "", to: "" });
          changeActiveFilter(name);
        });
    }, 1000);
    return clearTimeout(TimeOutId);
  }, [price]);
  // NAVIGATE COLOR
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (selected.length > 0) {
      if (selected) queries.color = selected.join(",");
      delete queries.page;
    } else delete queries.color;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [selected]);
  // NAVIGATE PRICE
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (Number(price.from) > 0) {
      queries.from = price.from;
      delete queries.page;
    } else {
      delete queries.from;
      delete queries.page;
    }
    if (Number(price.to) > 0) {
      queries.to = price.to;
      delete queries.page;
    } else {
      delete queries.to;
      delete queries.page;
    }
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [debouncePriceFrom, debouncePriceTo]);
  // BEST PRICE PRODUCT
  useEffect(() => {
    if (type === "input") fetchBestPriceProduct();
  }, [type]);

  return (
    <div
      onClick={() => {
        changeActiveFilter(name);
      }}
      className={`p-4 border rounded-md border-gray-800 ${
        activeClick === name ? "border-2" : "hover:border-2"
      } h-14 cursor-default flex items-center justify-between relative`}
    >
      <span className="flex justify-between items-center text-sm text-gray-500">
        <span className="pr-6 capitalize">{name}</span>
        <span>
          <MdOutlineKeyboardArrowDown />
        </span>
      </span>
      {activeClick === name && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute border bg-white top-[110%] left-0 w-fit z-10"
        >
          {type === "checkbox" && (
            <div className="min-w-[350px]">
              <div className="border-b">
                <div className="p-4 flex items-center justify-between text-sm">
                  <span className="whitespace-nowrap">{`${selected.length} select`}</span>
                  <span
                    onClick={() => {
                      setSelected([]);
                      changeActiveFilter(name);
                    }}
                    className="underline hover:text-main cursor-pointer"
                  >
                    Reset
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-col gap-1 p-4">
                {colors?.map((el, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1"
                  >
                    <input
                      type="checkbox"
                      name={el}
                      value={el}
                      className="w-4 rounded h-4 border border-gray-400 cursor-pointer checkbox checkbox-primary"
                      onChange={handleSelect}
                      id={el}
                      checked={selected.some(
                        (selectedItem) => selectedItem === el
                      )}
                    />
                    <label
                      className="capitalize cursor-pointer"
                      htmlFor={el}
                      id={el}
                    >
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === "input" && (
            <div className="min-w-[350px]">
              <div className="border-b">
                <div className="p-4 flex items-center justify-between text-sm">
                  <span className="whitespace-nowrap flex flex-col">
                    <span>{`Giá cao nhất là ${Number(
                      bestPrice
                    ).toLocaleString()} VND`}</span>
                    <span>Giá trị đầu vào mặc định là VND</span>
                  </span>
                  <span
                    onClick={() => {
                      setPrice({ from: "", to: "" });
                      changeActiveFilter(name);
                    }}
                    className="underline hover:text-main cursor-pointer"
                  >
                    Reset
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-col gap-1 p-4">
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1">
                  <div className="flex items-center gap-2">
                    <label htmlFor="from" className="text-gray-500 capitalize">
                      from
                    </label>
                    <input
                      type="number"
                      id="from"
                      value={price.from}
                      className="input input-bordered w-[150px] bg-gray-100"
                      onChange={(e) =>
                        setPrice((prev) => ({ ...prev, from: e.target.value }))
                      }
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="to"
                      className="text-gray-500 pl-5 capitalize"
                    >
                      to
                    </label>
                    <input
                      type="number"
                      id="to"
                      value={price.to}
                      className="input input-bordered w-[150px] bg-gray-100"
                      onChange={(e) =>
                        setPrice((prev) => ({ ...prev, to: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
