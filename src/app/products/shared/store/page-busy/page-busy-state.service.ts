import { Injectable } from '@angular/core';
import { Emittable, Emitter } from '@ngxs-labs/emitter';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { PageBusyState } from './page-busy.state';

@Injectable({
  providedIn: 'root',
})
export class PageBusyStateService {
  @Select(PageBusyState.getPageBusy) pageBusy$!: Observable<boolean>;
  @Emitter(PageBusyState.toggleBusyState) toggleBusyState!: Emittable<boolean>;
}
