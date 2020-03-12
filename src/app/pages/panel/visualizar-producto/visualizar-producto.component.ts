import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualizar-producto',
  templateUrl: './visualizar-producto.component.html',
  styleUrls: ['./visualizar-producto.component.scss']
})
export class VisualizarProductoComponent implements OnInit {

  products: [] = [];

  constructor(
    public productService: ProductService
  ) { }

  async ngOnInit() {
    await this.productService.getProducts()
    .pipe(
      catchError( (err: any) => {
        Swal.fire(
          'Error al obtener productos',
          'Ha ocurrido un error, verifique su conexión a internet',
          'error'
        );
        throw err;
      })
    )
    .subscribe((res: any) => {
      this.products = res.products;
      console.log(res);
    });
  }

}
