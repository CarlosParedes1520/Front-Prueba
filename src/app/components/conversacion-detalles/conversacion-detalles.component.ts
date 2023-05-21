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

  public conversacion: Conversacion = {

  };


  constructor( private conversacionService: ConversacionServiceService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private detalleServiceService: DetalleServiceService
    ) {

  }



  ngOnInit(): void {
   
    this.activatedRouter.params.subscribe(({id})=>{
      console.log(id);
      if (id) {
        this.conversacionService.getConversacionPorId(id).subscribe((res)=> {
          console.log(res);
          this.conversacion = res;
          
        });
      } else {
        this.router.navigateByUrl('conversacion');
      }
    });
  }

  navegar(navegarDetalles: boolean){
    console.log(this.conversacion.id_conversacional);
    
    if (!this.conversacion.id_conversacional) {
      return;
    }

    if (navegarDetalles) {
      this.router.navigateByUrl(`/detalles/${this.conversacion.id_conversacional}`);
    } else {
      this.router.navigateByUrl(`/conversacion/${this.conversacion.id_conversacional}`);
    }

    
  }

  regresar(){
    this.router.navigateByUrl(`conversaciones`);
  }


  borrarDetalle(id?: number){

    if (!id) {
      return;
    }

    this.detalleServiceService.borrarDetalle(id).subscribe((res)=>{
       this.conversacion.detalles = this.conversacion.detalles?.filter(detalle => detalle.id_detalle !== id) ;
    })
  }


  
  editarDetalle(id?: number){

    if (!id) {
      return;
    }

    console.log(id);
    
    // this.detalleServiceService.actualizarDetalle()
    this.router.navigateByUrl(`detalles/edit/${id}`);
  }

}
