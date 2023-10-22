const row = [];
const task = [];
const check = [];
const hour = [];
const minute = [];
for (let i = 0; i < 24; i++) {
    row[i] = document.createElement("tr");
    task[i] = document.createElement("td");
    check[i] = document.createElement("td");
    hour[i] = document.createElement("td");
    minute[i] = document.createElement("td");
    for (let j = 0; j < 6; j++) {
        minute[i][j] = document.createElement("td");
    }
}

for (let i = 0; i < row.length; i++) {
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.id = "task"+i;
    taskInput.className = "task";
    taskInput.name = "task"+i;
    taskInput.value = "";
    task[i].appendChild(taskInput);

    const checkInput = document.createElement("input");
    checkInput.type = "checkbox";
    checkInput.id = "check"+i;
    checkInput.className = "check";
    checkInput.name = "check"+i;
    checkInput.value = "";
    check[i].appendChild(checkInput);

    const hourText = document.createTextNode(i+":00");
    hour[i].appendChild(hourText);

    for (let j = 0; j < 6; j++) {
        const minuteInput = document.createElement("input");
        minuteInput.type = "checkbox";
        minuteInput.id = "minute"+i;
        minuteInput.className = "minute";
        minuteInput.name = "minute"+i;
        minuteInput.value = "";
        minute[i][j].appendChild(minuteInput);
    }
}

const table = document.getElementById("tasktable")
for (let i = 0; i < row.length; i++) {
    table.appendChild(row[i]);
    row[i].appendChild(task[i]);
    row[i].appendChild(check[i]);
    row[i].appendChild(hour[i]);
    for (let j = 0; j < 6; j++) {
        row[i].appendChild(minute[i][j]);
    }
}

const data = [];

for (let i = 0; i < row.length; i++) {
    const rowData = {
        task: document.getElementById("task" + i).value,
        check: document.getElementById("check" + i).checked,
        hour: i,
        minute: []
    };

    for (let j = 0; j < 6; j++) {
        rowData.minute.push(document.getElementById("minute" + i).children[j].checked);
    }

    data.push(rowData);
}

const jsonData = JSON.stringify(data);
console.log(jsonData);
