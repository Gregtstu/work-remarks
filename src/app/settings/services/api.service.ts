import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPost} from "../interfaces/ipost";
import {map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public img!:string | ArrayBuffer | null;

  constructor(private http:HttpClient) { }

  addPost(post:IPost):Observable<IPost>{
    return this.http.post<IPost>('https://noteces-52d4e-default-rtdb.firebaseio.com/posts.json', post)
      .pipe(map(res => {
          return {
            ...post,
            id: res.name,
          }
        })
      );
  }

  getAllPosts():Observable<IPost[]>{
    return this.http.get<IPost[]>('https://noteces-52d4e-default-rtdb.firebaseio.com/posts.json')
      .pipe( map ( res => {
        return Object.keys(res)
          .map( (key:any) => ({
            ...res[key],
            id: key,
          }));
      }),
        tap(res => {
          res.map(item => {
            if(item.comments){
              item.comments = Object.keys(item.comments).map((key: any) => ({
                ...item.comments[key],
                id: key,
              }));
            }
          })
        }));
  }

}
