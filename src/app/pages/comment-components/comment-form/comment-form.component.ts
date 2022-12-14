import {Component, EventEmitter, Output,} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentsService} from "../../../settings/services/comments.service";
import {ActivatedRoute} from "@angular/router";
import {IMainComment} from "../../../settings/interfaces/imain-comment";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent {

  public disabledFlag: boolean;
  public forma!: FormGroup;
  public postId!: any;
  @Output() emitComment: EventEmitter<IMainComment>;

  constructor(
    private formBuilder: FormBuilder,
    private commentsServ: CommentsService,
    private routerActive: ActivatedRoute,
  ) {
    this.disabledFlag = false;
    this.emitComment = new EventEmitter<IMainComment>();
  }

  ngOnInit(): void {
    this.routerActive.params.subscribe(res => {
      this.postId = res;
    });
    this.forma = this.formBuilder.group({
      userName: ['', Validators.required],
      commentText: ['', Validators.required],
    })
  }

  submit() {
    if (this.forma.valid) {
      const obj: IMainComment = {
        userName: this.forma.value.userName,
        commentText: this.forma.value.commentText,
        date: new Date().toISOString(),
      }
      this.emitComment.emit(obj);
      this.forma.reset();
      this.disabledFlag = false;
    }
  }
}
