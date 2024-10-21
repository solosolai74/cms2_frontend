import { Component } from '@angular/core';
import { BreadcrumbDetailsService } from '../../../breadcrumb-details.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  heading : any
  constructor (private readonly breadcrumbDetails: BreadcrumbDetailsService){}

  // ngOnInit(){
  //   console.log("this.BreadcrumbDetails.breadcrumbName comp", this.BreadcrumbDetails.breadcrumbName);
    
  //   this.heading =   this.BreadcrumbDetails.breadcrumbName
     
  // }

  ngOnInit() {
    this.breadcrumbDetails.breadcrumbName$.subscribe(name => {
      this.heading = name;
      console.log("Updated breadcrumbName in component:", this.heading);
    });
  }

}
