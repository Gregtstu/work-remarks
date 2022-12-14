import {IchildComment} from "./ichild-comment";

export interface IMainComment {
  id?: string;
  userName:string;
  commentText:string;
  childrenComments?:Array<IchildComment> | [];
  date?:string;
}
