/*  how this code works 

1. this file will be responsible for managing the tasks in the application  "TaskManager" class 
2. The "addTask" method adds tasks to an array and increment the id for each entry 
3. The "render" method: 
	a) first, we loop through the tasks in the array,
	b) we take the information in the array and create a card with the "createTaskHtml", which we set as the 
		innerHTML for each "column"
4. The "getTaskById" method will loop through the task array, and return a task if the task.id (in the array) 
	matches the taskId (which we will find in "index.js" by traversing the DOM).
5. The "updateTask" works similar to the "addTask" method, but creates a new object.
6. The "deleteTask" method will check if the id of the task in the array does not match the id of the card clicked.
	All tasks that do not match the id of the card clicked, get pushed into a new array.
6. The "save" and "load" methods save the array to the local storage, and then retrieves it.
*/

let createTaskHtml = (
	taskName,
	taskAssignee,
	dueDate,
	taskDescription,
	taskStatus,
	id
) => {
	const html = `<li class='list-group-item'>
								<div class="card" style="width: 18rem">
									<div id="${id}" class="card-body ${taskStatus}">
										<div class="d-flex justify-content-between">
											<button class="update" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
											<button class="delete">Delete</button>
										</div>
										<h5 class="card-title text-start">${taskName}</h5>
										<p class="card-text text-start">
											${taskDescription}
										</p>
										<div class="d-flex justify-content-between">
											<h6>${taskAssignee}</h6>
											<h6>${dueDate}</h6>
										</div>
									</div>
								</div>
							</li>`;

	return html;
};

class TaskManager {
	constructor(currentId = 0) {
		this.tasks = [];
		this.currentId = currentId;
	}

	addTask(taskName, taskAssignee, dueDate, taskDescription, taskStatus) {
		const newTask = {
			taskName: taskName,
			taskAssignee: taskAssignee,
			dueDate: dueDate,
			taskDescription: taskDescription,
			taskStatus: taskStatus,
			id: ++this.currentId,
		};
		return this.tasks.push(newTask);
	}

	render() {
		// create and array to store the tasks' html
		// let tasksHtmlList = [];
		let todoHtmlList = [];
		let inProgressHtmlList = [];
		let doneHtmlList = [];

		// loop over tasks and create the html, storing it in the array
		for (let i = 0; i < this.tasks.length; i++) {
			//get the current task in the loop
			let task = this.tasks[i];

			// format the date
			let date = new Date(task.dueDate);
			let formattedDate = `${date.getDate()}-${
				date.getMonth() + 1
			}-${date.getFullYear()}`;

			// create the task html
			let taskHtml = createTaskHtml(
				task.taskName,
				task.taskAssignee,
				formattedDate,
				task.taskDescription,
				task.taskStatus,
				task.id
			);

			// push it to the taskHtmlList array
			// tasksHtmlList.push(taskHtml);
			if (task.taskStatus === "todo") {
				todoHtmlList.push(taskHtml);
			} else if (task.taskStatus === "inprogress") {
				console.log("in progress");
				inProgressHtmlList.push(taskHtml);
			} else if (task.taskStatus === "done") {
				doneHtmlList.push(taskHtml);
			}
		}

		// Creat the tasksHtml by joining each item in the tasksHtmlList
		// with a new line in between each item
		// let tasksHtml = tasksHtmlList.join("");
		// console.log(tasksHtml);

		// set the inner html of the taskList on the page
		const todoList = document.querySelector("#todo");
		todoList.innerHTML = todoHtmlList.join("");
		const inprogressList = document.querySelector("#in_progress");
		inprogressList.innerHTML = inProgressHtmlList.join("");
		const doneList = document.querySelector("#done");
		doneList.innerHTML = doneHtmlList.join("");

		// todoList.innerHTML = tasksHtml;
	}

	getTaskById(taskId) {
		let foundTask;
		for (let task of this.tasks) {
			if (task.id === taskId) {
				console.log(task);
				console.log("get task by id::found task  name is " + task.taskName);
				foundTask = task;
			}
		}
		console.log(foundTask);
		return foundTask;
	}

	updateTask(id, taskName, taskAssignee, dueDate, taskDescription, taskStatus) {
		console.log("in class update task id" + id);
		let taskToBeUpdated = this.getTaskById(id);
		console.log(taskToBeUpdated);
		console.log("in class update task is" + JSON.stringify(taskToBeUpdated));
		taskToBeUpdated.id = id;
		taskToBeUpdated.taskName = taskName;
		taskToBeUpdated.taskStatus = taskStatus;
		taskToBeUpdated.taskAssignee = taskAssignee;
		taskToBeUpdated.dueDate = dueDate;
		taskToBeUpdated.taskDescription = taskDescription;
	}

	deleteTask(taskId) {
		let newTasks = [];
		for (let task of this.tasks) {
			if (task.id !== taskId) {
				newTasks.push(task);
			}
			this.tasks = newTasks;
		}
	}

	save() {
		const tasksJson = JSON.stringify(this.tasks);
		localStorage.setItem("tasks", tasksJson);
		const currentId = String(this.currentId);
		localStorage.setItem("currentId", currentId);
	}

	load() {
		if (localStorage.getItem("tasks")) {
			const taskJson = localStorage.getItem("tasks");
			this.tasks = JSON.parse(taskJson);
		}

		if (localStorage.getItem("currentId")) {
			const currentId = localStorage.getItem("currentId");
			this.currentId = Number(currentId);
		}
	}
}
