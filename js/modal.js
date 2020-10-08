//显示弹出框
function showModalPopover() {
  let $modal = document.querySelector("#modal");
  $modal.classList.add("modal_flex_center");
}

//隐藏弹出框
function hideModalPopover() {
  let $modal = document.querySelector("#modal");
  $modal.classList.remove("modal_flex_center");
}

//创建新建任务弹出框
function createdAddTaskPopover() {
  const icon = "./images/modal_add_icon.svg";
  const title = "New A Task";
  createModalPopover(icon, title, "createTask()");
  showModalPopover();
}

//创建修改任务弹出框
function createUpdateTaskPopover(id) {
  const icon = "./images/update.svg";
  const title = "Update A Task";
  const okBtnClickEvent = "updateTask(" + id + ")";
  let task = findTask(id);
  createModalPopover(icon, title, okBtnClickEvent, task)
  showModalPopover();
}

function createDeleteTaskPopover(id) {
  const icon = "./images/modal_delete_icon.svg";
  const title = "Delete Task";
  const okBtnClickEvent = "deleteTask(" + id + ")";
  createPopoverHeaderAndFooter(icon, title, okBtnClickEvent);

  let task = findTask(id);
  let $container = document.createElement("p");
  $container.textContent = `Do you confirm to delete task: "${task.name}"?`;

  let modalContainer = document.querySelector("#modal_container");
  modalContainer.innerHTML = '';
  modalContainer.appendChild($container);
  showModalPopover();
}

//设置弹出框内容
function createModalPopover(icon, title, okBtnClickEvent, task) {
  createPopoverHeaderAndFooter(icon, title, okBtnClickEvent);
  createPopoverContent(task);
}

//设置弹出框头部和尾部内容
function createPopoverHeaderAndFooter(icon, title, okBtnClickEvent) {
  let $icon = document.querySelector("#icon");
  let modalTitle = document.querySelector("#modal_title");
  $icon.setAttribute("src", icon);
  modalTitle.textContent = title;
  let modalBtnOk = document.querySelector("#modal_btn_ok");
  modalBtnOk.setAttribute("onclick", okBtnClickEvent);
}

//新建任务
function createTask() {
  let nameInput = document.querySelector("#task_name");
  let deadlineInput = document.querySelector("#task_deadline");
  let descInput = document.querySelector("#task_desc");

  //如果输入为空，输入框变红, 函数直接返回
  if (requiredCheck([nameInput, deadlineInput, descInput])) {
    return;
  }

  //若不为空则关闭弹出框，新增任务行
  //saveAllTasks([]); //在哪里初始化allTasks?
  let allTasks = getAllTasks();
  const maxId = allTasks.reduce((pre, task) => (pre > task.id ? pre : task.id), 0);
  let newTask = {
    id: maxId + 1,
    name: nameInput.value,
    deadline: deadlineInput.value,
    // description: new Date().getTime(),
    description: descInput.value,
    status: "Active",
    createDate: new Date().getTime()
  }
  allTasks.push(newTask);
  saveAllTasks(allTasks);
  renderPage();
  hideModalPopover();
}

//更新任务
function updateTask(id) {
  let nameInput = document.querySelector("#task_name");
  let deadlineInput = document.querySelector("#task_deadline");
  let descInput = document.querySelector("#task_desc");
  if (requiredCheck([nameInput, deadlineInput, descInput])) {
    return;
  }

  //更新status
  let allStatus = document.getElementsByName("status")
  let $status = Array.from(allStatus).find(status => status.checked).value;

  let allTasks = getAllTasks()
  let $task = findTask(id);
    //判断两个对象相等的方法
  let $index = allTasks.findIndex(task => JSON.stringify(task) === JSON.stringify($task));
  let newTask = {
    id: id,
    name: nameInput.value,
    deadline: deadlineInput.value,
    // description: new Date().getTime(),
    description: descInput.value,
    status: $status,
    createDate: new Date().getTime()
  }     

  allTasks.splice($index, 1, newTask);
  saveAllTasks(allTasks);
  renderPage();
  hideModalPopover();
}

function deleteTask(id) {
  let allTasks = getAllTasks();
  let $index = allTasks.findIndex(task => task.id === id);
  allTasks.splice($index, 1);
  saveAllTasks(allTasks);
  renderPage();
  hideModalPopover();
}

//判断输入框是否为空
function requiredCheck(elements) {
  let result = false;
  elements.forEach(element => {
    if (!element.value || element.value.trim() === '') {
      // element.classList.add("invid_input")
      element.style["border-color"] = "red";
      result = true;
    }
  });
  return result;
}

//设置弹出框主体内容
function createPopoverContent(task) {
  let $container = document.createElement("p");
  $container.classList.add("text_container");

  let nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "task_name");
  nameLabel.textContent = "Name";
  $container.appendChild(nameLabel);
  let nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "task_name");
  nameInput.value = task ? task.name : '';
  $container.appendChild(nameInput);

  let deadlineLabel = document.createElement("label");
  deadlineLabel.setAttribute("for", "task_deadline");
  deadlineLabel.textContent = "Deadline";
  $container.appendChild(deadlineLabel);
  let deadlineInput = document.createElement("input");
  deadlineInput.setAttribute("type", "text");
  deadlineInput.setAttribute("id", "task_deadline");
  deadlineInput.value = task ? task.deadline : '';
  $container.appendChild(deadlineInput);

  if(task) {
    let statusLabel = document.createElement("label");
    statusLabel.textContent = "Status";
    $container.appendChild(statusLabel);

    let statusContainer = document.createElement("div");
    statusContainer.classList.add("status_container");
    $container.appendChild(statusContainer);


    let activeInput = document.createElement("input");
    activeInput.setAttribute("type", "radio");
    activeInput.setAttribute("id", "active_status");
    activeInput.setAttribute("name", "status");
    activeInput.setAttribute("value", "Active");
    statusContainer.appendChild(activeInput);
    let activeLabel = document.createElement("label");
    activeLabel.setAttribute("for", "active_status");
    activeLabel.textContent = "Active";
    statusContainer.appendChild(activeLabel);

    let paddingInput = document.createElement("input");
    paddingInput.setAttribute("type", "radio");
    paddingInput.setAttribute("id", "padding_status");
    paddingInput.setAttribute("name", "status");
    paddingInput.setAttribute("value", "Padding");
    statusContainer.appendChild(paddingInput);
    let paddingLabel = document.createElement("label");
    paddingLabel.setAttribute("for", "padding_status");
    paddingLabel.textContent = "Padding";
    statusContainer.appendChild(paddingLabel);

    let closedInput = document.createElement("input");
    closedInput.setAttribute("type", "radio");
    closedInput.setAttribute("id", "closed_status");
    closedInput.setAttribute("name", "status");
    closedInput.setAttribute("value", "Closed");
    statusContainer.appendChild(closedInput);
    let closedLabel = document.createElement("label");
    closedLabel.setAttribute("for", "closed_status");
    closedLabel.textContent = "Closed";
    statusContainer.appendChild(closedLabel);


    if(task.status === "Active") {
      activeInput.setAttribute("checked", "")
    }

    if(task.status === "Padding") {
      paddingInput.setAttribute("checked", "")
    }

    if(task.status === "Closed") {
      closedInput.setAttribute("checked", "")
    }
  }

  let descLabel = document.createElement("label");
  descLabel.setAttribute("for", "task_desc");
  descLabel.textContent = "Description";
  $container.appendChild(descLabel);
  let descTextarea = document.createElement("textarea");
  descTextarea.setAttribute("rows", "5");
  descTextarea.setAttribute("id", "task_desc");
  descTextarea.setAttribute("maxlength", "200");
  descTextarea.setAttribute(
    "placeholder", 
    "Please enter task descript, Maximum 200 characters"
  );
  descTextarea.value = task ? task.description : '';
  $container.appendChild(descTextarea);

  let modalContainer = document.querySelector("#modal_container");
  modalContainer.innerHTML = '';
  modalContainer.appendChild($container);
}

