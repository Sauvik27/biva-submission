import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'task-grid', loadChildren: () => import('./features/components/tasks-grid/tasks-grid.module').then(m => m.TasksGridModule) },
  { path: 'task-chart', loadChildren: () => import('./features/components/tasks-chart/tasks-chart.module').then(m => m.TasksChartModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
