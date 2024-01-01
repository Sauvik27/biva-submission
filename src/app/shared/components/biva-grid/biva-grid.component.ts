import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';


export interface GridElement {
  name: string;
  description: string;
  date: string;
  position: number
}


@Component({
  selector: 'app-biva-grid',
  templateUrl: './biva-grid.component.html',
  styleUrls: ['./biva-grid.component.scss']
})
export class BivaGridComponent implements OnInit, AfterViewInit{

  @Input() gridConfig: any = {};
  @Output() toolbarClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() gridRendered: EventEmitter<any> = new EventEmitter<any>();

  data: GridElement[] = [];

  displayedColumns: string[] = ['select', 'name', 'description', 'date'];
  dataSource = new MatTableDataSource<GridElement>(this.data);
  selection = new SelectionModel<GridElement>(true, []);

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.gridRendered.emit()
  }

  toolbarClickHandler(tool:any) {
    this.toolbarClick.emit(tool)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.selectionChange.emit(this.selection.selected)
      return;
    }
    this.selection.select(...this.dataSource.data);
    this.selectionChange.emit(this.selection.selected)
  }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: GridElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }

  rowSelected(row: any) {
    this.selection.toggle(row)
    this.selectionChange.emit(this.selection.selected)
  }

  setRowData(rowData: []) {
    this.data = rowData
    this.dataSource.data = this.data
  }

  clearRowSelection() {
    this.selection.clear();
  }

}
