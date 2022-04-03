import {ChangeDetectorRef, Component, OnInit, Self} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTaskDialogComponent } from '../dialogs';
import { takeUntil } from 'rxjs/operators';
import { AppService, ComponentDestroyService } from '../../shared/services';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../shared/interfaces';

@Component({
  selector: 'modo-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [ComponentDestroyService]
})
export class BaseComponent implements OnInit {
  public tasks$ = new BehaviorSubject(null);

  public tasks: Task[] = [];

  constructor(
    private dialog: MatDialog,
    private appService: AppService,
    private changeDetectionRef: ChangeDetectorRef,
    @Self() private destroyed$: ComponentDestroyService
  ) { }

  ngOnInit() {
    this.getAllTasks();
  }

  public openAddTaskDialog( type?: string, task?: Task) {
    this.dialog
      .open(AddNewTaskDialogComponent, {
        data: { task, type },
        maxWidth: '31em',
        width: '100%',
        maxHeight: '30em',
        height: '100%'
      })
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((data) => {
        if(data) {
          this.getAllTasks();
        }
      });
  }

  private getAllTasks() {
    this.appService.getTasks()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((tasks) => {
        this.tasks$.next(tasks);

        Object.keys(tasks).forEach((key) => {
          this.tasks.push({
            id: key,
            title: tasks[key].title,
            description: tasks[key].description,
            is_active: tasks[key].is_active
          });
        });
      });
  }
}
