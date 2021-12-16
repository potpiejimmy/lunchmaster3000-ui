import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html',
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  leftButton: string;
  rightButton: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.leftButton = data.leftButton;
    this.rightButton = data.rightButton;
  }
  ngOnInit() {

  }

  onLeftClick(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  onRightClick(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {

  constructor(  public title: string,
                public message: string,
                public leftButton: string,
                public rightButton: string) {
  }
}
