import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  servidor = 'http://localhost:33068';
  constructor(private http: HttpClient) {}

  getEmpleados() {
    return this.http.get(`${this.servidor}/employees`);
  }

  postEmpleado(empleado) {
    return this.http.post(`${this.servidor}/employee`, empleado);
  }

  deleteEmpleado(id_employee) {
    return this.http.delete(`${this.servidor}/deleteEmp/${id_employee}`);
  }
}
