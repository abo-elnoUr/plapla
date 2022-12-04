import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { IGrade } from 'src/app/helpers/_interfaces/grade';
import { IStage } from 'src/app/helpers/_interfaces/stage';
import { IEditSubject, ISubject, ISubjectFilterResponse } from 'src/app/helpers/_interfaces/subject';
import { SubjectService } from './Api/api-http.service';

import { environment as env, environment } from "@env/environment";
import { ISection } from 'src/app/helpers/_interfaces/section';
import { SectionService } from '../sections/api/section.service';
import Swal from 'sweetalert2';
// import  from '@sweetalert2/ngx-sweetalert2'
import { FormBuilder, FormGroup } from '@angular/forms';
import { ESectionsID } from 'src/app/helpers/enums/sections-ids';
import { StateService } from 'src/app/helpers/services/state.service';
import { RolesEnum } from 'src/app/helpers/enums/roles-enum';
import { ICountryModel } from '../../../models/country.model';
import { CountryService } from '../../../shared/country.service';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';

interface MultipleSelect {
  // name: string;
  // id: string;
  isSelected: boolean;
}

const COUNTRY_ID = 'beb82ee6-47f0-4e80-ae10-e3d2e8115e03';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  RolesEnum = RolesEnum;

  SITE_URL = `${environment.API_ROOT}/`;

  @ViewChild('SuccessSwal') private successSwal: SwalComponent;

  setCurrentSubjectTitle(title: string) {
    this._stateService.setCurrentSubjectName(title);
  }

  get SectionID(): typeof ESectionsID {
    return ESectionsID;
  }

  subjectsData: ISubjectFilterResponse = {
    rowCount: 0,
    subjects: []
  }

  listOfSubjects: Array<ISubject>;
  listOfGrades: Array<IGrade>;
  listOfStages: Array<IStage>;
  listGradesByStageId: Array<IGrade>;
  countries: Array<ICountryModel> = [];

  listOfGradesByStageId: Array<IGrade> = [];

  stageId: String;
  stageIdAdded: string
  sectionId: string = ""
  gradeId: string = ""
  closeResult = '';
  subjectSection: any
  subjectBranch: any
  subjectMazhab: any

  SubjectSections: any[] = []
  SubjectBranches: any[] = []
  SubjectMzhbs: any[] = []

  SubjectSectionsEdit: any[] = []
  SubjectBranchesEdit: any[] = []
  SubjectMzhbsEdit: any[] = []

  deleteSubjectId = ""
  listOfSections: Array<ISection> = [];

  newSubject = {
    "subjectImage": "",
    "stageId": "",
    "gradeId": "",
    "subjectName": "",
    index: 0
  }


  editSubjectSnapShotData: ISubject = {
    tempSubjectId: "",
    subjectId: "",
    subjectName: "",
    stageId: "",
    stageName: "",
    gradeId: "",
    gradeName: "",
    sectionName: "",
    sectionId: "",
    isActive: false,
    subjectImage: '',
    index: 0,
    permessions: []
  }

  upDateSubject: IEditSubject = {
    subjectId: "",
    gradeId: "",
    stageId: "",
    subjectName: "",
    sectionId: "",
    isActive: false,
    subjectImage: '',
    index: 0

  }
  pagination = {
    "pageSize": 20,
    "pageNo": 1,
  }
  filterSubjectsForm: FormGroup;
  testForm: FormGroup;
  stageName = ''

  constructor(
    private HttpMethods: SubjectService,
    private modalService: NgbModal,
    private _sectionService: SectionService,
    private _formBuilder: FormBuilder,
    private _stateService: StateService,
  ) {
    this.filterSubjectsForm = this._formBuilder.group({

      "name": [""],
      "gradeId": [null],
      "sectionId": [null],
      "stageId": [null],
      "isActive": null,
    })

  }

  isLoading: boolean = false;

  // get stage id
  getStageId(event: any) {
    this.stageIdAdded = event.target.value
  }

  filtrationSubjects() {
    let filter = { ...this.filterSubjectsForm.value, ...this.pagination };
    let stageId = this.filterSubjectsForm.get("stageId").value;
    this.isLoading = true;
    this.HttpMethods.filtrationSubjects(filter).subscribe(response => {
      this.isLoading = false;
      this.subjectsData = response;
    })
  }

  ngOnInit(): void {
    document.title = `${env.webSiteName} | المواد`
    this.getAllStages();
    this.filtrationSubjects();
  }

  // Get All Subjects
  getAllSubjects() {
    this.HttpMethods.getListOfSubjects().subscribe(res => {
      let result: any = res;
      this.listOfSubjects = result
    })
  }

  // Get Stages
  getAllStages() {
    this.HttpMethods.getAllStages().subscribe(res => {
      let result: any = res;
      this.listOfStages = result
    })
  }

  // Get Grades By Stage Id
  getGradesByStageId(stageId: any) {
    this.HttpMethods.getGradesByStageId(stageId).subscribe(res => {
      let result: any = res;
      this.listOfGradesByStageId = result;
      this.listOfGrades = result;
      if (res[0].stageName == "الابتدائيه") {
        this.stageName = 'الابتدائيه'
        this.getSubjectSection()
      }
      if (res[0].stageName == "الاعداديه") {
        this.stageName = 'الاعداديه'
        this.getSubjectSection()
        this.getSubjectBranch()
      }
      if (res[0].stageName == "الثانويه") {
        this.stageName = 'الثانويه'
        this.getSubjectSection()
        this.getSubjectBranch()
        this.getSubjectMazhab()
      }

    })
  }

  // get all section
  getSubjectSection() {
    this.HttpMethods.getSubjectSection().subscribe({
      next: (res) => {
        this.subjectSection = res
      }
    })
  }

  // get all branches
  getSubjectBranch() {
    this.HttpMethods.getSubjectBranch().subscribe({
      next: (res) => {
        this.subjectBranch = res
      }
    })
  }

  // get all mazhab
  getSubjectMazhab() {
    this.HttpMethods.getSubjectMazhab().subscribe({
      next: (res) => {
        this.subjectMazhab = res
      }
    })
  }


  // Get Subject By Id
  getSubjectById(subjectId) {
    this.HttpMethods.getSubjectById(subjectId).subscribe(res => {
      let result: any = res;
      this.editSubjectSnapShotData = {
        tempSubjectId: result.tempSubjectId,
        subjectId: result.subjectId,
        subjectName: result.subjectName,
        gradeId: result.gradeId,
        gradeName: result.gradeName,
        stageId: result.stageId,
        stageName: result.stageName,
        sectionName: result.sectionName,
        sectionId: result.sectionId,
        isActive: result.isActive,
        subjectImage: res.subjectImage,
        index: result.index,
        permessions: []

      };
      this.getGradesByStageId(result.stageId)

      this.upDateSubject = {
        subjectId: result.subjectId,
        gradeId: result.gradeId,
        stageId: result.stageId,
        subjectName: result.subjectName,
        sectionId: result.sectionId,
        isActive: result.isActive,
        subjectImage: res.subjectImage,
        index: result.index
      }

    })
  }
  /**
   *
   *  {
    "sectionId": "dda9956b-ceae-4bcf-8880-121e496826ef",
    * @param gradeId
    "gradeId": "7489b01a-499a-41fd-be11-7c671dc900b3"
}
   */

  // Get Subjects By Grade Id
  getSubjectsByGradeId(gradeId) {
    this.gradeId = gradeId
    const filter = {
      gradeId: gradeId || null,
      sectionId: this.sectionId || null
    }

    this.HttpMethods.getSubjectsByGradeId(filter).subscribe(res => {
      let result: any = res;
      this.listOfSubjects = result
    })
  }

  selectStage(stageId, index) {
    this.newSubject.stageId = stageId
  }

  subjectImage: File;
  uploadFile(files) {
    this.subjectImage = files[0]
    this.newSubject.subjectImage = files[0]
    console.log(this.subjectImage);
  }

  previewFile() {
    window.open(window.URL.createObjectURL(this.subjectImage));
  }

  chooseSubjectSection(val: any) {
    const newVal = {"sectionId": val}
    this.SubjectSections.push(newVal)
  }

  chooseSubjectBranch(val: any) {
    const newVal = {"branchId": val}
    this.SubjectBranches.push(newVal)
  }

  chooseSubjectMazhab(val: any) {
    const newVal = {"mazhbId": val}
    this.SubjectMzhbs.push(newVal)
  }
  collectDataCreateSubject() {
    let fd = new FormData();
    fd.append("StageId", this.newSubject.stageId);
    fd.append("GradeId", this.newSubject.gradeId);
    fd.append("SubjectName", this.newSubject.subjectName);
    fd.append("SubjectImage", this.subjectImage);
    fd.append("index", `${this.newSubject.index}`);
    for (var key in this.reqAdd) {
      fd.append(key, this.reqAdd[key])
    }

    return fd;
  }

  reqAdd = {
    "SubjectSections": [],
    "SubjectBranches": [],
    "SubjectMzhbs": []
  }

  // Create Subject
  createSubject() {
    this.reqAdd.SubjectSections = this.SubjectSections
    this.reqAdd.SubjectBranches = this.SubjectBranches
    this.reqAdd.SubjectMzhbs = this.SubjectMzhbs

    this.collectDataCreateSubject()

    // this.HttpMethods.createSubject(this.collectDataCreateSubject()).subscribe(res => {
    //   this.upDateSubjectsTable()
    // })
  }

  // Edit Subject

  reqEdit = {
    "SubjectSections": [
      {"sectionId": ""}
    ],
    "SubjectBranches": [
      {"branchId": ""}
    ],
    "SubjectMzhbs": [
      {"mazhbId": ""}
    ]
  }
  editSubject() {
    this.reqEdit.SubjectSections = this.SubjectSections
    this.reqEdit.SubjectBranches = this.SubjectBranches
    this.reqEdit.SubjectMzhbs = this.SubjectMzhbs

    let fd = new FormData();
    fd.append("StageId", this.upDateSubject.stageId);
    fd.append("GradeId", this.upDateSubject.gradeId);
    fd.append("SubjectName", this.upDateSubject.subjectName);
    fd.append("SubjectId", this.upDateSubject.subjectId);
    fd.append("SubjectImage", this.subjectImage);
    fd.append("Index", `${this.upDateSubject.index}`);
    for (var key in this.reqEdit) {
      fd.append(key, this.reqEdit[key])
    }

    this.HttpMethods.editSubject(fd).subscribe(res => {
      this.upDateSubjectsTable()
    })
  }

  // Delete Subject
  deleteSubject() {
    this.HttpMethods.deleteSubject(this.deleteSubjectId).subscribe(res => {
      this.upDateSubjectsTable()
    })
  }

  upDateSubjectsTable() {
    this.modalService.dismissAll()
    this.successSwal.fire()
    this.filtrationSubjects();
  }

  getAllSections() {
    this._sectionService.getAllSections().subscribe(
      res => {
        this.listOfSections = res
      }
    )
  }


  openAddModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  open(content, subjectId) {
    // this.getAllGrades()
    this.getSubjectById(subjectId)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  toggleSubjectActivation(subjectId: string) {
    console.log(subjectId);

    this.HttpMethods.activation(subjectId).subscribe((response: any) => {
      Swal.fire(
        `عملية ناجحة`,
        ` تم ${response.statusFlag ? '' : 'الغاء'} التفعيل بنجاح `,
        `success`
      )
    })
  }


}
