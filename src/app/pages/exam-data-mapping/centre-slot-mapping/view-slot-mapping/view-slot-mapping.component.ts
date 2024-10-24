import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { EditSlotMappingComponent } from './edit-slot-mapping/edit-slot-mapping.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-slot-mapping',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EditSlotMappingComponent],
  templateUrl: './view-slot-mapping.component.html',
  styleUrl: './view-slot-mapping.component.scss'
})
export class ViewSlotMappingComponent {


  memberDetails: any[] = [
    {
      examCentre: 1,
      examSlot: "r1",
      paperType: "m1",
      TotalCount: 100,

    },
    {
      examCentre: 2,
      examSlot: "r2",
      paperType: "m2",
      TotalCount: 200,

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
  title: 'Are You Sure Want To Delete The Slot?',
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
    Swal.fire('Deleting Slot Cancelled', '', 'warning');
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