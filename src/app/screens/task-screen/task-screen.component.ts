import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router ,Params } from '@angular/router';
import TaskListModel from 'src/app/models/taskListModel';
import TaskModel from 'src/app/models/taskModel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.scss']
})
export class TaskScreenComponent implements OnInit {


  taskLists:TaskListModel[]=[];
  tasks:TaskModel[]=[];
  taskListId:string='';
  constructor(private taskService:TaskService,
    private activateRoute:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.taskService.getAllTaskLists().subscribe((allTaskLists:TaskListModel[]) => {
this.taskLists=allTaskLists
// get the 1st tasklist id and route to it on page load
// this.router.navigate(['task-lists',this.taskLists[0]['_id']]);    
});
    this.activateRoute.params.subscribe(
      (params: Params)=>{
 this.taskListId=params['taskListId'];
if(this.taskListId){
  this.taskService.getAllTasksForATaskList(this.taskListId).subscribe((tasks:TaskModel[])=>{
this.tasks=tasks;
  });
}
      }
    );
  }
taskClicked(task:TaskModel){
  // console.log(task);
this.taskService.updateTaskStatus(this.taskListId,task).subscribe(()=>{
  task.completed=!task.completed;
});
}
deleteTask(task:TaskModel){
this.taskService.deleteATaskInsideATaskList(this.taskListId,task._id).subscribe((taskDeleted:TaskModel)=>{
this.tasks = this.tasks.filter(t=>t._id != taskDeleted._id);//remove the deleted task from the class level tasks array
});
}
deleteTaskList(taskListClicked:TaskListModel){
this.taskService.deleteTaskList(taskListClicked._id).subscribe(()=>{
this.taskLists=this.taskLists.filter(tl=>tl._id != taskListClicked._id);
}); 
}
addNewTask(){
  if(this.taskListId){
// route the user to add task screen for the selected tasklist
this.router.navigate(['./new-task'],{relativeTo:this.activateRoute});
  }else{
    alert("please select a tasklist!");
    return;
  }
}
}
