import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees!: Employee[];

  constructor(private employeeService: EmployeeService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getEmployees();

  }
  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    })
  }

  updateEmployee(id: any) {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: any) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      console.log(data);
      this.getEmployees()
    })
  }
  employeeDetails(id: any) {
    this.router.navigate(['employee-details', id])

  }

 public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
      this.employees = results


      if (results.length === 0 || !key) {
        this.getEmployees();
      }
    }
  }

  isAuthenticated() {
    return this.authService.isAuthenticatied;
  }

}
