import {Component, OnInit} from '@angular/core';
import {CommentsService} from "../../../settings/services/comments.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ModalkaComponent} from "../../../modalka/modalka.component";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  public comments!: any [];
  public childComments!: any [];
  public postId!: any;
  public commentId!: any;

  constructor(
    private commentsServ: CommentsService,
    private routerActive: ActivatedRoute,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.routerActive.params.subscribe(res => {
      this.postId = res;
    });
    this.getComments();
  }

  getComments(): void {
    this.commentsServ.getAllComments(this.postId.id).subscribe(res => {
      this.comments = res;
      res.forEach(item => this.commentId = item.id);
    });
  }


  addMainComment(obj: any): void {
    this.commentsServ.createComment(obj, this.postId.id).subscribe(res => {
      this.getComments();
    });
  }

  deleteComment(id: string) {
    this.commentsServ.deleteComment(this.postId.id, id)
      .subscribe({
        next: (res) => {
          alert('Комментарий удален!');
          this.getComments();
        },
        error: (err) => {
          alert("ОШИБКА!");
        }
      })
  }

  deleteNewComment(obj: any) {
    this.commentsServ.deleteNewComment(this.postId.id, obj.main, obj.child)
      .subscribe({
        next: (res) => {
          alert('Комментарий удален!');
          this.getComments();
        },
        error: (err) => {
          alert("ОШИБКА!");
        }
      })
  }

  updateComment(obj: any): void {
    const objNew: any = obj;
    objNew.postId = this.postId.id;
    objNew.edit = true;
    this.dialog.open(ModalkaComponent, {
      width: '60%',
      data: objNew,
    }).afterClosed().subscribe(val => {
      if (val === 'main') this.getComments();
    });
  }

  updateNewComment(obj: any): void {
    const objNew: any = obj;
    objNew.postId = this.postId.id;
    objNew.edit = true;
    this.dialog.open(ModalkaComponent, {
      width: '60%',
      data: objNew,
    }).afterClosed().subscribe(val => {
      if (val === 'child') this.getComments();
    });
  }

  createComment(obj: any): void {
    const objNew: any = obj;
    objNew.postId = this.postId.id;
    objNew.edit = false;
    this.dialog.open(ModalkaComponent, {
      width: '60%',
      data: objNew,
    }).afterClosed().subscribe(val => {
      if (val === 'create') {
        this.getComments();
      }
    });
  }
}
