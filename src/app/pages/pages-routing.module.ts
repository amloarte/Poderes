import { PoderesModule } from './../modules/poderes/poderes.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'poderes',
        pathMatch: 'full',
      },
      // {
      //   path: '',
      //   loadChildren: () =>
      //     import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      // },
      {
        path: 'poderes',
        loadChildren: () =>
          import('../modules/poderes/poderes.module').then((m) => m.PoderesModule),
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
