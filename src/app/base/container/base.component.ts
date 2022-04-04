import {ChangeDetectorRef, Component, OnInit, Self} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../dialogs';
import { takeUntil } from 'rxjs/operators';
import { AppService, ComponentDestroyService } from '../../shared/services';
import { Subject } from 'rxjs';
import { Task } from '../../shared/interfaces';

@Component({
  selector: 'modo-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [ComponentDestroyService]
})
export class BaseComponent implements OnInit {
  public tasks$ = new Subject<Task[]>();

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

  public openTaskDialog( type?: string, task?: Task) {
    this.dialog
      .open(TaskDialogComponent, {
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
          this.tasks.splice(0, this.tasks.length);
          this.getAllTasks();
        }
      });
  }

  public onSearchChanged(event: any) {
    if (!event.value) {
      event.value = ''
    }

    const searchArr = this.tasks.filter((item) => item.title.includes(event.value));

    this.tasks$.next(searchArr);
  }

  public completeTask(task: Task) {
    const payload = {
      title: task.title,
      description: task.description,
      is_active: false,
    };

    this.appService.updateTask(task.id, payload)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        if (data) {
          this.tasks.splice(0, this.tasks.length);
          this.getAllTasks();
        }
      });
  }

  public deleteTask(task: Task) {
    this.appService.deleteTask(task.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
          this.tasks.splice(0, this.tasks.length);
          this.getAllTasks();
      });
  }

  public getActiveTaskCount() {
    return this.tasks.filter((item) => item.is_active).length;
  }

  public getCompletedTaskCount() {
    return this.tasks.filter((item) => !item.is_active).length;
  }

  private getAllTasks() {
    this.appService.getTasks()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((tasks) => {
        Object.keys(tasks).forEach((key) => {
          this.tasks.push({
            id: key,
            title: tasks[key].title,
            description: tasks[key].description,
            is_active: tasks[key].is_active
          });
        });

        this.tasks.sort((a, b) => a.is_active > b.is_active ? -1 : 0);

        this.tasks$.next(this.tasks);
      });
  }
}
