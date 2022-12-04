import { ISubject } from './subject';

export interface ITeachersResponse {
    teachers:  ITeacher[]
    rowCount: number
}

export interface ITeacher {
    teacherId: String
    identityId: String
    name: String
    mobile: String
    email: String
    status: Boolean
    subjects?: Array<ISubject>
}

export interface ITeacherProfile {
    name: String
    mobile: String
    email: String
}

export interface IUpdateTeacherData {
    teacherId: String
    name: String
    mobile: String
    email: String
}






export interface ITeacherSubjects {
    subjects: Array<ISubject>
}

export interface IUpdateTeacherSubjects {
    teacherId: String
    subjects: Array<IUpdateSubjectPermession>
    updatedPermessions:Array<IUpdateSubjectPermession>
}
export interface IUpdateSubjectPermession
{
  subjectId:string,
  permessions:Array<any>
}
