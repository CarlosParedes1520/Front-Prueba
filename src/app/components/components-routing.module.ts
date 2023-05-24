import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.component';
import { ConversacionComponent } from './conversacion/conversacion.component';
import { ConversacionesComponent } from './conversaciones/conversaciones.component';
import { ConversacionDetallesComponent } from './conversacion-detalles/conversacion-detalles.component';
import { ListaDetallesComponent } from './lista-detalles/lista-detalles.component';

const routes: Routes = [
  {
    path:'',
    children: [
      { path: 'conversacion_detalles/:id', component:  ConversacionDetallesComponent },
      { path: 'detalles/:id_con', component:  DetalleComponent },
      { path: 'detalles/edit/:id_det', component:  DetalleComponent },
      { path: 'detalles', component:  ListaDetallesComponent },
      { path: 'conversacion/:id', component: ConversacionComponent },
      { path: 'conversaciones', component: ConversacionesComponent },
      { path: '**', redirectTo: 'conversacion' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
