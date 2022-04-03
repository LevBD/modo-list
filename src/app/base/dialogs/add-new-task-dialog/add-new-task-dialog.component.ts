import {Component, Inject, OnInit, Self} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComponentDestroyService } from '../../../shared/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'modo-add-new-task-dialog',
  templateUrl: './add-new-task-dialog.component.html',
  styleUrls: ['./add-new-task-dialog.component.scss'],
  providers: [ComponentDestroyService]
})
export class AddNewTaskDialogComponent implements OnInit {
  public form: FormGroup | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialog: MatDialogRef<AddNewTaskDialogComponent>,
    @Self() private destroyed$: ComponentDestroyService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  public closeDialog() {
    this.dialog.close();
  }

  private initForm() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      is_active: new FormControl(false),
    });
  }
}

interface DialogData {
  title: string;
  description: string;
  is_active: boolean;
}
