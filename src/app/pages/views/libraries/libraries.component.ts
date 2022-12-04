import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
import { LibsCategs } from 'src/app/helpers/enums/libraries-categories.enum';
import { ILibrary } from 'src/app/helpers/_interfaces/library';
import Swal from 'sweetalert2';
import { LibrariesService } from './libraries.service';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss']
})
export class LibrariesComponent implements OnInit {
  SITE_URL = `${environment.API_ROOT}/`;
  listOfLibraries: ILibrary[] = [];
  gradeId: string = "";

  get LibsCategs(): typeof LibsCategs {
    return LibsCategs
  }

  constructor(
    private _libraryService: LibrariesService,
    private _activedRoute: ActivatedRoute
  ) {
    this.gradeId = this._activedRoute.snapshot.params.gradeId;
  }

  ngOnInit(): void {
    this.getLibraries();
  }

  getLibraries() {
    this._libraryService.getLibrariesForAdmin(this.gradeId).subscribe(response => {
      console.log("listOfLibs", response);

      response.forEach(res=>{res.file=`${environment.API_ROOT}/${res.file}`})
      this.listOfLibraries = response;
    })
  }
  libraryId:string = "";
  deleteQuestion(libraryId: string) {
    this.libraryId = libraryId;
    Swal.fire({
      title: "انتبه",
      icon: "warning",
      text: "بعد الحذف لا يمكن استرجاع البيانات , هل تريد الحذف ؟",
      confirmButtonText: "حذف",
      confirmButtonColor: "#dc3545",
      cancelButtonText: "إالغاء",
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) this.deleteLibrary();
    })
  };

  deleteLibrary() {
    this._libraryService.deleteLibrary(this.libraryId).subscribe(response => {
      this.getLibraries();
    })
  }
}
