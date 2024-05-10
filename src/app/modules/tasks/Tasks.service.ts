import { HttpClient } from '@angular/common/http';
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
  private apiUrl = `${environment.apiUrl}tasks`;

  constructor(
    private http: HttpClient
  ) {
    this.getTasks();
  }

  getTasks() {
    this.http.get<Task[]>(`${this.apiUrl}`).subscribe((tasks) => {
      this.tasksSource.next(tasks);
    });
  }

  addTask(task: Task) {
    this.http.post<Task>(`${this.apiUrl}`, task).subscribe((newTask) => {
      const currentTasks = this.tasksSource.value;
      this.tasksSource.next([newTask, ...currentTasks,]);
      console.log('tasks', this.tasksSource.value);
    });
  }

  deleteTask(task: Task) {
    this.http.delete(`${this.apiUrl}/${task.id}`).subscribe(() => {
      const currentTasks = this.tasksSource.value;
      const index = currentTasks.findIndex((t) => t.id === task.id);
      currentTasks.splice(index, 1);
      this.tasksSource.next(currentTasks);
    });
  }

  updateTask(task: Task) {
    this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).subscribe((updatedTask) => {
      const currentTasks = this.tasksSource.value;
      const index = currentTasks.findIndex((t) => t.id === updatedTask.id);
      currentTasks[index] = updatedTask;
      this.tasksSource.next(currentTasks);
    });
  }
}
