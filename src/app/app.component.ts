import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestService } from './services/rest.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  empleados: [];
  constructor(private restService: RestService) {
    this.restService.getEmpleados().subscribe((data: any) => {
      this.empleados = data.data;
      console.log(this.empleados);
    });
  }
  empleado = {
    id_employee: '',
    fullname: '',
    funcion: '',
    id_boss: '',
  };

  guardar(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      title: 'Espere',
      icon: 'info',
      text: 'Guardando información',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    peticion = this.restService.postEmpleado(this.empleado);

    peticion.subscribe((resp) => {
      console.log(peticion);
      Swal.fire({
        title: 'Se Registro Correctamente',
        icon: 'success',
        text: 'Se actualizo Correctamente',
      });
      window.location.reload();
    });
  }

  borrar(id_employee) {
    let peticion: Observable<any>;

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        peticion = this.restService.deleteEmpleado(id_employee);
        peticion.subscribe((resp) => {
          console.log(peticion);
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        });
        window.location.reload();
      }
    });
  }
  refresh(): void {
    window.location.reload();
  }
}
