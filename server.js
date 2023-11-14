const express = require("express");
const {
  connectToMongoDB,
  closeMongoDBConnection,
  listDatabases,
  createDatabase,
  readData,
  updateDataByName,
  upsertDataByName,
  updateAllList,
  deleteListByName,
  readData2,
} = require("./mongo_connection");

const app = express();
const port = 3000;
const userRouter = require("./src/router/userRouter");

app.use(express.static("public")); // ใช้ไฟล์ส่วน client-side ในโฟลเดอร์ 'public'
app.use(express.urlencoded({ extended: true }));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
