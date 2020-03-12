import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.scss']
})
export class EliminarProductoComponent implements OnInit {

  products = [];
  idRemove = '';

  constructor(
    private productService: ProductService
  ) { }

  async ngOnInit() {
    await this.productService.getProducts()
      .pipe(
        catchError((err: any) => {
          throw err;
        })
      )
      .subscribe((res: any) => {
        this.products = res.products;
      });
    await this.productService.notificacionActuailizacion.subscribe(async () => {
      await this.productService.getProducts()
      .pipe(
        catchError((err: any) => {
          throw err;
        })
      )
      .subscribe((res: any) => {
        this.products = res.products;
      });
    });
  }

  remove() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.value) {
        // Elminar
        this.productService.deleteProduct(this.idRemove)
          .pipe(
            catchError((err: any) => {
              Swal.fire(
                'Error al eliminar',
                'Ha ocurrido un error, por favor intente de nuevo',
                'error'
              );
              throw err;
            })
          )
          .subscribe((res: any) => {
            Swal.fire(
              'Producto eliminado',
              'El producto se eliminó con éxito',
              'success'
            );
          });
      }
    });
  }

}
