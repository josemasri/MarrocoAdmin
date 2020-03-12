import { ModificarImagenComponent } from './pages/panel/modificar-imagen/modificar-imagen.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AgregarProductoComponent } from './pages/panel/agregar-producto/agregar-producto.component';
import { EliminarProductoComponent } from './pages/panel/eliminar-producto/eliminar-producto.component';
import { PanelComponent } from './pages/panel/panel.component';
import { ModificarProductoComponent } from './pages/panel/modificar-producto/modificar-producto.component';
import { VisualizarProductoComponent } from './pages/panel/visualizar-producto/visualizar-producto.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'panel', component: PanelComponent, children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: VisualizarProductoComponent },
      { path: 'add', component: AgregarProductoComponent },
      { path: 'remove', component: EliminarProductoComponent },
      { path: 'modify', component: ModificarProductoComponent },
      { path: 'modify-image', component: ModificarImagenComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
