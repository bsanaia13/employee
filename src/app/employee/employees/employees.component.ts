import { Component, OnInit, TemplateRef } from '@angular/core';
import {EmployeeService} from '../employee.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CountryService} from '../add-employee/country.service';
import {ValidateIdNumber, ValidateMobile, ValidateName} from '../shared/validators/employee.validator';
import {FormatDatePipe} from '../shared/pipes/format-date.pipe';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [FormatDatePipe]
})
export class EmployeesComponent implements OnInit {
  modalRef: BsModalRef;
  employees: any[] = [];
  countries: any;
  employeeForm: FormGroup;
  birthDay: string;
  id: string;
  callCode: string;
  minDate: Date;
  maxDate: Date;

  constructor(private employeeService: EmployeeService,
              private modalService: BsModalService,
              private country: CountryService,
              private formatDate: FormatDatePipe
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 40000);
    this.maxDate.setDate(this.maxDate.getDate());
  }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      name: new FormControl(null, [Validators.required, ValidateName]),
      lastName: new FormControl(null, [Validators.required, ValidateName]),
      idNumber: new FormControl(null, [Validators.required, ValidateIdNumber]),
      birthDay: new FormControl(null, [Validators.required]),
      nationality: new FormControl(null, [Validators.required]),
      salary: new FormControl(null, [Validators.min(0.01)]),
      currency: new FormControl(null),
      mobile: new FormControl(null, [ValidateMobile])
    });
    this.employeeService.getEmployees().subscribe((resp: any) => {
      this.employees = resp.reverse();
    });
    this.country.getCountries().subscribe((resp: any) => {
      this.countries = resp;
    });
  }

  edit(template: TemplateRef<any>, id: string) {

    const employee = this.employees.find(e => id === e.id);
    this.id = id;
    this.employeeForm.get('name').setValue(employee.name);
    this.employeeForm.get('lastName').setValue(employee.lastname);
    this.employeeForm.get('idNumber').setValue(employee.idnumber);
    this.employeeForm.get('birthDay').setValue(employee.birthday);
    this.employeeForm.get('nationality').setValue(employee.nationality);
    this.employeeForm.get('salary').setValue(employee.salary);
    this.employeeForm.get('currency').setValue(employee.currency);
    employee.mobile !== 'null' ? this.employeeForm.get('mobile').setValue(employee.mobile) : this.employeeForm.get('mobile').setValue('');
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  confirm(): void {
    if (this.employeeForm.get('mobile').value === this.callCode) {
      this.employeeForm.get('mobile').setValue(null);
    }
    // edit employee in database
    this.employeeService.editEmployee(this.employeeForm.value, this.id).subscribe((resp: any) => {
      const newEmployee = this.employees.find(e => e.id === resp[0].id);
      const index = this.employees.indexOf(newEmployee);
      this.employees[index] = resp[0];
    });
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  countryChanged() {
    const callingCode = this.countries.find(c => c.name === this.employeeForm.get('nationality').value).callingCodes[0];
    if (callingCode) {
      this.callCode = `+(${callingCode})`;
    }
    this.employeeForm.get('mobile').setValue(this.callCode);
  }

  onDateChange() {
    this.employeeForm.value.birthDay = this.formatDate.transform(this.employeeForm.get('birthDay').value);
  }
}
