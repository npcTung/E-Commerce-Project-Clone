const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createNewCoupon = asyncHandler(async (req, res) => {
  const response = await Coupon.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdCoupon: response ? response : "cannot create new Coupon",
  });
});

const getCoupons = asyncHandler(async (req, res) => {
  const response = await Coupon.find();
  return res.status(200).json({
    success: response ? true : false,
    Coupon: response ? response : "cannot get Coupon",
  });
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await Coupon.findByIdAndUpdate(cid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updatedCoupon: response ? response : "cannot update Coupon",
  });
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await Coupon.findByIdAndDelete(cid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    deletedCoupon: response ? "deleted Coupon" : "cannot delete Coupon",
  });
});

module.exports = {
  createNewCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
};
