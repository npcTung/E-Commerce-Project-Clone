const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");

const register = asyncHandler(async (req, res) => {
  const { email, password, firtname, lastname } = req.body;
  if (!email || !password || !firtname || !lastname) {
    return res.status(400).json({
      sucess: false,
      mes: "Missing input",
    });
  }

  const user = await User.findOne({ email });
  if (user) throw new Error("User has exised");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      sucess: newUser ? true : false,
      mes: newUser
        ? "Register is successfully. Please go login~"
        : "Something went wrong",
    });
  }
});
/*
refresh token => cấp mới access token
Access token => Xác thực người dùng, cấp quyền người dùng
*/
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      sucess: false,
      mes: "Missing input",
    });
  }

  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, role, ...userData } = response.toObject();
    const accessToken = generateAccessToken(response._id, role);
    const refreshToken = generateRefreshToken(response._id);
    await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      sucess: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error("Invalid credentials!");
  }
});

const getCurrent = asyncHandler(async (req, res) => {
  const { id } = req.user;
  if (!id) {
    return res.status(400).json({
      sucess: false,
      mes: "Missing input",
    });
  }

  const user = await User.findById({ _id: id }).select(
    "-refreshToken -password -role"
  );
  return res.status(200).json({
    sucess: true,
    rs: user ? user : "User not found",
  });
});

module.exports = {
  register,
  login,
  getCurrent,
};
