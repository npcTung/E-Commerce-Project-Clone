const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");
const Data = require("../data/ecommerce.json");
const categoryData = require("../data/cate_brand");
const slugify = require("slugify");

const fn = async (product) => {
  await Product.create({
    title: product?.name,
    slug: slugify(product?.name) + Math.round(Math.random() * 100) + "",
    description: product?.description,
    brand: product?.brand,
    price: Math.round(product?.price?.match(/\d/g).join("") / 100),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images,
    color: product?.variants?.find((el) => el.lable === "color")?.variants[0],
    thumb: product?.thumb,
    totalRatings: Math.round(Math.random() * 5),
  });
};

const insertProduct = asyncHandler(async (req, res) => {
  const promises = [];
  for (let product of Data) promises.push(fn(product));
  await Promise.all(promises);
  return res.status(200).json("Done");
});

const fn2 = async (cate) => {
  await ProductCategory.create({
    title: cate?.cate,
    brand: cate?.brand,
    image: cate?.image,
  });
};

const insertCategory = asyncHandler(async (req, res) => {
  const promises = [];
  for (let cate of categoryData) promises.push(fn2(cate));
  await Promise.all(promises);
  return res.status(200).json("Done");
});

module.exports = {
  insertProduct,
  insertCategory,
};
