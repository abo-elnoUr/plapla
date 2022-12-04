import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { MasterPageModule } from './pages/master-page/master-page.module';
import { MasterPageComponent } from './pages/layouts/master-page/master-page.component';
import { LoginComponent } from './auth/login/login.component';
import { httpInterceptorProviders } from './core/interceptors';
import { AuthService } from './auth/auth.service';
import { HeadersInterceptor } from './core/interceptors/headers-interceptor';
import { ErrorHandlerInterceptor } from './core/error-handler.interceptor';
import { RolesComponent } from './pages/views/roles/roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ResetPasswordComponent } from './pages/views/teachers/modals/reset-password/reset-password.component';
import { ReportsComponent } from './pages/views/reports/reports.component';
import { CreateStageComponent } from './pages/views/stages/modals/create-stage/create-stage.component';
import { EditStageComponent } from './pages/views/stages/modals/edit-stage/edit-stage.component';
import { CreateGradeComponent } from './pages/views/grades/modals/create-grade/create-grade.component';
import { EditGradeComponent } from './pages/views/grades/modals/edit-grade/edit-grade.component';
import { ReportDetailsComponent } from './pages/views/reports/modals/report-details/report-details.component';
import { TeacherAmmountingComponent } from './pages/views/teacher-ammounting/teacher-ammounting.component';
import { SectionsComponent } from './pages/views/sections/sections.component';
import { EditSectionComponent } from './pages/views/sections/edit-section/edit-section.component';
import { AddSectionComponent } from './pages/views/sections/add-section/add-section.component';
import { EditUserRoleComponent } from './pages/views/roles/edit-user-role/edit-user-role.component';
import { SemestersComponent } from './pages/views/semesters/semesters.component';
import { EditSemesterComponent } from './pages/views/semesters/edit-semester/edit-semester.component';
import { AddSemesterComponent } from './pages/views/semesters/add-semester/add-semester.component';
import { UnitsComponent } from './pages/views/units/units.component';
import { AddUnitComponent } from './pages/views/units/add-unit/add-unit.component';
import { EditUnitComponent } from './pages/views/units/edit-unit/edit-unit.component';
import { LessonsComponent } from './pages/views/lessons/lessons.component';
import { AddLessonComponent } from './pages/views/lessons/add-lesson/add-lesson.component';
import { SharedModule } from './shared/shared.module';
import { EditLessonComponent } from './pages/views/lessons/edit-lesson/edit-lesson.component';
import { LibrariesComponent } from './pages/views/libraries/libraries.component';
import { CreateLibraryComponent } from './pages/views/libraries/create-library/create-library.component';
import { AdvertismentComponent } from './pages/views/advertisment/advertisment.component';
import { CreateAdvertisementComponent } from './pages/views/advertisment/create-advertisement/create-advertisement.component';
import { SocialLinksComponent } from './pages/views/social-links/social-links.component';
import { LessonQuestionComponent } from './pages/views/lesson-question/lesson-question.component';
import { AnswerFormComponent } from './pages/views/lesson-question/answer-form/answer-form.component';
import { CreateQuestionComponent } from './pages/views/lesson-question/create-question/create-question.component';
import { QRCodeModule } from 'angularx-qrcode';
import { QuestionBankComponent } from './pages/views/question-bank/question-bank.component';
import { AddQuestionBankComponent } from './pages/views/question-bank/add-question-bank/add-question-bank.component';

registerLocaleData(en);



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditUserRoleComponent,
    SemestersComponent,
    EditSemesterComponent,
    AddSemesterComponent,
    UnitsComponent,
    AddUnitComponent,
    EditUnitComponent,
    LessonsComponent,
    AddLessonComponent,
    EditLessonComponent,
    LibrariesComponent,
    CreateLibraryComponent,
    AdvertismentComponent,
    CreateAdvertisementComponent,
    SocialLinksComponent,
    LessonQuestionComponent,
    AnswerFormComponent,
    CreateQuestionComponent,
    QuestionBankComponent,
    AddQuestionBankComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MasterPageModule,
    HttpClientModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    QRCodeModule,
  ],
  // providers: [
  //   httpInterceptorProviders
  // ],
  providers: [AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
