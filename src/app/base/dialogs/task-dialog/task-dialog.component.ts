import {Component, Inject, OnInit, Self} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService, ComponentDestroyService, SnackbarService } from '../../../shared/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {takeUntil} from "rxjs/operators";
import { Task } from "../../../shared/interfaces";

@Component({
  selector: 'modo-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  providers: [ComponentDestroyService, SnackbarService]
})
export class TaskDialogComponent implements OnInit {
  public form: FormGroup | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private dialog: MatDialogRef<TaskDialogComponent>,
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

  public updateTask() {
    this.appService.updateTask(this.dialogData.task.id , this.form.value).pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      if (data) {
        this.snackbar.simpleSnackbar('Task updated');
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
