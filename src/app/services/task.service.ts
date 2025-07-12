// task.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.apiUrl);
  }

 deleteTask(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

addTask(task: TaskModel): Observable<any> {
  return this.http.post(this.apiUrl, task);
}

updateTask(task: TaskModel): Observable<any> {
  return this.http.put(`${this.apiUrl}/${task.id}`, task);
}



}
