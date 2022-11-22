import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../settings/services/post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  public postId!: any;
  public post!: any;
  constructor(private rout: ActivatedRoute,private postServ: PostService,) {
  }

  ngOnInit(): void {
    this.rout.params.subscribe(res => {
      this.postId = res;
    });
    this.postServ.getById(this.postId.id).subscribe(res => {
      this.post = res;
    });
  }

}
