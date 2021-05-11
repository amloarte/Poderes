import { Usuario } from './../../../../../modules/auth/_models/usuario.model';
import { LoginService } from './../../../../../modules/auth/_services/login.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { KTUtil } from '../../../../../../assets/js/components/util';
import KTLayoutHeader from '../../../../../../assets/js/layout/base/header';
import KTLayoutHeaderMenu from '../../../../../../assets/js/layout/base/header-menu';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {

  @ViewChild('ktHeaderMenu', { static: false }) ktHeaderMenu: ElementRef;
  usuario: Usuario;
  constructor(
    private serviceUsuario: LoginService
  ) {}

  ngOnInit(): void {
    this.usuario = this.serviceUsuario.usuario;
   }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {

    KTUtil.ready(() => {
      // Init Desktop & Mobile Headers
      KTLayoutHeader.init('kt_header', 'kt_header_mobile');
      // Init Header Menu
      KTLayoutHeaderMenu.init('kt_header_menu', 'kt_header_menu_wrapper');
    });
  }
}
