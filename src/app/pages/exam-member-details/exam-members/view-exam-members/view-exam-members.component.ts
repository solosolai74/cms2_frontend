import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-exam-members',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './view-exam-members.component.html',
  styleUrl: './view-exam-members.component.scss'
})
export class ViewExamMembersComponent {




  memberDetails: any[] = [
    {
      memberName: "name",
      memberRole: "role1",
      mappedCenters: "001",
      emailId: "name1@example.com",
      contactNumber: "1234567890",
      alternateNumber: "0987654321",
      memberType: "type1"
    },
    {
      memberName: "name",
      memberRole: "role2",
      mappedCenters: "002",
      emailId: "name2@example.com",
      contactNumber: "2345678901",
      alternateNumber: "1987654321",
      memberType: "type2"
    },
    {
      memberName: "name",
      memberRole: "role3",
      mappedCenters: "003",
      emailId: "name3@example.com",
      contactNumber: "3456789012",
      alternateNumber: "2789654321",
      memberType: "type3"
    },
    {
      memberName: "name",
      memberRole: "role4",
      mappedCenters: "004",
      emailId: "name4@example.com",
      contactNumber: "4567890123",
      alternateNumber: "3567890123",
      memberType: "type4"
    }
  ];
  
  
  
  constructor (private readonly router: Router){}


    editExamDetails(data : any){
console.log("edit", data);
localStorage.setItem('edit', JSON.stringify(data));

this.router.navigate(['/examMembersDetails/editExamMembers'])


    }

    deleteExamDetails(data : any){
console.log("delete", data);

Swal.fire({
  icon: 'question',
  title: 'Are You Sure Want To Delete The Member?',
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
    Swal.fire('Deleting Member Cancelled', '', 'warning');
  }
});

    }
}
