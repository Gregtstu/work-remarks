import { Injectable } from '@angular/core';
import {IPost} from "../interfaces/ipost";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addLs(post: Object, postId: string | undefined) {
    if (localStorage.getItem('posts') === null) {
      let posts: any[] = [];
      posts.push(post);
      posts.map(item => {
        if (item.favorite === false && item.id === postId) {
          item.favorite = true;
        }
        localStorage.setItem('posts', JSON.stringify(posts));
      });
    } else {
      let posts: any[] = JSON.parse(localStorage.getItem('posts') || '[]');
      posts = posts.filter(item => item.id != postId);
      posts.push(post);
      posts.map(item => {
        if (item.favorite === false && item.id === postId) {
          item.favorite = true;
        }
        localStorage.setItem('posts', JSON.stringify(posts));
      });
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  }

  getLs(key: string):Array<IPost> {
    return JSON.parse(localStorage.getItem(key) || '{}')
  }

  removeLs(posts:IPost[], id:string | undefined): void {
    posts = posts.filter((item:IPost) => item.id != id)
    localStorage.setItem('posts', JSON.stringify(posts));
  }

}
