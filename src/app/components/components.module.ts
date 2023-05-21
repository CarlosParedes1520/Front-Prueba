import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { DetalleComponent } from './detalle/detalle.component';
import { ConversacionComponent } from './conversacion/conversacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConversacionesComponent } from './conversaciones/conversaciones.component';
import { ConversacionDetallesComponent } from './conversacion-detalles/conversacion-detalles.component';

@NgModule({
  declarations: [
    DetalleComponent,
    ConversacionComponent,
    ConversacionesComponent,
    ConversacionDetallesComponent
    
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ConversacionComponent, 
    DetalleComponent
  ]
})
export class ComponentsModule { }
