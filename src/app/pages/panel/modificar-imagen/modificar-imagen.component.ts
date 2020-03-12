import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modificar-imagen',
  templateUrl: './modificar-imagen.component.html',
  styleUrls: ['./modificar-imagen.component.scss']
})
export class ModificarImagenComponent implements OnInit {

  products: any = [];
  idMod: string;


  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;


  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer
  ) { }

  async ngOnInit() {
    // Obtener Productos
    await this.productService.getProducts()
      .pipe(
        catchError((err: any) => {
          Swal.fire(
            'Error obtener productos',
            'Ha ocurrido un error, por favor intente de nuevo',
            'error'
          );
          throw err;
        })
      )
      .subscribe((res: any) => {
        this.products = res.products;
      });
  }



  seleccionImage(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }


  subirImagen() {

    this.productService.modifyImage(this.imagenSubir, this.idMod)
      .then(resp => {
        Swal.fire('Éxito', 'La imágen se subió con éxito', 'success');
      })
      .catch((err: any) => {
        Swal.fire('Error', 'Error al subir imágen', 'error');
      });

  }
}
