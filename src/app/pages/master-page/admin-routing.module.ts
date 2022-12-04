import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesGuard } from 'src/app/helpers/guards/roles.guard';
import { MasterPageComponent } from '../layouts/master-page/master-page.component';

import { GradesComponent } from '../views/grades/grades.component';
import { HomeComponent } from '../views/home/home.component';
import { AddLessonComponent } from '../views/lessons/add-lesson/add-lesson.component';
import { EditLessonComponent } from '../views/lessons/edit-lesson/edit-lesson.component';
import { LessonsComponent } from '../views/lessons/lessons.component';
import { MessagesComponent } from '../views/messages/messages.component';
import { NewMessageComponent } from '../views/new-message/new-message.component';
import { ReportsComponent } from '../views/reports/reports.component';
import { EditUserRoleComponent } from '../views/roles/edit-user-role/edit-user-role.component';
import { RolesComponent } from '../views/roles/roles.component';
import { SectionsComponent } from '../views/sections/sections.component';
import { AddSemesterComponent } from '../views/semesters/add-semester/add-semester.component';
import { EditSemesterComponent } from '../views/semesters/edit-semester/edit-semester.component';
import { SemestersComponent } from '../views/semesters/semesters.component';
import { StagesComponent } from '../views/stages/stages.component';
import { EditStudenProfile } from '../views/students/modals/edit-data/edit-data.component';
import { StudentsComponent } from '../views/students/students.component';
import { SubjectsComponent } from '../views/subjects/subjects.component';
import { TeacherAmmountingComponent } from '../views/teacher-ammounting/teacher-ammounting.component';
import { TeachersComponent } from '../views/teachers/teachers.component';
import { AddUnitComponent } from '../views/units/add-unit/add-unit.component';
import { EditUnitComponent } from '../views/units/edit-unit/edit-unit.component';
import { UnitsComponent } from '../views/units/units.component';

import { RolesEnum } from "../../helpers/enums/roles-enum";
import { LibrariesComponent } from '../views/libraries/libraries.component';
import { CreateLibraryComponent } from '../views/libraries/create-library/create-library.component';
import { AdvertismentComponent } from '../views/advertisment/advertisment.component';
import { CreateAdvertisementComponent } from '../views/advertisment/create-advertisement/create-advertisement.component';
import { SocialLinksComponent } from '../views/social-links/social-links.component';
import { LessonQuestionComponent } from '../views/lesson-question/lesson-question.component';
import { CreateQuestionComponent } from '../views/lesson-question/create-question/create-question.component';
import { AboutUsComponent } from '../views/about-us/about-us.component';
import { QuestionBankComponent } from '../views/question-bank/question-bank.component';
import { AddQuestionBankComponent } from '../views/question-bank/add-question-bank/add-question-bank.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: MasterPageComponent,
    children: [

      { path: 'home', component: HomeComponent, data: { page: RolesEnum.SUPER_ADMIN } },

      {
        path: "advertisement",
        children: [
          { path: "", component: AdvertismentComponent },
          { path: "create", component: CreateAdvertisementComponent }
        ]
      },

      { path: 'section', component: SectionsComponent, data: { page: RolesEnum.SUPER_ADMIN } },

      {
        path: "social-links",
        component: SocialLinksComponent
      },


      { path: 'stages', component: StagesComponent, data: { page: RolesEnum.SUPER_ADMIN }, canActivate: [RolesGuard] },
      {
        path: 'grades',
        data: { page: "Grades" },
        canActivate: [RolesGuard],
        children: [
          { path: "", component: GradesComponent },
          {
            path: ":gradeId/libraries",
            children: [
              { path: "", component: LibrariesComponent },
              { path: "create", component: CreateLibraryComponent }
            ]

          }
        ]
      },
      {

        path: 'subjects',

        data: { page: ["Teacher","Subjects"] },
        canActivate: [RolesGuard],
        children: [
          {
            path: "",
            component: SubjectsComponent,
          },
          {
            path:":subjectId/questions-bank",
            children:
            [
              {path:"",component:QuestionBankComponent},
              {path:"create",component:AddQuestionBankComponent},
              {path:"create/:id",component: AddQuestionBankComponent}
            ]
          },
          {
            path: ":subjectId/units",
            children: [
              { path: "", component: UnitsComponent },
              { path: "add-unit", component: AddUnitComponent },
              { path: "edit-unit/:unitId", component: EditUnitComponent },
              {
                path: ":unitId/lessons",
                children: [
                  { path: "", component: LessonsComponent },
                  { path: "add-lesson", component: AddLessonComponent },
                  { path: "edit-lesson/:lessonId", component: EditLessonComponent },
                  {
                    path: ":lessonId/lesson-question",
                    children: [
                      { path: "", component: LessonQuestionComponent },
                      { path: "create", component: CreateQuestionComponent },
                    ]
                  }
                ]
              }
            ]
          },
        ]
      },
      { path: 'teachers', component: TeachersComponent, data: { page: RolesEnum.TEACHERS }, canActivate: [RolesGuard] },
      {
        path: 'students',
        data: { page: RolesEnum.STUDENTS },
        canActivate: [RolesGuard],

        children: [
          { path: "", component: StudentsComponent, },
          { path: 'edit-student/:studentId', component: EditStudenProfile }
        ]

      },

      {
        path: "semesters",
        data: { page: RolesEnum.SUPER_ADMIN },
        children: [
          { path: "", component: SemestersComponent },
          { path: "add-semester", component: AddSemesterComponent },
          { path: "edit-semester/:semesterId", component: EditSemesterComponent },
        ]
      },


      { path: 'messages', component: MessagesComponent, data: { page: RolesEnum.TECH_SUPPORT }, canActivate: [RolesGuard] },
      { path: 'aboutus', component: AboutUsComponent, data: { page: RolesEnum.SUPER_ADMIN }, canActivate: [RolesGuard] },
      { path: 'messages/:studentId', component: MessagesComponent, data: { page: RolesEnum.TECH_SUPPORT }, canActivate: [RolesGuard] },
      { path: 'reports', component: ReportsComponent, data: { page: RolesEnum.REPORTS }, canActivate: [RolesGuard] },
      { path: 'teacherAmmounting', component: TeacherAmmountingComponent, data: { page: RolesEnum.SUPER_ADMIN }, canActivate: [RolesGuard] },
      // { path: 'new-messages', component: NewMessageComponent },
      { path: 'roles', component: RolesComponent, data: { page: RolesEnum.SUPER_ADMIN }, canActivate: [RolesGuard] },
      { path: 'roles/edit-role/:userId', component: EditUserRoleComponent, data: { page: RolesEnum.SUPER_ADMIN }, canActivate: [RolesGuard] },


    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
