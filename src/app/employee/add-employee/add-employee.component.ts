import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { EmployeeService } from '../employee.service';
import {CountryService} from './country.service';
import {ValidateName, ValidateIdNumber, ValidateMobile} from '../shared/validators/employee.validator';
import {FormatDatePipe} from '../shared/pipes/format-date.pipe';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  providers: [FormatDatePipe]
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: FormGroup;
  countries: any;
  callCode: string;
  countrySelected = null;
  minDate: Date;
  maxDate: Date;

  constructor(private employeeService: EmployeeService,
              private countryService: CountryService,
              private formatDate: FormatDatePipe
              ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 40000);
    this.maxDate.setDate(this.maxDate.getDate());
  }

  ngOnInit() {
    this.addEmployeeForm = new FormGroup({
      name: new FormControl(null, [Validators.required, ValidateName]),
      lastName: new FormControl(null, [Validators.required, ValidateName]),
      idNumber: new FormControl(null, [Validators.required, ValidateIdNumber]),
      birthDay: new FormControl(null, [Validators.required]),
      nationality: new FormControl(null, [Validators.required]),
      salary: new FormControl(null, [Validators.min(0.01)]),
      currency: new FormControl(null),
      mobile: new FormControl(null, [ValidateMobile])
    });
    this.countryService.getCountries().subscribe((resp: any) => {
      this.countries = resp;
    });
  }

  onAddEmployee() {
    // if user inputs mobile we add call code to it
    if (this.addEmployeeForm.get('mobile').value) {
      this.addEmployeeForm.get('mobile').setValue(`${this.callCode} ${this.addEmployeeForm.get('mobile').value}`);
    } else {
      this.addEmployeeForm.get('mobile').setValue(null);
    }
    // add date as dd/mm/yyyy
    this.addEmployeeForm.get('birthDay').setValue(this.formatDate.transform(this.addEmployeeForm.get('birthDay').value));
    this.employeeService.addEmployee(this.addEmployeeForm.value)
      .subscribe((resp: any) => {
        console.log(resp);
      });
    this.addEmployeeForm.reset();
  }

  countryChanged() {
    this.countrySelected = 1;
    const callingCode = this.addEmployeeForm.get('nationality').value.callingCodes[0];
    if (callingCode) {
      this.callCode = `+(${callingCode})`;
    } else {
      this.callCode = '';
    }
  }
}
