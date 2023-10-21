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

app.use(express.static("public")); // ใช้ไฟล์ส่วน client-side ในโฟลเดอร์ 'public'
app.use(express.json());

// app.get('/mongodb-action', async (req, res) => {
//     // รหัสการทำงานที่คุณต้องการดำเนินการ
//     res.json({ message: 'MongoDB function executed' });
//   });
app.get("/getMongoData", async (req, res) => {
  console.log("I am get");
  try {
    // ตัวอย่างการใช้งาน readData
    const result = await readData2("sample_airbnb", "ListingAndRevivews", {
      name: "datatable",
    });
    
    console.log("result " + result.name);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลจาก MongoDB" });
  }
});

app.post('/updateData', async (req, res) => {
  
  console.log("I am update");
  if (!req.body) {
    // ถ้า req.body ไม่มีค่า
    res.status(400).json({ error: 'ค่า req.body ไม่ถูกต้อง' });
    return; // จบการทำงาน
  }

  // ตรวจสอบค่าที่ต้องการ
  // if (!req.body.databaseName || !req.body.collectionName || !req.body.currentName || !req.body.newName) {
  //   res.status(400).json({ error: 'ข้อมูลไม่ครบถ้วน' });
  //   return;
  // }
  try {
    console.log(req.body);
    const { databaseName, collectionName, currentName, task ,date ,goal , time , session} = req.body;
    console.log(task);
    await updateDataByName("sample_airbnb", "ListingAndRevivews", {name: "datatable",} , { date:date , goal:goal, time:time , session: session , task:task });

    // res.json(result); // ส่งผลลัพธ์กลับไปที่เว็บเบราวเซอร์
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล' });
  }
});

app.get("/mongodb-action", async (req, res) => {
  await connectToMongoDB(); // เชื่อมต่อ MongoDB
  // listDatabases();
  await readData("sample_airbnb", "ListingAndRevivews", { name: "datatable" });

  await closeMongoDBConnection(); // ปิดการเชื่อมต่อ MongoDB

  res.json({ message: "MongoDB function executed" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
