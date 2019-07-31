export class EmployeeModel {
  constructor(public name: string,
              public lastName: string,
              public idNumber: string,
              public birthDay: string,
              public nationality: string,
              public salary: string,
              public currency: string,
              public mobile: string,
              public id ?: string
  ) {}
}
