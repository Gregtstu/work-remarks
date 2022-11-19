import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent  {
  public isMenuOpen: boolean;
  public navigationItem: string;
  constructor() {
    this.isMenuOpen = false;
    this.navigationItem = 'Все изделия';
  }

  viewItem(event:Event):void{
    this.navigationItem = (event.target as HTMLInputElement).innerText;
  }

}
