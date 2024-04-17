import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../core/profile-serivce.service';

export interface DialogData {
  action: string;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})

export class DialogComponent {
  // newUser: User = { firstName: '', lastName: '', email: '', phone: '' };
  newUser: User = { firstName: '', lastName: '', email: '', phone: '' };

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onAddClick(): void {
    // if (this.isValidUser(this.newUser)) {
      this.dialogRef.close(this.newUser);
    // } else {
    // }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  isValidUser(user: User): boolean {
    const rst = user.firstName && user.lastName && user.email;
    console.log(user.firstName, user.lastName, user.email, typeof rst);
    return true
  }
}
