class TaskManager {
	constructor(currentId = 0) {
		this.tasks = [];
		this.currentId = currentId;
	}

	addTask(
		taskName,
		taskAssignee,
		taskDueDate,
		taskDescription,
		taskStatus = "todo"
	) {
		const newTask = {
			taskName: taskName,
			taskAssignee: taskAssignee,
			taskDueDate: taskDueDate,
			taskDescription: taskDescription,
			taskStatus: taskStatus,
			id: this.currentId++,
		};
		return this.tasks.push(newTask);
	}
}
// check
