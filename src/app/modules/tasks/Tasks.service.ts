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
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  loadTasks() {
    this.http.get<Task[]>(`${this.apiUrl}/tasks`).subscribe((tasks) => {
      this.tasksSource.next(tasks);
    });
  }

  addTask(task: Task) {
    const currentTasks = this.tasksSource.value;
    this.tasksSource.next([...currentTasks, task]);
  }
}
