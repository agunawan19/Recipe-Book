import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
  showMenu = false;

  constructor() { }

  ngOnInit() {
  }

  onSelect(feature: string): void {
    this.featureSelected.emit(feature);
  }

  onMenuClicked() {
    this.showMenu = !this.showMenu;
  }
}
