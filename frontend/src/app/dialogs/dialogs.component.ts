import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-manage-garage-dialog',
  templateUrl: './manage-garage-dialog.html',
  styleUrls: ['./dialogs.component.scss']
})
export class ManageGarageDialogComponent {
  errors: any;

  constructor(
    public dialogRef: MatDialogRef<ManageGarageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.errors = {};
  }

  save() {
    this.data.garage.$save().$promise.then((res) => {
      this.dialogRef.close(this.data.garage);
    }, (err) => {
      this.errors = err.body;
    });
  }

  close() {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-manage-car-dialog',
  templateUrl: './manage-car-dialog.html',
  styleUrls: ['./dialogs.component.scss']
})
export class ManageCarDialogComponent {
  errors: any;

  constructor(
    public dialogRef: MatDialogRef<ManageCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.errors = {};
  }

  save() {
    this.data.car.$save().$promise.then((res) => {
      this.dialogRef.close(this.data.car);
    }, (err) => {
      this.errors = err.body;
    });
  }

  close() {
    this.dialogRef.close();
  }

}
