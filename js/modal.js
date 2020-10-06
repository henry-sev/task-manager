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
  const icon = "/images/modal_add_icon.svg";
  const title = "New A Task";
  createModalPopover(icon, title, "createTask()");
  showModalPopover();
}

//设置弹出框内容
function createModalPopover(icon, title, okBtnClickEvent) {
  createPopoverHeaderAndFooter(icon, title, okBtnClickEvent);
  createPopoverContent();
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
    description: descInput.value,
    status: "Active",
    createDate: new Date().getTime()
  }
  allTasks.push(newTask);
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
function createPopoverContent() {
  let $container = document.createElement("p");
  $container.classList.add("text_container");

  let nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "task_name");
  nameLabel.textContent = "Name";
  $container.appendChild(nameLabel);
  let nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "task_name");
  $container.appendChild(nameInput);

  let deadlineLabel = document.createElement("label");
  deadlineLabel.setAttribute("for", "task_deadline");
  deadlineLabel.textContent = "Deadline";
  $container.appendChild(deadlineLabel);
  let deadlineInput = document.createElement("input");
  deadlineInput.setAttribute("type", "text");
  deadlineInput.setAttribute("id", "task_deadline");
  $container.appendChild(deadlineInput);

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
  $container.appendChild(descTextarea);

  let modalContainer = document.querySelector("#modal_container");
  modalContainer.innerHTML = '';
  modalContainer.appendChild($container);

}

