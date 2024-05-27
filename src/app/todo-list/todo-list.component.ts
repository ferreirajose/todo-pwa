import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  task: string = '';
  tasks: { name: string, completed: boolean }[] = [];
  hasTask = false;

  constructor() { }

  ngOnInit() {
    this.showTasks();
  }

  addTask() {
    if (this.task.trim() === '') {
      this.hasTask = true;
      return
    }
    this.tasks.push({ name: this.task, completed: false });
    this.task = '';
    this.saveData();
  }

  deleteTask(taskToDelete: { name: string, completed: boolean }) {
    this.tasks = this.tasks.filter(task => task !== taskToDelete);
    this.saveData();
  }

  toggleTaskCompletion(task: { name: string, completed: boolean }) {
    task.completed = !task.completed;
    this.saveData();
  }

  saveData() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  showTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }
}
