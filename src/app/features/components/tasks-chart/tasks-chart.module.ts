import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksChartComponent } from './tasks-chart.component';
import { TasksChartRoutingModule } from './tasks-chart.routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    TasksChartComponent
  ],
  imports: [
    CommonModule,
    TasksChartRoutingModule,
    NgApexchartsModule
  ],
  providers: [],
  exports: [TasksChartComponent]
})
export class TasksChartModule { }
