import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { TabComponent } from './tab/tab.component';
import { IonicModule } from '@ionic/angular';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';



@NgModule({
  declarations: [
    PostsListComponent,
    PostComponent,
    AvatarSelectorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports: [
    PostsListComponent,
    AvatarSelectorComponent
  ]
})
export class ComponentsModule { }
