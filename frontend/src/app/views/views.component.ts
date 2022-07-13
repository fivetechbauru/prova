import { DataService } from './../services/data.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementDialogComponent } from '../shared/element-dialog/element-dialog.component';
import { Idata } from '../models/IData';

const ELEMENT_DATA: Idata[] = [
];

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css'],

})

export class ViewsComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['medicamento', 'quantidade', 'posologia', 'forma_adm', 'action' ];
  dataSource = ELEMENT_DATA;


  public showMessageSaveSuccess: boolean = false;
  public messageSaveSuccess: string = 'Salvo com sucesso.';

  public showMessageSaveFail: boolean = false;
  public messageSaveFail: string = 'Erro ao salvar. Tente novamente.';

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    ELEMENT_DATA.push(...await this.getAllData());
    this.table.renderRows();
  }

  getAllData(): Promise<Idata[]> {
    return new Promise<Idata[]>((resolve, reject) => {
      this.dataService.getAllData().subscribe({
        next: (elements) => resolve(elements),
        error: () => reject(),
      });
    });
  }

  openDialog(element: Idata | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        id: null,
        medicamento: null,
        quantidade: '',
        posologia: null,
        forma_adm: ''
      } : {

        id: element.id,
        medicamento: element.medicamento,
        quantidade: element.quantidade,
        posologia: element.posologia,
        forma_adm: element.forma_adm,
      }
    });

    dialogRef.componentInstance.saveSuccess.subscribe(() => {
      this.successAlert();
    });

    dialogRef.componentInstance.saveFail.subscribe(() => {
      this.failAlert();
    });

    dialogRef.afterClosed().subscribe(async () => {
      this.dataSource = [];
      this.dataSource.push(...await this.getAllData());
      this.table.renderRows();
    });

  }

  deleteElement(id: number):void{
    this.dataService.deleteData(id).subscribe({
      next: () => { this.successAlert(), this.dataSource = this.dataSource.filter(e => e.id !== id) },
      error: () => this.failAlert,
    });
  }

  editElement(element: Idata): void {
    this.openDialog(element);
  }

  successAlert() {
    this.showMessageSaveSuccess = true;
    setTimeout(() => {
      this.showMessageSaveSuccess = false;
    }, 3000);
  }

  failAlert() {
    this.showMessageSaveFail = true;
    setTimeout(() => {
      this.showMessageSaveFail = false;
    }, 3000);
  }
}

