import { Idata } from './../../models/IData';
import { DataService } from './../../services/data.service';
import {Component, ComponentFactoryResolver, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent implements OnInit {
element!: Idata;
isChange!: boolean;

private editing: boolean = false;

@Output() saveSuccess = new EventEmitter<any>();
@Output() saveFail = new EventEmitter<any>();

constructor(
  public dialogRef: MatDialogRef<ElementDialogComponent>,
  private dataService: DataService,
  @Inject(MAT_DIALOG_DATA) public data: Idata,
) {}

  ngOnInit(): void {
    if(this.data.medicamento != null){
      this.isChange = true;
    }
    else{
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  create(data: Idata): void {
    this.editing = false;
    this.saveData(data);
  }

  edit(data: Idata): void {
    this.editing = true;
    this.saveData(data);
  }

  saveData(data: Idata):void{
    let dataToSave: Idata = {
      id: data.id,
      medicamento: data.medicamento,
      quantidade: data.quantidade,
      posologia: data.posologia,
      forma_adm: data.forma_adm,
    }

    if (this.editing === true) {
      this.dataService.editData(dataToSave).subscribe({
        next: () => this.saveSuccess.emit(),
        error: () => this.saveFail.emit(),
      });
    } else {
      dataToSave.id = null;
      this.dataService.createData(dataToSave).subscribe({
        next: () => this.saveSuccess.emit(),
        error: () => this.saveFail.emit(),
      });
    }
  }
}
