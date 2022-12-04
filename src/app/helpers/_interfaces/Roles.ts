export interface IAdmin {
  id: String
  userName: String
  email: String
}

export interface IRole {
  roleName: String
  selected: Boolean
}

export interface IAdminData {
  adminId: String,
  roles: Array<IRole>
}


export interface INewAdmin {
  userName: String
  phoneNumber: String
  email: String
  password: String
  confirmPassword: String
  sectionId: string
}
