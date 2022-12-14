import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentsService} from "../settings/services/comments.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modalka',
  templateUrl: './modalka.component.html',
  styleUrls: ['./modalka.component.scss']
})
export class ModalkaComponent {
  public disabledFlag: boolean;
  public forma!: FormGroup;
  public postId!: any;
  @Output() emitComment: EventEmitter<any>;

  constructor(
    private formBuilder: FormBuilder,
    private commentsServ: CommentsService,
    private routerActive: ActivatedRoute,
    private dialogRef: MatDialogRef<ModalkaComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    this.disabledFlag = false;
    this.emitComment = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.routerActive.params.subscribe(res => {
      this.postId = res;
    });
    this.forma = this.formBuilder.group({
      userName: ['', Validators.required],
      commentText: ['', Validators.required],
    });
    if (this.editData.edit) {
      this.forma.controls['userName'].setValue(this.editData.userName);
      this.forma.controls['commentText'].setValue(this.editData.commentText);
    }
  }

  submit() {
    if (this.forma.valid) {
      if (this.editData.edit) {
        if (this.editData.mainId) {
          this.commentsServ.updateNewComment(this.editData.postId, this.editData.mainId, this.editData.id, this.forma.value)
            .subscribe({
              next: (res) => {
                alert('Комментарий изменен!');
              },
              error: (error) => {
                console.log(error);
              },
              complete: () => {
                this.dialogRef.close('child');
              }
            });

        } else {
          this.commentsServ.updateComment(this.editData.postId, this.editData.id, this.forma.value)
            .subscribe({
              next: (res) => {
                alert('Комментарий изменен!');
              },
              error: (error) => {
                console.log(error)
              },
              complete: () => {
                this.dialogRef.close('main');
              }
            });

        }
      } else {
        this.commentsServ.createNewComment(this.editData.postId, this.editData.id, this.forma.value).subscribe({
          next: (res) => {
            alert('Комментарий добавлен!');
          },
          error: (error) => {
            console.log(error)
          },
          complete: () => {
            this.dialogRef.close('create');
          }
        });
      }

    }


  }
}
