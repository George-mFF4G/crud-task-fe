import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTaskListScreenComponent } from './screens/new-task-list-screen/new-task-list-screen.component';
import { NewTaskScreenComponent } from './screens/new-task-screen/new-task-screen.component';
import {TaskScreenComponent} from './screens/task-screen/task-screen.component';
const routes: Routes = [
  {
    path:'task-lists',component:TaskScreenComponent
  },{
    path:'task-lists/:taskListId',component:TaskScreenComponent
  },{
    path:'new-task-list',component:NewTaskListScreenComponent
  },{
    path:'task-lists/:taskListId/new-task',component:NewTaskScreenComponent
  },
  {
    path:'',redirectTo:'task-lists',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
