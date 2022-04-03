import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './container/base.component';
import { BaseRoutingModule } from './base-routing.module';
import { CustomMaterialModule } from '../shared/modules';
import { SearchTasksComponent } from './components';
import { AddNewTaskDialogComponent } from './dialogs';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    BaseComponent,
    SearchTasksComponent,
    AddNewTaskDialogComponent
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    CustomMaterialModule,
    ReactiveFormsModule
  ]
})
export class BaseModule { }
