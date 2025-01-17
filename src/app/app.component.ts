import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/layout/header/header.component';
import { NavigationComponent } from './pages/layout/navigation/navigation.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './pages/layout/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavigationComponent, CommonModule, BreadcrumbComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cms2-frontend';

  currentPath: any
  constructor(private router: Router) {
    // this.router.events
    // .pipe(filter(event => event instanceof NavigationEnd))
    // .subscribe((event: NavigationEnd) => {
    //   console.log('Current path:', event.url);
    //   this.currentPath = event.url
    // });
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('Current path:', event.url);
        this.currentPath = event.url
      });
  }
}
