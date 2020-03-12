import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../interfaces/interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlServicios = environment.URL_SERVICES;
  notificacionActuailizacion = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get(`${this.urlServicios}/product`);
  }

  getCategories() {
    return this.http.get(`${this.urlServicios}/product/category`);
  }

  addProduct(product: Product) {
    this.notificacionActuailizacion.next();
    return this.http.post(`${this.urlServicios}/product`, product);
  }

  deleteProduct(id: string) {
    this.notificacionActuailizacion.next();
    return this.http.delete(`${this.urlServicios}/product/${id}`);
  }
  modifyProduct(id: string, product: Product) {
    this.notificacionActuailizacion.next();
    return this.http.put(`${this.urlServicios}/product/${id}`, product);
  }


  modifyImage(archivo: File, id: string) {
    console.log(archivo);

    return new Promise((resolve, reject) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('img', archivo, archivo.name);

      xhr.onreadystatechange = () => {

        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo la subida');
            reject(xhr.response);
          }

        }
      };

      const url = `${this.urlServicios}/product/img/${id}`;

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
  }
}
