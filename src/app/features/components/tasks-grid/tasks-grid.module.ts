import { NgModule } from '@angular/core';
import { TasksGridComponent } from './tasks-grid.component';
import { CommonModule } from '@angular/common';
import { TasksGridRoutingModule } from './tasks-grid.routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BivaGridModule } from 'src/app/shared/components/biva-grid/biva-grid.module';
import { TasksGridService } from './tasks-grid.service';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    TasksGridComponent
  ],
  imports: [
    CommonModule,
    TasksGridRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    BivaGridModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [TasksGridService],
  exports: [TasksGridComponent]
})
export class TasksGridModule { }
