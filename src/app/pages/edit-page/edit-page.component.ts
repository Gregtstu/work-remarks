import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from 'src/app/settings/services/post.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {switchMap} from 'rxjs';
import {IPost} from "../../settings/interfaces/ipost";
import {LocalStorageService} from "../../settings/services/local-storage.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  public post!: IPost;
  public postId!: any;
  public form!: FormGroup;
  public flag: boolean = false;
  public disable: boolean = false;

  constructor(
    private routerActive: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private localStarage: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    this.routerActive.params.subscribe(res => {
      this.postId = res;
    });
    this.routerActive.params.pipe(
      switchMap(params => {
        return this.postService.getById(params['id']);
      })).subscribe(post => {
      this.post = post;
      this.form = new FormGroup({
        izd: new FormControl(this.post.izd, [Validators.required]),
        name: new FormControl(this.post.name, [Validators.required]),
        description: new FormControl(this.post.description, [Validators.required]),
        shifr: new FormControl(this.post.shifr, [Validators.required]),
      });
    });
    this.allPostsLS();
  }

  delete(obj: any): void {
    this.postService.deletePost(obj.id)
      .subscribe({
        next: (res) => {
          alert('Пост успешно удален!');
          this.router.navigate(['/']);
        },
        error: () => {
          alert('При удалении поста возникли ошибки!');
        }
      });
  }

  toggleLocalStoragePost(id: string | undefined): void {
    const posts = this.localStarage.getLs('posts');
    if (!this.disable) {
      this.localStarage.addLs(this.post, this.post.id);
    }else {
      this.localStarage.removeLs(posts, id);
    }

  }

  allPostsLS(): void {
    this.localStarage.getLs('posts').forEach((item: IPost) => {
      if (this.postId.id === item.id) {
        this.disable = item.favorite;
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.postService.editPost({
      ...this.post,
      izd: this.form.value.izd,
      name: this.form.value.name,
      description: this.form.value.description,
      shifr: this.form.value.shifr,
    }).subscribe(res => {
      this.router.navigate(['/']);
    });
  }

}
