import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentDestroyService extends Subject<any> implements OnDestroy {
  ngOnDestroy() {
    this.next(true);
    this.complete();
  }
}
