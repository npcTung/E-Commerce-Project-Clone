import React, { memo } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const PagiItem = ({ value }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { category } = useParams();

  const handlePagination = () => {
    let param = [];
    const queries = {};
    for (let i of params.entries()) param.push(i);
    for (let i of param) queries[i[0]] = i[1];
    if (Number(value)) queries.page = value;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  };

  return (
    <button
      className={`h-10 w-10 flex items-center justify-center p-2 rounded-md border ${
        Number(value) && "hover:bg-main hover:text-white"
      } ${+params.get("page") === +value && "bg-main text-white"} ${
        !params.get("page") && +value === 1 && "bg-main text-white"
      } transition-all`}
      onClick={handlePagination}
      type="button"
      disabled={!Number(value)}
    >
      <span className="text-sm">{value}</span>
    </button>
  );
};

export default memo(PagiItem);
