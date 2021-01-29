import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  { 
    path: 'posts', //main
    loadChildren: () => import('./pages/posts/posts.module').then( m => m.PostsPageModule),
    canLoad: [ UsuarioGuard ]
  },
  { 
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canLoad: [ UsuarioGuard ]
  },
  {
    path: 'add-post',
    loadChildren: () => import('./pages/add-post/add-post.module').then( m => m.AddPostPageModule)
  },
  // {
  //   path: 'posts',
  //   loadChildren: () => import('./pages/posts/posts.module').then( m => m.PostsPageModule),
  //   // canLoad: [ UsuarioGuard ]
  // },
];

// const routes: Routes = [
//   {
//     path: 'main',
//     loadChildren: './pages/tabs/tabs.module#TabsPageModule',
//     canLoad: [ UsuarioGuard ]
//   },
//   { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: 'main/tabs/tab1'
//   }
// ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
