import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ComponentDestroyService } from '../../../shared/services';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'modo-search-tasks',
  templateUrl: './search-tasks.component.html',
  styleUrls: ['./search-tasks.component.scss'],
  providers: [ComponentDestroyService]
})
export class SearchTasksComponent implements OnInit {
  @Output() onSearchChanged = new EventEmitter<any>();

  public searchControl = new FormControl('');

  constructor(
    @Self() private destroyed$: ComponentDestroyService
  ) {}

  ngOnInit(): void {
    this.searchControl?.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.changeSearch();
    })
  }

  changeSearch() {
    this.onSearchChanged.emit(this.searchControl);
  }
}
