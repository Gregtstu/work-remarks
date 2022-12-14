import {IMainComment} from "./imain-comment";

export interface IPost {
  id?:string;
  izd:string;
  name:string;
  shifr:string;
  description:string;
  comments?:any;
  favorite:boolean;
}
