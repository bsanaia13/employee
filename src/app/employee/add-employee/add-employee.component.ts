import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { EmployeeModel } from '../employee.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: FormGroup;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.addEmployeeForm = new FormGroup({
      name: new FormControl(null),
      lastName: new FormControl(null)
    });
  }

  onAddEmployee() {
    const name = this.addEmployeeForm.get('name').value;
    const lastName = this.addEmployeeForm.get('lastName').value;
    this.employeeService.addEmployee(new EmployeeModel(name, lastName))
      .subscribe((resp: any) => {
      console.log(resp);
    });
  }
}
