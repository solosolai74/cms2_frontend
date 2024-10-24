import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import Swal from 'sweetalert2';
import { ExamDetailsService } from '../../../../services/exam-details.service';
import { CommonService } from '../../../../services/common.service';


@Component({
  selector: 'app-view-exam-details',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './view-exam-details.component.html',
  styleUrl: './view-exam-details.component.scss'
})
export class ViewExamDetailsComponent {

  examDetails: any[] = []




  constructor(private readonly router: Router, private readonly examDetailsService: ExamDetailsService, private readonly common: CommonService,) { }

  ngOnInit() {

    this.viewExamDetailAPI()

  }

  viewExamDetailAPI() {
    this.examDetailsService.viewExamDetails().subscribe((res) => {

      if (res.api_status === true) {
        // this.resetSearchForm()

        this.examDetails = res.data

      } else {
        Swal.fire({
          text: `${res.message}`,
          icon: 'error',
        });
      }
    },
      (error) => {
        this.common.apiErrorHandler(error);
      }
    );
  }

  editExamDetails(data: any) {
    localStorage.setItem('edit', JSON.stringify(data));

    this.router.navigate(['/exam/editExam'])


  }

  deleteExamDetails(data: any) {

    Swal.fire({
      icon: 'question',
      title: 'Are You Sure Want To Delete The Exam?',
      // text: file.name,
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {

        // delete here
        const params = { id: data.id }


        this.deleteExamDetailAPI(params)




      } else if (result.isDenied) {
        Swal.fire('Deleting Exam Cancelled', '', 'warning');
      }
    });

  }

  // showTable : boolean = true
  deleteExamDetailAPI(data: any) {
    // this.showTable = false
    this.examDetailsService.deleteExamDetails(data).subscribe((res) => {
      // this.showTable = true

      if (res.api_status === true) {
        

        this.examDetails = this.examDetails.filter(item => {
          return item.id != data.id
        })


        Swal.fire({
          text: `${res.message}`,
          icon: 'success',
        });
      } else {
        Swal.fire({
          text: `${res.message}`,
          icon: 'error',
        });
      }
    },
      (error) => {
        // this.showTable = true

        this.common.apiErrorHandler(error);
      }
    );
  }
}
