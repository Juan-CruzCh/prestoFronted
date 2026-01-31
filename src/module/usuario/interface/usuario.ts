export interface UsuarioListarI {
  _id: string;       
  ci: string;
  nombre: string;
  celular: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  usuario: string;
  password: string;
  direccion: string;
  flag: string;
  rol: string;
  fecha: Date;         
}


export interface UsuarioCrearI {
  ci: string;
  nombre: string;
  celular: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  usuario: string;
  password: string;
  direccion: string;
  rol: string;
        
}

export interface UpdateUsuarioI {
  ci: string;
  nombre: string;
  celular: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  usuario: string;
  direccion: string;
  rol: string;
        
}

