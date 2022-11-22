import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IPost} from "../interfaces/ipost";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getById(id:any):Observable<IPost> {
    return this.http.get<any>(`https://noteces-52d4e-default-rtdb.firebaseio.com/posts/${id}.json`)
      .pipe( map ( res => {
        return {
          ...res,
          id,
        }
      }));
  }

  editPost(post: IPost):Observable<IPost>{
    return this.http.put<IPost>(`https://noteces-52d4e-default-rtdb.firebaseio.com/posts/${post.id}.json`, post);
  }

  deletePost(id: string):Observable<IPost>{
    return this.http.delete<IPost>(`https://noteces-52d4e-default-rtdb.firebaseio.com/posts/${id}.json`);
  }
}
