import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksChartComponent } from './tasks-chart.component';

const routes: Routes = [
  { path: '', component: TasksChartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksChartRoutingModule { }
