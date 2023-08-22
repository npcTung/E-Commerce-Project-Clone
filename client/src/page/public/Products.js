import React, { useCallback, useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  Breadcrumbs,
  InputSelect,
  Product,
  SearchItem,
} from "../../components";
import * as apis from "../../apis";
import Masonry from "react-masonry-css";
import { sorts } from "../../ultils/contants";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeClick, setActiveClick] = useState(null);
  const [params] = useSearchParams();
  const queries = {};
  const [sort, setSort] = useState();
  // CALL API PRODUCT
  const fetchProductsByCategory = async (queries) => {
    const response = await apis.apiGetProducts(queries);
    if (response.success) setProduct(response.products);
  };
  // ACTIVE FILTER
  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) setActiveClick(null);
      else setActiveClick(name);
    },
    [activeClick]
  );
  // CHANGE VALUE
  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );
  // SORT
  useEffect(() => {
    navigate({
      pathname: `/${category}`,
      search: createSearchParams({ sort }).toString(),
    });
  }, [sort]);
  // SORT PRODUCT
  useEffect(() => {
    let param = [];
    let priceQuery = {};
    if (category === ":category") queries.category = null;
    else queries.category = category;
    for (let i of params.entries()) param.push(i);
    for (let i of params) queries[i[0]] = i[1];
    if (queries.to && queries.from) {
      priceQuery = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.price;
    } else if (queries.from) queries.price = { gte: queries.from };
    else if (queries.to) queries.price = { lte: queries.to };
    delete queries.to;
    delete queries.from;
    const q = { ...priceQuery, ...queries };
    fetchProductsByCategory(q);
  }, [params]);

  return (
    <div className="w-full">
      <div className="bg-red-50 p-4">
        <div className="w-main mx-auto flex flex-col gap-4">
          <h1 className="uppercase text-xl font-semibold">{category}</h1>
          <Breadcrumbs category={category} />
        </div>
      </div>
      <div className="w-main mx-auto mt-10 flex flex-col gap-4">
        <div className="w-full flex items-center justify-between border p-2">
          <div className="w-3/5 flex-auto flex flex-col gap-2">
            <span className="font-semibold">Filter by</span>
            <div className="flex gap-2">
              <SearchItem
                name="price"
                activeClick={activeClick}
                changeActiveFilter={changeActiveFilter}
                type="input"
              />
              <SearchItem
                name="color"
                activeClick={activeClick}
                changeActiveFilter={changeActiveFilter}
              />
            </div>
          </div>
          <div className="w-1/5 flex flex-col gap-2">
            <span className="font-semibold">Sort by</span>
            <InputSelect
              value={sort}
              options={sorts}
              changeValue={changeValue}
            />
          </div>
        </div>
        <div className="w-full">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {product?.map((el) => (
              <Product
                key={el._id}
                productData={el}
                normal={true}
                masonry={true}
              />
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
};

export default Products;
