import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-centre',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './view-centre.component.html',
  styleUrl: './view-centre.component.scss'
})
export class ViewCentreComponent {


  centreDetailsData: any[] = [
    {
      centreCode: '701',
      centreName: 'Center 701',
      examClient: 'STAR / STAR',
      centreRegion: 'TESTING',
      ciName: 'MYDEEN SEYADU',
      ciContact: '6379788008'
    },
    {
      centreCode: '702',
      centreName: 'Center 702',
      examClient: 'EXAM / CLIENT 2',
      centreRegion: 'REGION 2',
      ciName: 'CONTACT NAME 2',
      ciContact: '6379788009'
    },
    {
      centreCode: '703',
      centreName: 'Center 703',
      examClient: 'EXAM / CLIENT 3',
      centreRegion: 'REGION 3',
      ciName: 'CONTACT NAME 3',
      ciContact: '6379788010'
    }
  ];
  
  constructor (private readonly router: Router){}


    editExamDetails(data : any){
console.log("edit", data);
localStorage.setItem('edit', JSON.stringify(data));

this.router.navigate(['/centreDeviceDetails/editExamCentre'])


    }

    deleteExamDetails(data : any){
console.log("delete", data);

Swal.fire({
  icon: 'question',
  title: 'Are You Sure Want To Delete The Exam Centre?',
  // text: file.name,
  showDenyButton: true,
  // showCancelButton: true,
  confirmButtonText: 'Delete',
  denyButtonText: `Cancel`,
}).then((result) => {
  if (result.isConfirmed) {

    // delete here
    console.log("delete confirm", data);

      

   
  } else if (result.isDenied) {
    Swal.fire('Deleting Exam Centre Cancelled', '', 'warning');
  }
});

    }
    
}
