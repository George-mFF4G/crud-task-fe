import { Injectable } from '@angular/core';
import{ApiConfigService} from './api-config.service';
import TaskModel from './models/taskModel';
import TaskListModel from './models/taskListModel';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfigService:ApiConfigService) {}
    // to fetch all task lists 
    getAllTaskLists(): Observable<TaskListModel[]>{
      return this.apiConfigService.getTaskLists('tasklists');
    }
    getAllTasks(taskListId:string): Observable<TaskModel[]>{
      return this.apiConfigService.getTasks(`tasklists/${taskListId}`);
    }
    createTaskList(title:string): Observable<TaskListModel>{
let data={'title':title};
return this.apiConfigService.post('tasklists',data);
    }
    // to fetch all tasks inside a tasklist object
    getAllTasksForATaskList(taskListId:string){
return this.apiConfigService.getTasks(`tasklists/${taskListId}/tasks`);
    }
    createTaskInsideATaskList(taskListId:string,title:string){
      return this.apiConfigService.post(`tasklists/${taskListId}/tasks`,{title});
    }
    // delete a tasklist
    deleteTaskList(taskListId:string):Observable<TaskListModel>{
    return this.apiConfigService.deleteTaskList(`tasklists/${taskListId}`);
    }
    // delete a task inside a task list
    deleteATaskInsideATaskList(taskListId:string,taskId:string):Observable<TaskModel>{
      return this.apiConfigService.deleteTask(`tasklists/${taskListId}/tasks/${taskId}`);
      }
      // update the status of a task whether its completed or not
      updateTaskStatus(taskListId:string,taskObject:TaskModel){
        let updatedData={'completed':!taskObject.completed};
        return this.apiConfigService.patch(`tasklists/${taskListId}/tasks/${taskObject._id}`,updatedData);
      }
}


