import { Injectable } from '@angular/core';
import { environment } from 'enviroment';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSource = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSource.asObservable();
  private apiUrl = environment.apiUrl;

  constructor() { }

  loadTasks() {
    // Simula la carga de tareas, por ejemplo, desde una API
    const tasks: Task[] = [
      {
        id: 1, title: 'Task 1', description: 'Description 1', done: false, date: new Date()
      },
      {
        id: 2, title: 'Task 2', description: 'Description 2', done: false, date: new Date()
      },
      // más tareas...
    ];
    this.tasksSource.next(tasks);
  }

  addTask(task: Task) {
    const currentTasks = this.tasksSource.value;
    this.tasksSource.next([...currentTasks, task]);
  }
}
