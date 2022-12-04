import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { IAdmin, IAdminData, INewAdmin, IRole } from 'src/app/helpers/_interfaces/Roles';
import { RolesService } from './roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  @ViewChild('SuccessSwal') private successSwal: SwalComponent;
  @ViewChild('ConfirmDelete') private ConfirmDelete: SwalComponent;



  editingAdminPasswordID: String = ""
  editingAdminPasswordName: String = ""
  newAdminPassword: String = ""

  deletingAdminName: String = ""
  deletingAdminId: String = ""

  closeResult = '';

  listOfAdmins: Array<IAdmin> = []

  adminEditingRoles: Array<IRole> = []

  adminEditingID: String;


  newAdminData: INewAdmin = {
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    sectionId: null
  }

  constructor(private HttpMethods: RolesService, private modalService: NgbModal) { }
  SUPPER_ADMIN : boolean = false;
  ngOnInit(): void {
    this.getAllAdmins();
    this.getAllSectinos();
    this.SUPPER_ADMIN = this.HttpMethods.isSupperAdmin();

  }

  getAllAdmins() {
    this.HttpMethods.getAllAdmins().subscribe(res => {
      this.listOfAdmins = res
    })
  }


  getAdminById(adminId) {
    this.adminEditingID = adminId;
    this.HttpMethods.getAdminById(adminId).subscribe(res => {
      this.adminEditingRoles = res
      console.log("ADMIN ROLES", res)
    })
  }


  createAdmin() {

    console.log("Create Admin Data", this.newAdminData)

    this.HttpMethods.createAdmin(this.newAdminData).subscribe(res => {
      this.getAllAdmins();
      this.successSwal.fire();
      this.modalService.dismissAll()

    })
  }


  editAdminRoles() {
    let adminNewData: IAdminData = {
      adminId: this.adminEditingID,
      roles: this.adminEditingRoles
    }
    this.HttpMethods.editAdminRoles(adminNewData).subscribe(res => {
      this.successSwal.fire()
      this.modalService.dismissAll()
      this.getAllAdmins();


    })
  }


  ConfirmDeleteAdmin(id, name) {
    this.deletingAdminId = id;
    this.deletingAdminName = name;

    setTimeout(() => this.ConfirmDelete.fire(), 0)



  }


  deleteAdmin() {
    this.HttpMethods.deleteAdmin(this.deletingAdminId).subscribe(res => {
      this.successSwal.fire()
      this.getAllAdmins();
    })
  }



  resetAdminPassword() {
    console.log({
      id: this.editingAdminPasswordID,
      name: this.editingAdminPasswordName,
      password: this.newAdminPassword,
    })
    this.HttpMethods.resetAdminPassword(this.editingAdminPasswordID, this.newAdminPassword).subscribe(res => {

      this.successSwal.fire()
      this.getAllAdmins();

    })
  }


  openAddModal(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

  openResetPasswordModal(content, id, name) {

    this.editingAdminPasswordID = id;
    this.editingAdminPasswordName = name;


    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }



  open(content, adminId) {

    this.getAdminById(adminId)

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  listOfSections: any = []
  getAllSectinos() {
    this.HttpMethods.getAllSections().subscribe(response => {
      this.listOfSections = response;
    })

  }


}
