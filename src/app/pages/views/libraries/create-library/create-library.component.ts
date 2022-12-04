import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibsCategs } from 'src/app/helpers/enums/libraries-categories.enum';
import { ISemester } from 'src/app/helpers/_interfaces/semesters';
import { SemesterService } from '../../semesters/service/semester.service';
import { LibrariesService } from '../libraries.service';

@Component({
  selector: 'app-create-library',
  templateUrl: './create-library.component.html',
  styleUrls: ['./create-library.component.scss']
})
export class CreateLibraryComponent implements OnInit {

  createLibraryForm!: FormGroup;
  gradeId: string = "";
  constructor(
    private _formBuilder: FormBuilder,
    private _activedRoute: ActivatedRoute,
    private _libraryService: LibrariesService,
    private _semesterService: SemesterService,
    private _router: Router
  ) {
    this.createLibraryForm = this._formBuilder.group({
      gradeId: ["", Validators.required],
      SemesterId: [null, Validators.required],
      CategoryCode: [null, Validators.required],
      Name: ["", Validators.required],
      FileImage: ["", Validators.required],
      File: ["", Validators.required],
      Index: [0],
    });

    let gradeId = this._activedRoute.snapshot.params.gradeId;
    this.gradeId = gradeId;
    this.createLibraryForm.patchValue({ gradeId })
  }
previewImage:string;
viewImage()
{
window.open(window.URL.createObjectURL(this.imageBlob));
}
  setImagePreview()
  {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.previewImage = event.target.result;
  }
  reader.readAsDataURL(this.imageBlob);

  }
   imageBlob:File;

  imageName: string = "";
  setFileImage(e) {
    if (!e.target.files) return;
     this.imageBlob = e.target.files[0];
    this.imageName = this.imageBlob.name;
    this.setImagePreview();
//let blob = new Blob([image.webkitRelativePath],{type:image.type});



    this.createLibraryForm.get("FileImage").setValue(this.imageBlob);
  }

  removeImage() {
    this.createLibraryForm.get("FileImage").setValue([]);
    this.imageName = "";
   // this.imageBlob=new File();
  }
  previewFile:string;
  viewFile()
  {
  window.open(window.URL.createObjectURL(this.fileBlob));
  }
fileBlob:File;

setFilePreview()
  {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.previewFile = event.target.result;
  }
  reader.readAsDataURL(this.imageBlob);

  }
  fileName: string = "";
  setFile(e) {
    if (!e.target.files) return;
     this.fileBlob = e.target.files[0];
    this.fileName = this.fileBlob.name;

    this.createLibraryForm.get("File").setValue(this.fileBlob);
  }
  removeFile() {
    this.createLibraryForm.get("File").setValue([]);
    this.fileName = "";
  }


  ngOnInit(): void {
    this.getSemesters();
  }

  get LibsCategs(): typeof LibsCategs {
    return LibsCategs
  }



  mapDataToForm() {
    let fd = new FormData();

    fd.append("gradeId", this.createLibraryForm.get("gradeId").value);
    fd.append("SemesterId", this.createLibraryForm.get("SemesterId").value);
    fd.append("CategoryCode", this.createLibraryForm.get("CategoryCode").value);
    fd.append("Name", this.createLibraryForm.get("Name").value);
    fd.append("FileImage", this.createLibraryForm.get("FileImage").value);
    fd.append("File", this.createLibraryForm.get("File").value);
    fd.append("Index", this.createLibraryForm.get("Index").value);

    return fd;
  }

  listOfSemsters: ISemester[] = [];
  getSemesters() {
    console.log('Get Semsters')
    this._semesterService.getSemesters().subscribe(response => {
      this.listOfSemsters = response;
    })
  }


  isSubmiting: boolean = false;
  submit() {

    console.log(this.createLibraryForm.value)

    this.isSubmiting = true;
    this._libraryService.addLibrary(this.mapDataToForm()).subscribe(response => {
      this.isSubmiting = false;
      this._router.navigate([`/Admin/dashboard/grades/${this.gradeId}/libraries`])
    })
  }
}
