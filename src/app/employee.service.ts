import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import{HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerUrl = environment.aptBaseUrl;

  constructor(private http: HttpClient) { }

   getEmployeesList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}`);
  }

  createEmployee(employee: Employee): Observable<Object>{
    return this.http.post(`${this.apiServerUrl}`, employee);

  }

  getEmployeeById(id: number): Observable<Employee> {
   return this.http.get<Employee>(`${this.apiServerUrl}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object>{
    return this.http.put(`${this.apiServerUrl}/${id}`, employee);
  }


  deleteEmployee(id: number): Observable<Object> {
    return this.http.delete(`${this.apiServerUrl}/${id}`);
  }


}
