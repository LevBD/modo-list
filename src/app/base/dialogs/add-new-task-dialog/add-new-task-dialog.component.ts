import {Component, Inject, OnInit, Self} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService, ComponentDestroyService, SnackbarService } from '../../../shared/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {takeUntil} from "rxjs/operators";
import { Task } from "../../../shared/interfaces";

@Component({
  selector: 'modo-add-new-task-dialog',
  templateUrl: './add-new-task-dialog.component.html',
  styleUrls: ['./add-new-task-dialog.component.scss'],
  providers: [ComponentDestroyService, SnackbarService]
})
export class AddNewTaskDialogComponent implements OnInit {
  public form: FormGroup | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private dialog: MatDialogRef<AddNewTaskDialogComponent>,
    private snackbar: SnackbarService,
    private appService: AppService,
    @Self() private destroyed$: ComponentDestroyService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  public closeDialog() {
    this.dialog.close();
  }

  public createTask() {
    this.appService.createTask(this.form.value).pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      if (data) {
        this.snackbar.simpleSnackbar('Task created');
        this.dialog.close({data});
      }
    });
  }

  private initForm() {
    this.form = new FormGroup({
      title: new FormControl(this.dialogData.type === 'edit' ? this.dialogData.task.title : '', [Validators.required]),
      description: new FormControl(this.dialogData.type === 'edit' ? this.dialogData.task.description : ''),
      is_active: new FormControl(this.dialogData.type === 'edit' ? this.dialogData.task.is_active : true),
    });
  }
}

interface DialogData {
  task: Task;
  type: string;
}
