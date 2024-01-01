import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksGridService {

  constructor() { }

  refreshGrid() {
    let tasks: any
    tasks = localStorage.getItem('taskGrid')
    if(!tasks) {
      return []
    }
    return JSON.parse(tasks)
  }

  deleteRow(selectedRows: [], completeData: any[]) {
    selectedRows.forEach(row => {
      let rowIndex = completeData.findIndex(i => i['name'] === row['name'])
      if(rowIndex > -1) {
        completeData.splice(rowIndex, 1)
      }
    })
    localStorage.setItem('taskGrid', JSON.stringify(completeData))
  }

  saveForm(data: any) {
    let tasks: any
    tasks = localStorage.getItem('taskGrid')
    if(!tasks) {
      tasks = []
    }
    else {
      tasks = JSON.parse(tasks)
    }
    tasks.push(data.value)
    localStorage.setItem('taskGrid', JSON.stringify(tasks))
  }

  updateForm(data: any) {
    let tasks: any[]
    let localTask = localStorage.getItem('taskGrid')
    tasks = JSON.parse(localTask)
    let formVal = data.value;
    let idx = tasks.findIndex(i => i.name === formVal.name)
    if(idx > -1) {
      tasks[idx].description = formVal.description;
      tasks[idx].date = formVal.date;
    }
    localStorage.setItem('taskGrid', JSON.stringify(tasks))
  }
}
