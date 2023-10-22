document.addEventListener('DOMContentLoaded', function () {
  // ทำงานกับ DOM หลังจาก DOM ถูกโหลด
  const saveButton = document.getElementById('saveButton');
  const loadButton = document.getElementById('loadButton');
  const testButton = document.getElementById('testButton');
  const table = document.getElementById('tasktable');
  
  window.onload = function () {
    fetch('/getMongoData') // ร้องขอข้อมูลจาก Express.js
      .then(response => response.json())
      .then(data => {
        const date = document.getElementById('date');
        date.value = data.date;
        const goal = document.getElementById('goal');
        goal.value = data.goal;
        const time = document.getElementById('time');
        time.value = data.time;
        const session = document.getElementById('session');
        session.value = data.session;
        for (let i = 0; i < 24; i++) {
          const tas = "task" + i.toString();
          const value = document.getElementById(tas);
          // console.log(tas);
          console.log(data.task[i])
          value.value = data.task[i];
          // value.textContent = data.task[i]; // กำหนดค่าให้ value จาก data.task[i]
        }
        for (let i = 0; i < 24; i++) {
          for(let j = 0; j < 6; j++){
            const tas = "minute" + i.toString() +"_"+j.toString();
            const value = document.getElementById(tas);
            value.checked = data.minute[i][j];
          }
        }
        for (let i = 0; i < 24; i++) {
          const tas = "check" + i.toString();
          const value = document.getElementById(tas);
          // console.log(tas);
          console.log(data.task[i])
          value.checked = data.check[i];
          // value.textContent = data.task[i]; // กำหนดค่าให้ value จาก data.task[i]
        }
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาด:', error);
      });
    console.log('เว็บโหลดเสร็จแล้ว');
    // เพิ่มโค้ดอื่น ๆ ที่คุณต้องการให้ทำงานที่นี่
  };

  testButton.addEventListener('click', gettimetable);
  // runButton.addEventListener('click', runMongoDBFunction);
  loadButton.addEventListener('click', function () {
    fetch('/getMongoData') // ร้องขอข้อมูลจาก Express.js
      .then(response => response.json())
      .then(data => {
        const date = document.getElementById('date');
        date.value = data.date;
        const goal = document.getElementById('goal');
        goal.value = data.goal;
        const time = document.getElementById('time');
        time.value = data.time;
        const session = document.getElementById('session');
        session.value = data.session;
        for (let i = 0; i < 24; i++) {
          const tas = "task" + i.toString();
          const value = document.getElementById(tas);
          // console.log(tas);
          console.log(data.task[i])
          value.value = data.task[i];
          // value.textContent = data.task[i]; // กำหนดค่าให้ value จาก data.task[i]
        }
        for (let i = 0; i < 24; i++) {
          for(let j = 0; j < 6; j++){
            const tas = "minute" + i.toString() +"_"+j.toString();
            const value = document.getElementById(tas);
            value.checked = data.minute[i][j];
          }
        }
        for (let i = 0; i < 24; i++) {
          const tas = "check" + i.toString();
          const value = document.getElementById(tas);
          // console.log(tas);
          console.log(data.task[i])
          value.checked = data.check[i];
          // value.textContent = data.task[i]; // กำหนดค่าให้ value จาก data.task[i]
        }
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาด:', error);
      });
  });

  saveButton.addEventListener('click', async function () {
    
    console.log("here");
    const taskData = await testvaluetable();
    const minuteData = await gettimetable();
    const check = await getchecktable();
    const date = document.getElementById('date');
    const newdate = date.value;
    const goal = document.getElementById('goal');
    const newgoal = goal.value;
    const time = document.getElementById('time');
    const newtime = time.value;
    const session = document.getElementById('session');
    const newsession = session.value;
    console.log(taskData);
    console.log(minuteData);

    // สร้างข้อมูลที่จะส่งไปยังเซิร์ฟเวอร์
    const requestData = {
        databaseName: 'sample_airbnb',
        collectionName: 'ListingAndReviews',
        currentName: "datatable",
        date: newdate,
        goal: newgoal,
        time: newtime,
        session: newsession,
        task: taskData,
        check: check,
        minute: minuteData
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

async function testvaluetable() {
    const taskData = [];
    for (let i = 0; i < 24; i++) {
        const tas = "task" + i.toString();
        const value = document.getElementById(tas);
        taskData.push(value.value);
    }
    console.log(taskData);
    return taskData;
}
async function gettimetable() {
  const timeData = [];
  for (let i = 0; i < 24; i++) {
      const littletime = [];
      for(let j = 0; j < 6; j++){
        const tas = "minute" + i.toString() +"_"+j.toString();
        const value = document.getElementById(tas);
        console.log(value)
        littletime.push(value.checked);
      }
      timeData.push(littletime);
  }
  console.log(timeData);
  return timeData;
}

async function getchecktable() {
  const checkData = [];
  for (let i = 0; i < 24; i++) {
      const tas = "check" + i.toString();
      const value = document.getElementById(tas);
      console.log(value);
      checkData.push(value.checked);
  }
  console.log(checkData);
  return checkData;
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
});
