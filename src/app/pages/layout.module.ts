import { CartDropdownInnerComponent } from './../_theme/partials/layout/extras/dropdown-inner/cart-dropdown-inner/cart-dropdown-inner.component';
import { TopbarComponent } from './_layout/components/topbar/topbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { PagesRoutingModule } from './pages-routing.module';

import { LayoutComponent } from './_layout/layout.component';
import { ScriptsInitComponent } from './_layout/init/scipts-init/scripts-init.component';
import { HeaderMobileComponent } from './_layout/components/header-mobile/header-mobile.component';
import { AsideComponent } from './_layout/components/aside/aside.component';
import { FooterComponent } from './_layout/components/footer/footer.component';
import { HeaderComponent } from './_layout/components/header/header.component';
import { HeaderMenuComponent } from './_layout/components/header/header-menu/header-menu.component';
import { ExtrasModule } from '../_theme/partials/layout/extras/extras.module';
import { CoreModule } from '../_theme/core';
import { SubheaderModule } from '../_theme/partials/layout/subheader/subheader.module';

@NgModule({
  declarations: [
    LayoutComponent,
    ScriptsInitComponent,
    HeaderMobileComponent,
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    InlineSVGModule,
    ExtrasModule,
    CoreModule,
    SubheaderModule,
  ],
})
export class LayoutModule { }
