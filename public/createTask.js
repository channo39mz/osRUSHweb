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

    const minuteInput = [];
    for (let j = 0; j < 6; j++) {
        minuteInput[i] = []
        minuteInput[i][j] = document.createElement("input");
        minuteInput[i][j].type = "checkbox";
        minuteInput[i][j].id = "minute"+i+"_"+j;
        minuteInput[i][j].className = "minute";
        minuteInput[i][j].name = "minute"+i+"_"+j;
        minuteInput[i][j].value = "";
        minute[i][j].appendChild(minuteInput[i][j]);
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