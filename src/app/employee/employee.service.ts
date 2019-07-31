import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EmployeeModel} from './employee.model';


@Injectable({providedIn: 'root'})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  addEmployee(employee: EmployeeModel) {
    return this.http.post('http://127.0.0.1:5000/add', employee);
  }

  getEmployees() {
    return this.http.get('http://127.0.0.1:5000/get');
  }

  editEmployee(employee: any, id: string) {
    employee.id = id;
    return this.http.post('http://127.0.0.1:5000/edit', employee);
  }
}
