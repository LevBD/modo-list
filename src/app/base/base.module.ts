import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './container/base.component';
import { BaseRoutingModule } from './base-routing.module';
import { CustomMaterialModule } from '../shared/modules';

@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    BaseRoutingModule,
    CustomMaterialModule
  ]
})
export class BaseModule { }
