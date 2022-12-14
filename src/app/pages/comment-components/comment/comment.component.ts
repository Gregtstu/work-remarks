import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent{

  @Input() comment!: any;
  @Input() childrenComments!: any;
  @Output() deleteComment: EventEmitter<any>
  @Output() deleteNewComment: EventEmitter<any>
  @Output() createComment: EventEmitter<any>
  @Output() updateComment: EventEmitter<any>
  @Output() updatenewComment: EventEmitter<any>

  constructor() {
    this.deleteComment = new EventEmitter<any>();
    this.deleteNewComment = new EventEmitter<any>();
    this.createComment = new EventEmitter<any>();
    this.updateComment = new EventEmitter<any>();
    this.updatenewComment = new EventEmitter<any>();
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.comment = changes['comment'].currentValue;
  // }

  delete(id:string):void{
    this.deleteComment.emit(id);
  }

  deleteNew(mainId:string, childId:string):void{
   const idObj:any = {
      main: mainId,
      child: childId
    }
    this.deleteNewComment.emit(idObj);
  }

  update(obj:any):void{
    this.updateComment.emit(obj);
  }


  create(obj:any) {
    this.createComment.emit(obj);
  }

  updateNewComment(mainId:string, newComment: any) {
    newComment.mainId = mainId;
    this.updatenewComment.emit(newComment);
  }

}
