import { Component } from '@angular/core';
import { ConversacionServiceService } from '../../services/conversacion-service.service';
import { Conversacion } from 'src/app/interfaces/chat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversaciones',
  templateUrl: './conversaciones.component.html',
  styleUrls: ['./conversaciones.component.css']
})
export class ConversacionesComponent {
  public conversaciones: Conversacion [] = []; 
  public conversacionesAct: Conversacion [] = []; 

  public conversacion!: Conversacion;


  public termino : String = ""; 

  constructor( private conversacionService: ConversacionServiceService,
                private router: Router,
    
    ) {
    
  }

  ngOnInit(): void {

    this.conversacionService.conversaciones().subscribe( resp => {
      
      this.conversaciones = resp ?? [];
      this.conversacionesAct = resp ?? [];
      // console.log(this.conversaciones);
    });
  }


  buscarXId(){
   
    if (this.termino.trim().length == 0) {
      this.conversaciones = this.conversacionesAct;
      return;
    }

    console.log(this.termino);

    this.conversacionService.getConversacionPorId(this.termino.trim()).subscribe((res)=> {
      this.conversacion = res

      if (!res) {
        this.conversaciones = this.conversacionesAct;
        return;
      }

      console.log(res);
      
      console.log(this.conversacion);
      this.conversaciones = [res];
      
    },(error)=>{ console.log(error);
    })
  }


  borrarConversacion(id?: number){
    
    if (!id) {
      return;
    }

    this.conversacionService.borrarConversacion(id).subscribe((res)=>{

      console.log(res);

      this.conversaciones = this.conversaciones.filter(con => con.id_conversacional !== id) ;
      this.conversacionesAct= this.conversaciones;
    })
  }

  navegar(id?: number){
    if (!id) {
      return;
    }
    this.router.navigateByUrl(`/conversacion_detalles/${id}`);
  }

  crearNuevo(){
    this.router.navigateByUrl(`/conversacion/${'nuevo'}`);
  }
}
