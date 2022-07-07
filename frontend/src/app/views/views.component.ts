import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementDialogComponent } from '../shared/element-dialog/element-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},

];

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css'],

})

export class ViewsComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action' ];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog,) {

    }


  ngOnInit(): void {
  }

  openDialog(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        position: null,
        name: '',
        weight: null,
        symbol: ''
      } : {
       
        position: element.position,
        name: element.name,
        weight: element.weight,
        symbol: element.symbol
      }

    });




    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        if(this.dataSource.map(p=>p.position).includes(result.position)){
          this.dataSource[result.position - 1] = result;
          this.table.renderRows();
        }
        else{
          this.dataSource.push(result);
          this.table.renderRows();
        }

      }
    });

  }

  deleteElement(position: number):void{
    this.dataSource = this.dataSource.filter(p => p.position !== position);
  }



  editElement(element: PeriodicElement): void {
    this.openDialog(element);
  }

  }

