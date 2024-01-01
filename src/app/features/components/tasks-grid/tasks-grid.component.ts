import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BivaGridComponent } from 'src/app/shared/components/biva-grid/biva-grid.component';
import { TasksGridService } from './tasks-grid.service';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Task {
  name: string;
  description: string;
  date: Date;
}

@Component({
  selector: 'app-tasks-grid',
  templateUrl: './tasks-grid.component.html',
  styleUrls: ['./tasks-grid.component.scss']
})

export class TasksGridComponent implements OnInit {

  currentSelected: [] = [];
  modalType = 'Create'
  taskForm: FormGroup;


  @ViewChild(BivaGridComponent, { static: false }) grid!: BivaGridComponent;
  @ViewChild('formModal') formModal!: TemplateRef<any>;
  constructor(private taskGridService: TasksGridService, private matDialog: MatDialog, private fb: FormBuilder) {

  }

  gridConfig = {
    columns: ['select', 'position', 'name', 'description', 'date'],
    toolbarConfig: [
      {'name': 'refresh', 'icon': 'refresh', 'hidden': false},
      {'name': 'add', 'icon': 'add', 'hidden': false},
      {'name': 'edit', 'icon': 'edit', 'hidden': true},
      {'name': 'delete', 'icon': 'delete', 'hidden': true}
    ]
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      date: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData: Task = this.taskForm.value;
      console.log('Submitted Task:', taskData);
      if(this.modalType === 'Create') {
        this.taskGridService.saveForm(this.taskForm)
      }
      else {
        this.taskGridService.updateForm(this.taskForm)
      }
      this.grid.clearRowSelection()
      this.selectionChange([])
      this.refresh()
    }
  }

  gridRender() {
    this.refresh()
  }

  toolbarClickHandler(tool: any) {
    switch (tool.name) {
      case 'refresh':
        this.grid.clearRowSelection()
        this.refresh()
        break;
      case 'delete':
        this.taskGridService.deleteRow(this.currentSelected, this.grid.data)
        this.refresh()
        this.grid.clearRowSelection()
        this.selectionChange([])
        break;
      case 'edit':
        this.modalType = 'Edit'
        this.duplicateName = false;
        this.updateForm()
        this.matDialog.open(this.formModal, {
          height: '65vh',
          width: '350px'
        })
        break;
      case 'add':
        this.modalType = 'Create'
        this.initForm()
        this.matDialog.open(this.formModal, {
          height: '65vh',
          width: '350px'
        })
        break;
      default:
        break;
    }
  }

  updateForm() {
    let selectedRow = this.grid.selection.selected[0]
    this.taskForm = this.fb.group({
      name: [selectedRow.name, Validators.required],
      description: [selectedRow.description],
      date: [selectedRow.date, Validators.required],
    });
  }

  duplicateName = false;
  getErrorMessage() {
    if(this.modalType=='Edit') this.duplicateName = false;
    if(this.taskForm) {
      let rowData = this.grid.data.find(i => i.name === this.taskForm.controls['name'].value)
      if(rowData) this.duplicateName = true;
      else this.duplicateName = false;
    }
  }

  refresh() {
    this.grid.setRowData(this.taskGridService.refreshGrid())
  }

  selectionChange(selected: []) {
    this.currentSelected = selected
    if(!selected.length) {
      this.gridConfig.toolbarConfig = [
        {'name': 'refresh', 'icon': 'refresh', 'hidden': false},
        {'name': 'add', 'icon': 'add', 'hidden': false}
      ]
    }
    else if(selected.length == 1) {
      this.gridConfig.toolbarConfig = [
        {'name': 'refresh', 'icon': 'refresh', 'hidden': false},
        {'name': 'edit', 'icon': 'edit', 'hidden': false},
        {'name': 'delete', 'icon': 'delete', 'hidden': false}
      ]
    }
    else {
      this.gridConfig.toolbarConfig = [
        {'name': 'refresh', 'icon': 'refresh', 'hidden': false},
        {'name': 'delete', 'icon': 'delete', 'hidden': false}
      ]
    }
  }

}
