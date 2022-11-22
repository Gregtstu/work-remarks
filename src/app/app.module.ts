import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CreatePageComponent} from './pages/create-page/create-page.component';
import {MainLayoutComponent} from './pages/main-layout/main-layout.component';
import {EditPageComponent} from './pages/edit-page/edit-page.component';
import {FavoritePageComponent} from './pages/favorite-page/favorite-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {PostComponent} from './pages/post/post.component';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from '@angular/material/menu';
import { SearchPipe } from './settings/pipes/search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CreatePageComponent,
    MainLayoutComponent,
    EditPageComponent,
    FavoritePageComponent,
    MainPageComponent,
    PostComponent,
    SearchPipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatCardModule,
        MatDialogModule,
        MatMenuModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
