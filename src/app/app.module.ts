import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AgregarProductoComponent } from './pages/panel/agregar-producto/agregar-producto.component';
import { EliminarProductoComponent } from './pages/panel/eliminar-producto/eliminar-producto.component';
import { ModificarProductoComponent } from './pages/panel/modificar-producto/modificar-producto.component';
import { PanelComponent } from './pages/panel/panel.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { VisualizarProductoComponent } from './pages/panel/visualizar-producto/visualizar-producto.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import { ModificarImagenComponent } from './pages/panel/modificar-imagen/modificar-imagen.component';
import { ImagePipe } from './pipes/image.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AgregarProductoComponent,
    EliminarProductoComponent,
    ModificarProductoComponent,
    PanelComponent,
    VisualizarProductoComponent,
    NavbarComponent,
    ModificarImagenComponent,
    ImagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
