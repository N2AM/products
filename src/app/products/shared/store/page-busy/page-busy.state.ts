import { Injectable } from '@angular/core';
import { EmitterAction, Receiver } from '@ngxs-labs/emitter';
import { Selector, State, StateContext } from '@ngxs/store';

import { PageBusyActionType } from './page-busy.action';

interface PageBusyStateModel {
  pageBusy: boolean;
}

@State<PageBusyStateModel>({
  name: 'pageBusy',
  defaults: {
    pageBusy: false,
  },
})
@Injectable({
  providedIn: 'root'
})
export class PageBusyState {
  @Selector()
  static getPageBusy(state: PageBusyStateModel): boolean {
    return state.pageBusy;
  }

  @Receiver({ type: PageBusyActionType.BUSY_STATE_TOGGLE })
  static toggleBusyState(ctx: StateContext<PageBusyStateModel>, { payload }: EmitterAction<boolean>): void {
    ctx.patchState({pageBusy: payload});
  }
}
