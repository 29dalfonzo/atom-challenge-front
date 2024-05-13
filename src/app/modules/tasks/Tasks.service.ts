import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { SnackBarService } from 'src/app/sharedServices/snackBar.service';

import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSource = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSource.asObservable();
  private apiUrl = `${environment.apiUrl}tasks`;
  private httpHeaders: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarService,
    private authService: AuthService
  ) {
    this.setHeaders();
    this.getTasks();
  }

  setHeaders() {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }
  getTasks() {
    this.http.get<Task[]>(`${this.apiUrl}`, { headers: this.httpHeaders }).subscribe((tasks) => {
      tasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.tasksSource.next(tasks);
    });
  }

  addTask(task: Task) {
    this.http.post<Task>(`${this.apiUrl}`, task, { headers: this.httpHeaders }).pipe(
      catchError((error) => {
        console.error('Error adding task:', error);
        this.snackBarService.openSnackBar('Error al agregar la tarea', 'Cerrar');
        return of(null);
      })
    ).subscribe((newTask) => {
      if (newTask) { // Solo actualizar si newTask no es nulo
        const currentTasks = this.tasksSource.value;
        this.tasksSource.next([newTask, ...currentTasks]);
        this.snackBarService.openSnackBar('Tarea agregada correctamente', 'Cerrar');
      }
    });
  }

  deleteTask(task: Task) {
    this.http.delete(`${this.apiUrl}/${task.id}`, { headers: this.httpHeaders }).subscribe(() => {
      const currentTasks = this.tasksSource.value;
      const index = currentTasks.findIndex((t) => t.id === task.id);
      currentTasks.splice(index, 1);
      this.tasksSource.next(currentTasks);
      this.snackBarService.openSnackBar('Tarea eliminada correctamente', 'Cerrar');
    });
  }

  updateTask(task: Task) {
    this.http.put<Task>(`${this.apiUrl}/${task.id}`, task, { headers: this.httpHeaders }).subscribe((updatedTask) => {
      const currentTasks = this.tasksSource.value;
      const updatedTasks = currentTasks.map((t: Task) => (t.id === updatedTask.id ? updatedTask : t));
      this.tasksSource.next(updatedTasks);
      this.snackBarService.openSnackBar('Tarea actualizada correctamente', 'Cerrar');
    });
  }

  validateTask(task: Task): Task {
    return {
      ...task,
      title: task.title.trim(),
      description: task.description.trim(),
      date: task.date ?? new Date(),
    };
  }
}
