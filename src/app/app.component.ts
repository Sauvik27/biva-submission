import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'biva-analytics';
  tabs = ['Grid', 'Chart'];
  activeTab = this.tabs[0];

  constructor(private router: Router) { }

  ngOnInit() {
    this.setActiveTab(this.activeTab)
  }

  setActiveTab(tab: any) {
    this.activeTab = tab;
    switch (tab) {
      case 'Grid':
        this.router.navigate(['/task-grid']);
        break;
      case 'Chart':
        this.router.navigate(['/task-chart']);
        break;
      default:
        break;
    }
  }
}
