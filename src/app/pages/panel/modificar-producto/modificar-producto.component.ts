import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/interfaces';
import { ProductService } from '../../../services/product/product.service';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.scss']
})
export class ModificarProductoComponent implements OnInit {

  products: any = [];
  categories: any = [];

  productMod: Product = {
    title: '',
    price: 0,
    category: '',
    description: '',
    stock: 0
  };

  idMod = '';

  constructor(
    private productService: ProductService
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
    // Categorías
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
    // Suscribirme a cambios en productos
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

  fillProductFields() {
    const product = this.products.filter(productMod => {
      return productMod._id === this.idMod;
    })[0];
    console.log(product);
    this.productMod.title = product.title;
    this.productMod.price = product.price;
    this.productMod.stock = product.stock;
    this.productMod.description = product.description;
    this.productMod.category = product.category._id;
  }
  modifyProduct() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, modificar!'
    }).then((result) => {
      if (result.value) {
        // Elminar
        this.productService.modifyProduct(this.idMod, this.productMod)
          .pipe(
            catchError((err: any) => {
              Swal.fire(
                'Error al modificar',
                'Ha ocurrido un error, por favor intente de nuevo',
                'error'
              );
              throw err;
            })
          )
          .subscribe((res: any) => {
            Swal.fire(
              'Producto modificado',
              'El producto se modificó con éxito',
              'success'
            );
            this.idMod = '';
            this.productMod = {
              title: '',
              price: 0,
              category: '',
              description: '',
              stock: 0
            };
          });
      }
    });
  }
}
