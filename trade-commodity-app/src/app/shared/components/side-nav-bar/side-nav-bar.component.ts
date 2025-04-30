
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {
  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/' },
    { icon: 'person', label: 'Trades', route: '/trades' },
    { icon: 'settings', label: 'Settings', route: '/settings' }
  ];

    constructor() { }

  ngOnInit(): void {
  }
}

