import {Component, OnInit, Self} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTaskDialogComponent } from '../dialogs';
import { takeUntil } from "rxjs/operators";
import { ComponentDestroyService } from "../../shared/services";

@Component({
  selector: 'modo-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [ComponentDestroyService]
})
export class BaseComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    @Self() private destroyed$: ComponentDestroyService
  ) { }

  ngOnInit() {}

  public openAddTaskDialog() {
    this.dialog
      .open(AddNewTaskDialogComponent, {
        data: {},
        maxWidth: '31em',
        width: '100%',
        maxHeight: '30em',
        height: '100%'
      })
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }
}
