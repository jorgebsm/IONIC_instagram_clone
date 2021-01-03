import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPageRoutingModule } from './posts-routing.module';

import { PostsPage } from './posts.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TabComponent } from 'src/app/components/tab/tab.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PostsPage, TabComponent]
})
export class PostsPageModule {}