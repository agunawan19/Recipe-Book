import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showMenu = false;
  showManageMenu = false;

  constructor() { }

  ngOnInit() {
  }

  onMenuButtonClicked() {
    this.showMenu = !this.showMenu;
  }

  onManageMenuClicked() {
    this.showManageMenu = !this.showManageMenu;
  }
}
