export class Login {

  constructor(login:string, password:string, id_sistema: number, terminal: string ) {
      this.login = login;
      this.password = password;
      this.id_sistema = id_sistema;
      this.terminal = terminal;
  }
  login: string;
  password: string;
  id_sistema: number;
  terminal: string;
}
