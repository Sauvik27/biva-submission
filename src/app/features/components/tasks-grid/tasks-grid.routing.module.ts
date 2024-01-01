import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksGridComponent } from './tasks-grid.component';

const routes: Routes = [
  { path: '', component: TasksGridComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksGridRoutingModule { }
