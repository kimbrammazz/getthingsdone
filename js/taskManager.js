class TaskManager {
	constructor(currentId = 0) {
		this.tasks = [];
		this.currentId = currentId;
	}

	addTask(
		taskName,
		taskAssignee,
		dueDate,
		taskDescription,
		taskStatus = "todo"
	) {
		const newTask = {
			taskName: taskName,
			taskStatus: taskStatus,
			taskAssignee: taskAssignee,
			dueDate: dueDate,
			taskDescription: taskDescription,
			id: this.currentId++,
		};
		return this.tasks.push(newTask);
	}
}
