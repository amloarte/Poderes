import { InterceptorService } from './modules/auth/_services/interceptor.service';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
// Highlight JS
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { SplashScreenModule } from './_theme/partials/layout/splash-screen/splash-screen.module';
import { PoderesComponent } from './modules/poderes/poderes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// #fake-start#
// #fake-end#

// function appInitializer(authService: AuthService) {
//   return () => {
//     return new Promise((resolve) => {
//       authService.getUserByToken().subscribe().add(resolve);
//     });
//   };
// }


@NgModule({
  declarations: [AppComponent, PoderesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SplashScreenModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    HighlightModule,
    ClipboardModule,
    // #fake-start#
    // environment.isMockEnabled
    //   ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
    //     passThruUnknownUrl: true,
    //     dataEncapsulation: false,
    //   })
    //   : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
  ],
  providers: [
    // {
    //   provide: HIGHLIGHT_OPTIONS,
    //   useValue: {
    //     coreLibraryLoader: () => import('highlight.js/lib/core'),
    //     languages: {
    //       xml: () => import('highlight.js/lib/languages/xml'),
    //       typescript: () => import('highlight.js/lib/languages/typescript'),
    //       scss: () => import('highlight.js/lib/languages/scss'),
    //       json: () => import('highlight.js/lib/languages/json')
    //     },
    //   },
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
