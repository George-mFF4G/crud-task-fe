import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import TaskListModel from './models/taskListModel';
import TaskModel from './models/taskModel';
@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  API_BASE_URL='http://localhost:3000';
  constructor(private httpClient:HttpClient) { }
// Api call to backend
getTaskLists(url:string){
  return this.httpClient.get<TaskListModel[]>(`${this.API_BASE_URL}/${url}`);//http://localhost:3000/tasklists
}
getTasks(url:string){
  return this.httpClient.get<TaskModel[]>(`${this.API_BASE_URL}/${url}`);
}
post(url:string,data:object){
  return this.httpClient.post<TaskListModel>(`${this.API_BASE_URL}/${url}`,data);
}
patch(url:string,data:object){
  return this.httpClient.patch(`${this.API_BASE_URL}/${url}`,data);
}
put(url:string,data:object){
  return this.httpClient.put(`${this.API_BASE_URL}/${url}`,data);
}
deleteTask(url:string){
  return this.httpClient.delete<TaskModel>(`${this.API_BASE_URL}/${url}`);
}
deleteTaskList(url:string){
  return this.httpClient.delete<TaskListModel>(`${this.API_BASE_URL}/${url}`);
}
}
