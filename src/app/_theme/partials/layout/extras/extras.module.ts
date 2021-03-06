import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SearchDropdownInnerComponent } from './dropdown-inner/search-dropdown-inner/search-dropdown-inner.component';
import { NotificationsDropdownInnerComponent } from './dropdown-inner/notifications-dropdown-inner/notifications-dropdown-inner.component';
import { QuickActionsDropdownInnerComponent } from './dropdown-inner/quick-actions-dropdown-inner/quick-actions-dropdown-inner.component';
import { CartDropdownInnerComponent } from './dropdown-inner/cart-dropdown-inner/cart-dropdown-inner.component';
import { SearchResultComponent } from './dropdown-inner/search-dropdown-inner/search-result/search-result.component';
import { CoreModule } from '../../../core';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    SearchDropdownInnerComponent,
    NotificationsDropdownInnerComponent,
    QuickActionsDropdownInnerComponent,
    CartDropdownInnerComponent,
    SearchResultComponent,
    ScrollTopComponent,
  ],
  imports: [CommonModule, InlineSVGModule, PerfectScrollbarModule, CoreModule, RouterModule],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  exports: [
    SearchDropdownInnerComponent,
    NotificationsDropdownInnerComponent,
    QuickActionsDropdownInnerComponent,
    CartDropdownInnerComponent,
    ScrollTopComponent,
  ],
})
export class ExtrasModule { }
