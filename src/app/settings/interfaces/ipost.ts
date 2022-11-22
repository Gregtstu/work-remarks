export interface IPost {
  id?:string;
  izd:string;
  name:string;
  shifr:string;
  description:string;
  comments:Array<string>;
  favorite:boolean;
}
