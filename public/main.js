document.addEventListener('DOMContentLoaded', function () {
  // ทำงานกับ DOM หลังจาก DOM ถูกโหลด
  const saveButton = document.getElementById('saveButton');
  const resultElement = document.getElementById('result');
  const resultElement2 = document.getElementById('result2');
  const resultElement3 = document.getElementById('result3');
  const resultElement4 = document.getElementById('result4');
  const updateButton = document.getElementById('saveButton');
  const updateInput = document.getElementById('updateInput');
  const testButton = document.getElementById('testButton');
  const table = document.getElementById('tasktable');
  const value1 = document.getElementById('task0');
  console.log(table);
  console.log(value1);
  
  testButton.addEventListener('click', testvaluetable);
  // runButton.addEventListener('click', runMongoDBFunction);
  saveButton.addEventListener('click', function () {
    fetch('/getMongoData') // ร้องขอข้อมูลจาก Express.js
      .then(response => response.json())
      .then(data => {
        console.log("data " + data)
        
        // const name = data.name; // ตัดสินใจจากผลลัพธ์ที่รับมา
        // const date = data.date;
        // const text = data.text;
        // const check = data.check;
        // // แสดงชื่อใน HTML
        // resultElement.textContent = `ชื่อ: ${name}`;
        // resultElement2.textContent = `int: ${date}`;
        // resultElement3.textContent = `string: ${text}`;
        // resultElement4.textContent = `bool: ${check}`;
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาด:', error);
      });
  });

  updateButton.addEventListener('click', function () {
    // const newName = updateInput.value; // รับข้อความจากอินพุท
    const Task = testvaluetable();

    // สร้างข้อมูลที่จะส่งไปยังเซิร์ฟเวอร์
    const requestData = {
      databaseName: 'sample_airbnb',
      collectionName: 'ListingAndReviews',
      currentName: "datatable",
      task: Task
    };
    console.log(requestData);
    // ส่งคำขอ HTTP ไปยังเซิร์ฟเวอร์เพื่ออัปเดตข้อมูล
    fetch('/updateData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .catch(error => {
        console.error('เกิดข้อผิดพลาด:', error);
      });

  });
});
async function testvaluetable(){
  const taskData = [];
  for (let i = 0; i < 24; i++) {
    const tas = "task" + i.toString();
    const value = document.getElementById(tas);
    // console.log(value);
    // console.log(value.value);
    taskData.push(value.value);
  }
  console.log(taskData);
  return taskData;
}
async function runMongoDBFunction() {
  try {
    const response = await fetch('/mongodb-action');
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error('Error calling MongoDB function');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

