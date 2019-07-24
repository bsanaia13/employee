import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeesComponent } from './employees/employees.component';



@NgModule({
  declarations: [
    AddEmployeeComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EmployeeModule { }
