import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  public simpleSnackbar(message: any) {
    this.snackBar.open(message, 'Close', {
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }
}
