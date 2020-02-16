import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
  showMenu = false;
  showManageMenu = false;

  constructor() { }

  ngOnInit() {
  }

  onSelect(feature: string): void {
    this.featureSelected.emit(feature);
  }

  onMenuButtonClicked() {
    this.showMenu = !this.showMenu;
  }

  onManageMenuClicked() {
    this.showManageMenu = !this.showManageMenu;
  }
}
