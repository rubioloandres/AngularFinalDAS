import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Plato } from 'src/app/interfaces/menu';

@Component({
  selector: 'app-dialog-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class DialogPlatoSucursalComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogPlatoSucursalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Plato) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
