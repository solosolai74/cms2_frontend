import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { EditCiMappingComponent } from './edit-ci-mapping/edit-ci-mapping.component';

@Component({
  selector: 'app-view-ci-mapping',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EditCiMappingComponent],
  templateUrl: './view-ci-mapping.component.html',
  styleUrl: './view-ci-mapping.component.scss'
})
export class ViewCiMappingComponent {



  memberDetails: any[] = [
    {
      centreCode: 1,
      memberRole: "r1",
      memberName: "m1",
    },
    {
      centreCode: 2,
      memberRole: "r2",
      memberName: "m2",
    },
  ];
  centreCode: any[] = [1, 2, 3];
  memberRole: any[] = ['r1', 'r2', 'r3'];

 
  memberName: any[] = ['m1', 'm2', 'm3'];
  
  editable: boolean = false;
  
  constructor (private readonly router: Router){}

  editInput: any = ''

    editExamDetails(data : any){

      this.editInput = data
      this.editable = true
// console.log("edit", data);
// localStorage.setItem('edit', JSON.stringify(data));

// this.router.navigate(['/examMembersDetails/editExamMembers'])


    }

    deleteExamDetails(data : any){
console.log("delete", data);

Swal.fire({
  icon: 'question',
  title: 'Are You Sure Want To Delete The CI?',
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
    Swal.fire('Deleting CI Cancelled', '', 'warning');
  }
});

    }

    onRegionChange({ value, updated }: { value: any; updated: boolean }) {
      console.log('Region changed:', value);
      console.log('Updated status:', updated);
      // Handle the updated data here, e.g., update the FormControl
      // this.cityForm.get('region')?.setValue(value);
  
      this.editable = false;
    
    }
}
