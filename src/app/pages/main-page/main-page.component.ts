import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../settings/services/api.service";
import {IPost} from "../../settings/interfaces/ipost";
import {LocalStorageService} from "../../settings/services/local-storage.service";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public posts: IPost[] = [];
  public disable: boolean = false;
  public search: string = '';

  constructor(
    public apiServ: ApiService,
    private localStarage: LocalStorageService,
  ) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.apiServ.getAllPosts().subscribe(res => {
      this.posts = res;
      this.getFavorite();
    });
  }


  getFavorite(): void {
    const LSPosts = this.localStarage.getLs('posts');
    LSPosts.forEach((item: IPost) => {
      this.posts.map((elem: IPost) => {
        if(item.id === elem.id && item.favorite === true){
          elem.favorite = true;
        }
      });
    });
  }

  favorite(post:IPost) {
    const posts = this.localStarage.getLs('posts');
    if (!this.disable) {
      this.localStarage.addLs(post, post.id);
    }else {
      post.favorite = false;
      this.localStarage.removeLs(posts, post.id);
    }
  }
}
