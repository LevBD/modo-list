import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseComponent } from './container/base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class BaseRoutingModule {}
