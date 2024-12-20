const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery", false);

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB);
    if (conn.connection.readyState === 1)
      console.log("DB connection is successfully!");
    else console.log("DB connecting");
  } catch (err) {
    console.log("DB connection is failed");
    throw new Error(err);
  }
};
module.exports = dbConnection;
