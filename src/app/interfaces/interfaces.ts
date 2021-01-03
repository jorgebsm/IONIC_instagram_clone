export interface RespuestaPosts {
    ok: boolean;
    page: number;
    posts: Post[];
  }
  
  export interface Post {
    imgs?: string[];
    _id?: string;
    message?: string;
    coords?: string;
    usuario?: Usuario;
    created?: string;
  }
  
  export interface Usuario {
    avatar?: string;
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
  }
  
  