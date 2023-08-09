import icons from "./icons";

const { BsStarFill, BsStar } = icons;

export const createSlug = (str) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const formatMoney = (num) => Number(num.toFixed(1)).toLocaleString();

export const renderStarFromNumber = (num) => {
  if (!Number(num)) return;
  const star = [];
  for (let i = 0; i < +num; i++) star.push(<BsStarFill key={i} />);
  for (let i = 5; i > +num; i--) star.push(<BsStar key={i} />);
  return star;
};
