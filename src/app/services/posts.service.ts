import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { RespuestaPosts } from '../interfaces/interfaces';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagePosts: number = 0;

  constructor( private http: HttpClient ) { }

  getPosts( pull: boolean = false ) {
    if ( pull ) this.pagePosts = 0;
    this.pagePosts ++;
    return this.http.get<RespuestaPosts>(`${ API }/posts/?page=${ this.pagePosts }`);
  }

}
