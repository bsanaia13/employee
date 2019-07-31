import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import {FormatDatePipe} from './shared/pipes/format-date.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { UploadComponent } from './upload/upload.component';



@NgModule({
  declarations: [
    AddEmployeeComponent,
    EmployeesComponent,
    FormatDatePipe,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    AddEmployeeComponent,
    EmployeesComponent
  ]
})
export class EmployeeModule { }
