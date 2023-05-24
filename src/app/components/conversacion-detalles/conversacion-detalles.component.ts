import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conversacion } from 'src/app/interfaces/chat';
import { ConversacionServiceService } from 'src/app/services/conversacion-service.service';
import { DetalleServiceService } from 'src/app/services/detalle-service.service';

@Component({
  selector: 'app-conversacion-detalles',
  templateUrl: './conversacion-detalles.component.html',
  styleUrls: ['./conversacion-detalles.component.css']
})
export class ConversacionDetallesComponent {

  // objeto de tipo Conversacion
  public conversacion: Conversacion = {
  };

  // constructor
  constructor( private conversacionService: ConversacionServiceService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private detalleServiceService: DetalleServiceService
    ) {

  }

  // On-init
  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({id})=>{
      if (id) {
        this.conversacionService.getConversacionPorId(id).subscribe((res)=> {
          this.conversacion = res;
          
        });
      } else {
        this.router.navigateByUrl('conversacion');
      }
    });
  }

  // redirecciona al formulario editar o agregar
  navegar(navegarDetalles: boolean){
    
    if (!this.conversacion.id_conversacional) {/////
      return;
    }

    if (navegarDetalles) {
      this.router.navigateByUrl(`/detalles/${this.conversacion.id_conversacional}`);
    } else {
      this.router.navigateByUrl(`/conversacion/${this.conversacion.id_conversacional}`);
    }
  }

  // Regresa al componente conversaciones
  regresar(){
    this.router.navigateByUrl(`conversaciones`);
  }

  // borrar detalle por id 
  borrarDetalle(id?: number){
    if (!id) {
      return;
    }

    this.detalleServiceService.borrarDetalle(id).subscribe((res)=>{
       this.conversacion.detalles = this.conversacion.detalles?.filter(detalle => detalle.id_detalle !== id) ;
       
    })
  }


  // editar detalle por id
  editarDetalle(id?: number){

    if (!id) {
      return;
    }

    this.router.navigateByUrl(`detalles/edit/${id}`);
  }

}
