import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbDetailsService {

  // breadcrumbName: any = ''
  // constructor() { }

  // ngOnInit(){
  //   console.log("breadcrumbName service", this.breadcrumbName);
  // }

  private breadcrumbNameSource = new BehaviorSubject<string>('');
  breadcrumbName$ = this.breadcrumbNameSource.asObservable();

  setBreadcrumbName(name: string) {
    this.breadcrumbNameSource.next(name);
  }
}
