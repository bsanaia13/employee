import { Component, OnInit } from '@angular/core';
import {EmployeeModel} from '../employee.model';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: EmployeeModel[] = [];

  constructor(private employee: EmployeeService) { }

  ngOnInit() {
    this.employee.getEmployees().subscribe((resp: any) => {
      console.log(resp);
    });
  }
}
