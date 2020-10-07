function saveAllTasks(allTasks) {
  localStorage.setItem('tasks', JSON.stringify(allTasks));
}

function getAllTasks() {
  return JSON.parse(localStorage.getItem('tasks'));
}

function findTask(id) {
  return getAllTasks().find(task => task.id === id);
}

function findTaskByName(name) {
  let allTasks = getAllTasks();
  return allTasks.filter(task => task.name.indexOf(name) >= 0);
}

function findTaskByStatus(status) {
  let allTasks = getAllTasks();
  return allTasks.filter(task => task.status === status);
}