import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./pages/main-layout/main-layout.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {CreatePageComponent} from "./pages/create-page/create-page.component";
import {FavoritePageComponent} from "./pages/favorite-page/favorite-page.component";
import {EditPageComponent} from "./pages/edit-page/edit-page.component";
import {PostComponent} from "./pages/post/post.component";

const routes: Routes = [
  {
    path:'', component:MainLayoutComponent, children:[
      {path:'', redirectTo:'/main', pathMatch:'full'},
      {path:'main', component:MainPageComponent},
      {path:'create', component:CreatePageComponent},
      {path:'favorite', component:FavoritePageComponent},
      {path:'post/:id', component:PostComponent},
      {path:'edit/:id', component:EditPageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
