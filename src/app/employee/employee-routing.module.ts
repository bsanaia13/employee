import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {EmployeesComponent} from './employees/employees.component';

const employeeRoutes: Routes = [
  {path: 'add-employee', component: AddEmployeeComponent},
  {path: 'employees', component: EmployeesComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(employeeRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
