import React, { memo } from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import icons from "../ultils/icons";

const { MdOutlineKeyboardArrowRight } = icons;

const Breadcrumbs = ({ title, category }) => {
  const routes = [
    { path: "/", breadcrumb: "home" },
    { path: "/:category", breadcrumb: category },
    { path: "/:category/:pid/:title", breadcrumb: title?.toLowerCase() },
  ];
  const breadcrumb = useBreadcrumbs(routes);
  return (
    <div className="text-sm flex items-center gap-1">
      {breadcrumb
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link
            key={match.pathname}
            to={match.pathname}
            className="flex items-center gap-1"
          >
            <span className="capitalize hover:text-main transition-all">
              {breadcrumb}
            </span>
            {index !== self.length - 1 && <MdOutlineKeyboardArrowRight />}
          </Link>
        ))}
    </div>
  );
};

export default memo(Breadcrumbs);
