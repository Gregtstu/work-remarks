import {Component, OnInit} from '@angular/core';
import {IPost} from "../../settings/interfaces/ipost";
import {LocalStorageService} from "../../settings/services/local-storage.service";

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit{

  public posts: IPost[] = [];
  public search: string = '';

  constructor(private localStorage: LocalStorageService) {
  }
  ngOnInit(): void {
this.getAllPosts();
  }

  getAllPosts(): void {
    this.posts = this.localStorage.getLs('posts');
  }

  delete(id: string | undefined) {
    this.localStorage.removeLs(this.posts, id);
    this.getAllPosts();
  }
}
