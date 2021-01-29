import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UsersService } from './users.service';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagePosts: number = 0;
  nuevoPost = new EventEmitter<Post>();

  constructor( private http: HttpClient,
    private userService: UsersService ) { }

  getPosts( pull: boolean = false ) {
    if ( pull ) this.pagePosts = 0;
    this.pagePosts ++;
    return this.http.get<RespuestaPosts>(`${ API }/posts/?page=${ this.pagePosts }`);
  }

  createPost( post ) {    

    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise( resolve => {

      this.http.post(`${ API }/posts`, post, { headers }).subscribe(
        res => {
          this.nuevoPost.emit( res['post'] );
          resolve(true);
        }
      );

    });

  }

}
