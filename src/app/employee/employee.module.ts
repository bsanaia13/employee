import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AddEmployeeComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    HttpClientModule
  ],
  exports: [
    AddEmployeeComponent,
    EmployeesComponent
  ]
})
export class EmployeeModule { }
