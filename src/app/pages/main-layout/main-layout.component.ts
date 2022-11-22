import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  public isMenuOpen: boolean;
  public navigationItem: string;


  constructor() {
    this.isMenuOpen = false;
    this.navigationItem = 'Все изделия';
  }

  ngOnInit(): void {
  }

  viewItem(event: any): void {
    this.navigationItem = (event.target as HTMLInputElement).innerText;
    this.isMenuOpen = false;
  }


}
