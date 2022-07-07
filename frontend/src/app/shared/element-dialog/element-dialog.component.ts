import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PeriodicElement } from 'src/app/views/views.component';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent implements OnInit {
element!: PeriodicElement;
isChange!: boolean;

constructor(
  public dialogRef: MatDialogRef<ElementDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
) {}

  ngOnInit(): void {
    if(this.data.position != null){
      this.isChange = true;
    }
    else{
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}