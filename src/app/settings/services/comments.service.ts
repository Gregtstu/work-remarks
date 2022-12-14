import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, switchMap, tap} from "rxjs";
import {IMainComment} from "../interfaces/imain-comment";
import {IPost} from "../interfaces/ipost";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {
  }

  createComment(comments: any, id: string,): Observable<IMainComment> {
    return this.http.post<IMainComment>(`https://noteces-52d4e-default-rtdb.firebaseio.com/posts/${id}/comments/.json`, comments)
      .pipe(map(res => {
          return {
            ...comments,
            id: res.id,
          }
        })
      );
  }

  getAllComments(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://noteces-52d4e-default-rtdb.firebaseio.com/posts/${id}/comments.json`)
      .pipe(
        map(res => {
          return Object.keys(res)
            .map((key: any) => ({
              ...res[key],
              id: key,
            }));
        }),
        tap(res => {
          res.map(item => {
            if(item.newComments){
              item.newComments = Object.keys(item.newComments).map((key: any) => ({
                ...item.newComments[key],
                id: key,
              }));
            }
          })
        }));

  }

  deleteComment(postId: string, commentId: string): Observable<IMainComment> {
    return this.http.delete<IMainComment>(`https://noteces-52d4e-default-rtdb.firebaseio.com/posts/${postId}/comments/${commentId}.json`);
  }

  updateComment(postId: string, commentId: string, obj: any): Observable<IMainComment> {
    return this.http.patch<IMainComment>(`https://noteces-52d4e-default-rtdb.firebaseio.com/posts/${postId}/comments/${commentId}.json`, obj);
  }

  createNewComment(postId: string, commentId: string, comments: any): Observable<IMainComment> {
    return this.http.post<IMainComment>(`https://noteces-52d4e-default-rtdb.firebaseio.com/posts/${postId}/comments/${commentId}/newComments.json`, comments)
      .pipe(map(res => {
          return {
            ...comments,
            id: res.id,
          }
        })
      );
  }

  deleteNewComment(postId: string, commentId: string, childcommentId:string): Observable<IMainComment> {
    return this.http.delete<IMainComment>(`https://noteces-52d4e-default-rtdb.firebaseio.com/posts/${postId}/comments/${commentId}/newComments/${childcommentId}.json`);
  }

  updateNewComment(postId: string, commentId: string, newCommentId:string, obj: any): Observable<IMainComment> {
    return this.http.patch<IMainComment>(`https://noteces-52d4e-default-rtdb.firebaseio.com/posts/${postId}/comments/${commentId}/newComments/${newCommentId}.json`, obj);
  }

}
