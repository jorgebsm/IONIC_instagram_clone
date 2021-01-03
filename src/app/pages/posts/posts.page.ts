import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  posts: Post[] = [];
  habilitado = true;
  namePage: string = 'InstaClone';

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {

    this.siguientes();

  }

  reload( event ) {

    this.siguientes( event, true );
    this.posts = [];
    this.habilitado = true;

  }

  siguientes( event?, pull: boolean = false ) {

    this.postsService.getPosts( pull ).subscribe(
      res => {
        this.posts.push(...res.posts);
        console.log(res);

        if ( event ) {
          event.target.complete();
          
          if ( res.posts.length === 0 ) {
            this.habilitado = false;
          }

        }

      }
    );

  }

}
