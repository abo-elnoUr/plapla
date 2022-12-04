import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../../API/reports.service';
import { environment as env } from "@env/environment";
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportsComponent } from '../../reports.component';

declare var require: any
const FileSaver = require('file-saver');
@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit {

  @Input() modal;
  @Input() requestId;
  @ViewChild('SuccessSwal') private successSwal: SwalComponent

  env = env;

  RequestDetails: RequestDetails;

  constructor(private ReportsServices: ReportsService, private modalService: NgbModal, private reportsComponent : ReportsComponent) { }

  ngOnInit(): void {
    this.getRequestDetails(this.requestId)

  }


  getRequestDetails(requestId) {
    this.ReportsServices.getReportDetails(requestId).subscribe(res => {
      this.RequestDetails = res;
      console.log(res)
    })
  }


  DownloadAttachment(filePath) {

    console.log(filePath)

    // alert("Downloaded")

    const fullPath = `${env.API_ROOT}/${filePath}`
    console.log(fullPath)
    let FileName = fullPath.split(/\\/)[fullPath.lastIndexOf('/')];

    console.log(FileName)

    FileSaver.saveAs(fullPath, FileName);
  }


  changeImageExtention(filename) {
    this.ReportsServices.changeImageExtention(filename).subscribe(res => {
      console.log(res)
    })
  }

  deleteAnswerFromRequest(id) {
    this.ReportsServices.deleteAnswerFromRequest(id).subscribe(res => {
      this.modalService.dismissAll()
      this.successSwal.fire()
      this.reportsComponent.getRequestsReport()
    })
  }

}


export interface RequestDetails {
  "request": {
    "requestId": String,
    "requestNo": Number,
    "description": String,
    "date": String,
    "replied": Boolean,
    "subjectId": String,
    "subjectName": String,
    "studentId": String,
    "teacherId": String,
    "stageId": String,
    "stageName": String,
    "gradeId": String,
    "gradeName": String,
    "sectionName" : String,
    "attachments": [
      {
        "file": Blob
      }
    ]
  },
  "answer": {
    "answerId": String,
    "description": String,
    "date": String,
    "teacherId": String,
    "studentId": String,
    "subjectId": String,
    "subjectName": String,
    "requestId": String,
    "stageId": String,
    "stageName": String,
    "gradeId": String,
    "gradeName": String,
    attachments: [
      {
        attachmentId: String,
        answerId: String,
        file: String,
        type: string
      }
    ]
  }
}
