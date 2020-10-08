// You Need to implement
//渲染整个页面
function renderPage() {
  showStatisticsCards();
  showAllTasks();
}

// 显示所有任务
function showAllTasks(sortKey = "createDate", sortValue = -1) {
  sortTasks(sortKey, sortValue);
  let allTasks = getAllTasks();
  createTaskBody(allTasks);
}

//显示任务统计栏数据
function showStatisticsCards() {
  let allTaskCount = document.querySelector("#all_task_count");
  let activeTaskCount = document.querySelector("#active_task_count");
  let paddingTaskCount = document.querySelector("#padding_task_count");
  let closedTaskCount = document.querySelector("#closed_task_count");

  let activeTaskProp = document.querySelector("#active_task_propoption")
  let paddingTaskProp = document.querySelector("#padding_task_propoption")
  let closedTaskProp = document.querySelector("#closed_task_propoption")

  let allTasks = getAllTasks();
  allTaskCount.textContent = allTasks.length;
  countTasks(activeTaskCount, "Active", activeTaskProp);
  countTasks(paddingTaskCount, "Padding", paddingTaskProp);
  countTasks(closedTaskCount, "Closed", closedTaskProp);
}

//统计任务数据
function countTasks(countDom, status, propDom) {
  countDom.textContent = 0;
  let allTasks = getAllTasks();
  allTasks.forEach(task => {
    if (task.status === status) {
      countDom.textContent++
    }
  });
  
  if(allTasks.length === 0) {
    propDom.textContent = "0%";
  }
  else {
    propDom.textContent = parseFloat((countDom.textContent/allTasks.length).toFixed(2)) * 100 + "%";
  }
}

//根据status筛选任务
function filterTaskByStatus(status) {
  if (status === "all") {
    showAllTasks();
  }
  else {
    tasks = findTaskByStatus(status);
    createTaskBody(tasks);
  }
}

//根据任务名筛选任务，点击搜索按钮搜索任务
function filterTaskByName() {
  let searchInput = document.querySelector("#search_input");
  if (searchInput.value) {
    let taskName = searchInput.value;
    let tasks = findTaskByName(taskName);
    createTaskBody(tasks);
  }
  else {
    showAllTasks();
  }
}

//搜索框回车搜索任务
function searchTasks(event) {
  let searchInput = document.querySelector("#search_input");
  if(event.keyCode === 13 && searchInput.value) {
    let taskName = searchInput.value;
    let tasks = findTaskByName(taskName);
    createTaskBody(tasks);
  }
    //keyCode被废弃？
  else if (event.keyCode === 13 && !searchInput.value) {
    showAllTasks();
  }
}

//根据任务名称排序
function sortTasks(sortKey, sortValue) {
  let tasks = getAllTasks();
  // let newTasks = [...allTasks];
  tasks.sort((taskA, taskB) => {
    if (taskA[sortKey] < taskB[sortKey]) {
      return -sortValue;
    }
    if (taskA[sortKey] > taskB[sortKey]) {
      return sortValue;
    }
    return 0;
  });

  let newTasks =  tasks.map((task, index) => {
    task.id = index + 1;
    return task;
  });
  saveAllTasks(newTasks);
}

//创建任务列表
function createTaskBody(tasks) {
  let taskBody = document.querySelector("#task_body");
  taskBody.innerHTML = '';
  tasks.forEach(task => {
    let taskRow = document.createElement("tr");
    taskRow.classList.add("task_row");

    let taskNumCol = document.createElement("td");
    taskNumCol.classList.add("task_num_col");
    taskNumCol.textContent = task.id;
    taskRow.appendChild(taskNumCol);

    let taskNameCol = document.createElement("td");
    taskNameCol.classList.add("task_name_col");
    taskNameCol.textContent = task.name;
    taskRow.appendChild(taskNameCol);

    let taskDescCol = document.createElement("td");
    taskDescCol.classList.add("task_desc_col");
    taskDescCol.textContent = task.description;
    taskRow.appendChild(taskDescCol);

    let taskDeadlineCol = document.createElement("td");
    taskDeadlineCol.classList.add("task_deadline_col");
    taskDeadlineCol.textContent = task.deadline;
    taskRow.appendChild(taskDeadlineCol);

    let taskStatusCol = document.createElement("td");
    taskStatusCol.classList.add("task_status_col");
    taskStatusCol.classList.add(task.status.toLowerCase());
    taskStatusCol.textContent = task.status;
    taskRow.appendChild(taskStatusCol);

    let taskOperationCol = document.createElement("td");
    taskOperationCol.classList.add("task_operation_col");
    //删除按钮
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn_icon");
    deleteBtn.setAttribute("onclick", "createDeleteTaskPopover(" + task.id + ")")
    let deleteImg = document.createElement("img");
    deleteImg.setAttribute("src", "images/delete.svg");
    deleteImg.setAttribute("alt", "delete");
    deleteBtn.appendChild(deleteImg);
    taskOperationCol.appendChild(deleteBtn);
    //更新按钮
    let updateBtn = document.createElement("button");
    updateBtn.classList.add("btn");
    updateBtn.classList.add("btn_icon");
    updateBtn.setAttribute("onclick", "createUpdateTaskPopover(" + task.id + ")");
    let updateImg = document.createElement("img");
    updateImg.setAttribute("src", "images/update.svg");
    updateImg.setAttribute("alt", "update");
    updateBtn.appendChild(updateImg);
    taskOperationCol.appendChild(updateBtn);

    taskRow.appendChild(taskOperationCol);
    taskBody.appendChild(taskRow);
  });
}

window.onload = function() {
  if(!getAllTasks()) {saveAllTasks([]);}
  renderPage();
}