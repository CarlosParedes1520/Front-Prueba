import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConversacionServiceService } from 'src/app/services/conversacion-service.service';
import { Conversacion } from '../../interfaces/chat';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.component.html',
  styleUrls: ['./conversacion.component.css'],
 
})

export class ConversacionComponent {

  // Variables
  public conversacion: Conversacion = {};
  //public conversaciones!: Conversacion [];
  //erroesBack: string[] = [];
  // instancia del Formulario 
  miFormulario: FormGroup = this.fb.group({
    identificador: ['', [ Validators.required] ],
    sistema: ['', [ Validators.required] ],
    fecha: ['', [ Validators.required] ],
  });

  // Constructor
  constructor( 
    private fb: FormBuilder,
    private conversacionService: ConversacionServiceService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private mensajeService: MensajeService,
  ) { }

  // OnInit
  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({id})=>{
      console.log(id);
      if (id && id !== 'nuevo') {
        this.conversacionService.getConversacionPorId(id).subscribe((res)=> {
          this.conversacion = res;
          this.cargarDatosFormulario();
        });
      } 
    });
  }

  // Cargar datos a actualizar
  cargarDatosFormulario(){
    this.miFormulario.patchValue({
      identificador: this.conversacion.identificador ?? '',////////
      sistema: this.conversacion.sistema ?? "",
      fecha: this.conversacion.fecha ?? new Date(),
    });
  }
  

  // crear conversacion
  crearConversacion(){
    const conversacion: Conversacion ={
      ...this.miFormulario.value
    }
      
    this.conversacionService.registro(conversacion).subscribe(
      res => {
        
        const {id_conversacional}= res as Conversacion;
        
        if ( id_conversacional ) {
            this.router.navigateByUrl(`detalles/${id_conversacional}`);
        }
      }, error => {

        this.erroresBackEnd(error);
      }
    );
    // mensaje 
    this.mensajeService.mensajeSweetInformacion('success', "Se agrego la conversación");
  }

  // actualizar conversacion
  actualizarConversacion(){
    
    const conversacion: Conversacion ={
      ...this.miFormulario.value 
    }
   
    this.conversacionService.actualizar(conversacion, this.conversacion.id_conversacional!).subscribe(
      res => {
        console.log(conversacion);
        
        const {id_conversacional}= res as Conversacion;
        this.mensajeService.mensajeSweetInformacion('success', "Se Actualizo la conversación " );
        if ( id_conversacional ) {
            this.router.navigateByUrl(`conversacion_detalles/0/${id_conversacional}`);
        }
      }
    );
  }

  // accion de guardar y editar
  realizarAccion(){
    if (this.conversacion.id_conversacional) {
      this.actualizarConversacion();
    }else{
      this.crearConversacion();
    }
  }


  //Validar campos
  campoValido = ( campo: string ): boolean => {
    if ( this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched) {
      return true;
    } else {
      return false;
    }
  }


   // Método para guardar los posibles erroes del back
   erroresBackEnd = (error: any): void => {
    if (error) {
      this.mensajeService.mensajeSweetInformacion('error', "Debe llenar todos los campos");
    } 
  }


}
