// You Need to implement
function renderPage() {
  showStatisticsCards();
  let allTasks = getAllTasks();
  let taskBody = document.querySelector("#task_body");
  taskBody.innerHTML = '';
  allTasks.forEach(task => {
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


window.onload = function() {
  if(!getAllTasks()) {saveAllTasks([]);}
  renderPage();
}