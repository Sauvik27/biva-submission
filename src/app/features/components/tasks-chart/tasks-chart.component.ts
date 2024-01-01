import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-chart',
  templateUrl: './tasks-chart.component.html',
  styleUrls: ['./tasks-chart.component.scss']
})
export class TasksChartComponent implements OnInit {
  chartOptions: any = {};

  constructor() {}

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData() {
    let taskListData:any[] = []
    let taskFromLocal = localStorage.getItem('taskGrid')
    if(taskFromLocal) {
      taskListData = JSON.parse(taskFromLocal)
    }
    const data = this.processTasksForChart(taskListData);
    const next7DaysDates: string[] = this.getNext7DaysDates();

    this.chartOptions = {
      series: [
        {
          name: 'Tasks Due in Next 7 Days',
          data: data
        }
      ],
      chart: {
        type: 'bar',
        height: 600
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: next7DaysDates.map(date => new Date(date).getTime()), // Convert dates to timestamps
        type: 'datetime'
      },
      title: {
        text: 'Tasks Due in Next 7 Days',
        align: 'center'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100]
        }
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + ' tasks';
          }
        }
      }
    };
  }

  processTasksForChart(tasks: any[]): number[] {
    const today = new Date();
    const next7Days = Array.from({ length: 7 }, (_, index) => {
      const day = new Date(today);
      day.setDate(today.getDate() + index + 1);
      return day.toDateString();
    });

    const taskCountPerDay: number[] = next7Days.map(day => {
      return tasks.filter(task => this.isTaskDueOnDate(task, new Date(day))).length;
    });

    return taskCountPerDay;
  }

  isTaskDueOnDate(task: any, date: Date): boolean {
    const taskDueDate = new Date(task.date);
    return (
      taskDueDate.getFullYear() === date.getFullYear() &&
      taskDueDate.getMonth() === date.getMonth() &&
      taskDueDate.getDate() === date.getDate()
    );
  }

  getNext7DaysDates(): string[] {
    const today = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(today);
      day.setDate(today.getDate() + index + 1);
      return day.toLocaleDateString();
    });
  }
}
