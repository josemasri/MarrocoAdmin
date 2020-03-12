import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent implements OnInit {

  categories = [];

  product: Product = {
    title: '',
    price: 0,
    category: '',
    description: '',
    stock: 0
  };

  constructor(
    private productService: ProductService
  ) { }

  async ngOnInit() {
    await this.productService.getCategories()
      .pipe(
        catchError((err: any) => {
          Swal.fire(
            'Error al obtener categorias',
            'Ha ocurrido un error, verifique su conexión a internet',
            'error'
          );
          throw err;
        })
      )
      .subscribe((res: any) => {
        this.categories = res.categories;
        console.log(this.categories);
      });
  }

  addProduct() {
    if (
      this.product.title === '' ||
      this.product.description === '' ||
      this.product.price === 0 ||
      this.product.stock === 0 ||
      this.product.category === ''
    ) {
      Swal.fire(
        'Error al agregar productos',
        'Porfavor ingresa todos los datos',
        'error'
      );
      return;
    }
    this.productService.addProduct(this.product)
      .pipe(
        catchError((err: any) => {
          Swal.fire(
            'Error al agregar productos',
            'Ha ocurrido un error, el producto no se agrego',
            'error'
          );
          throw err;
        })
      )
      .subscribe((res: any) => {
        Swal.fire(
          'Producto agregado',
          'El producto se agregó con éxito',
          'success'
        );
        this.product = {
          title: '',
          price: 0,
          category: '',
          description: '',
          stock: 0
        };
      });
  }
}
