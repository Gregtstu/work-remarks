import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent {

  @ViewChild('input') inputRef!: ElementRef;
  public image!:File;
  public imagePrevew:string | ArrayBuffer | null;

  constructor() {
    this.imagePrevew = '';
  }
  triggerInput() {
    this.inputRef.nativeElement.click();
  }

  fileUpload(e:any) {
    const file = e.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePrevew = reader.result;
      console.log(this.imagePrevew)
    }

    reader.readAsDataURL(file);

  }
}
