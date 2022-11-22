import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../settings/services/api.service";
import {IPost} from "../../settings/interfaces/ipost";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  @ViewChild('input') inputRef!: ElementRef;
  public image!: File;
  public imagePrevew: string | ArrayBuffer | null;
  public imagePrevew2!: string | ArrayBuffer | null;
  public forma!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiServ: ApiService,
    private router: Router
  ) {
    this.imagePrevew = '';
  }

  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      izd: ['', Validators.required],
      name: ['', Validators.required],
      shifr: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  onSubmit() {
    if (this.forma.invalid) return;
    const obj: IPost = {
      izd: this.forma.value.izd,
      name: this.forma.value.name,
      shifr: this.forma.value.shifr,
      description: this.forma.value.description,
      comments: ['нет комментариев'],
      favorite:false,
    }

    this.apiServ.addPost(obj).subscribe({
      next: (res) => {
        this.forma.reset();
        this.router.navigate(['/main']);
      },
      error:(er) => {
        alert('Возникла проблема с отправкой на сервер');
      }
    });

  }

}
