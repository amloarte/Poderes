import { Router } from '@angular/router';
import { LoginService } from './../../../../modules/auth/_services/login.service';
import { Usuario } from './../../../../modules/auth/_models/usuario.model';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../_theme/core';
import { SidebarService } from 'src/app/_theme/core/services/sidebar.service';
import { Funcionalidades } from 'src/app/models/menu.model';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {

  usuario: Usuario;
  funcionalidadPadre: Funcionalidades;
  headerLogo: string;
  brandSkin: string;
  location: Location;
  asideSelfMinimizeToggle = true;
  brandClasses: string;
  asideMenuScroll = 1;
  ulCSSClasses: string;
  asideMenuCSSClasses: string;
  // disableAsideSelfDisplay: boolean;
  // asideMenuHTMLAttributes: any = {};
  // asideMenuDropdown;

  constructor(
    private layout: LayoutService,
    private loc: Location,
    private sidebarService: SidebarService,
    private usuarioService: LoginService,
    private route: Router
  ) {

  }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    if (this.usuario) { this.obtenerMenu(this.usuario.id_perfil); } else {   this.route.navigate(['/auth/login']); }
    this.headerLogo = this.getLogo();
    this.asideSelfMinimizeToggle = this.layout.getProp(
      'aside.self.minimize.toggle'
    );
    this.brandClasses = this.layout.getProp('brand');
    this.ulCSSClasses = this.layout.getProp('aside_menu_nav');
    this.asideMenuScroll = this.layout.getProp('aside.menu.scroll') ? 1 : 0;
    this.asideMenuCSSClasses = this.layout.getStringCSSClasses('aside_menu');

    // load view settings
    // this.disableAsideSelfDisplay = this.layout.getProp('aside.self.display') === false;
    // this.brandSkin = this.layout.getProp('brand.self.theme');
    // this.asideMenuHTMLAttributes = this.layout.getHTMLAttributes('aside_menu');
    // this.asideMenuDropdown = this.layout.getProp('aside.menu.dropdown') ? '1' : '0';
    // this.asideMenuCSSClasses = `${this.asideMenuCSSClasses} ${this.asideMenuScroll === 1 ? 'scroll my-4 ps ps--active-y' : ''}`;
    // Routing
    this.location = this.loc;
    const angularRoute = this.loc.path();
    const url = window.location.href;
  }

  private getLogo() {
    if (this.brandSkin === 'light') {
      return './assets/media/logos/logo-dark.png';
    } else {
      return './assets/media/logos/logo-light.png';
    }
  }

  async obtenerMenu(perfilId: number) {

    if (perfilId) {
      await this.sidebarService.get_funcionalidadesPadre(perfilId)
        .then((resp: any) => {

          this.funcionalidadPadre = resp;

          if (resp.length === 0) {

            localStorage.clear();
            this.route.navigate(['/auth/login']);

          } else {
            // localStorage.setItem( 'menu', JSON.stringify(resp));
            this.route.navigate(['/inicio']);
            // console.log(this.funcionalidadPadre);
          }

        }).catch(err => {

          alert('Error al obtener funcionalidades asignadas');
          this.route.navigate(['/auth/login']);
          console.warn(err);

        });

    } else {
      this.route.navigate(['/auth/login']);
     }
  }
}
