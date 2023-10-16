import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Detalle } from 'src/app/interfaces/chat';
import { ConversacionServiceService } from 'src/app/services/conversacion-service.service';
import { DetalleServiceService } from 'src/app/services/detalle-service.service';
import { MensajeService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})




export class DetalleComponent {

  // Objeto de tipo Detalle
  private detalle: Detalle = {

  };

  // instancia del formulario reactivo
  miFormulario: FormGroup = this.fb.group({
    codigo: ['', [ Validators.required] ],
    rol: ['', [ Validators.required] ],
    mensaje: ['', [ Validators.required] ],
    prompts: ['', [ Validators.required] ],
    fecha: ['', [ Validators.required] ],
  });


  // Constructor
  constructor( 
    private fb: FormBuilder,
     private detalleService: DetalleServiceService,
     private conversacionService: ConversacionServiceService,
     private router: Router,
     private activatedRouter: ActivatedRoute,
     private mensajeService: MensajeService,
  ) { }

  // On-init
  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({id_con, id_det})=>{ ///
      if (id_con) {
 
        this.detalle.conversacion = { id_conversacional: id_con };//
        return;
      } 

      if (id_det) {
        this.detalle.id_detalle = id_det;
        this.detalleService.getDetallePorId(id_det).subscribe((res)=>{
          this.detalle = res;
          console.log(res);
          
          this.cargarDatosFormulario();
        })
        return;
      }

      console.log('router');
      this.router.navigateByUrl('conversaciones');

    });
  }

  //  cargar datos al formulario
  cargarDatosFormulario(){
    this.miFormulario.patchValue({
      codigo: this.detalle.codigo ?? '',
      rol: this.detalle.rol ?? "",
      mensaje: this.detalle.mensaje ?? "",
      prompts: this.detalle.prompts ?? "",
      fecha: this.detalle.fecha ?? new Date(),
    });
  }


  // Crear detalle
  crearDetalle(){
    
    const { conversacion } = this.detalle;
    if ( !conversacion ) {
      return;
    }

    const detalle: Detalle ={
      conversacion,
      ...this.miFormulario.value 
    }

    this.detalleService.registro(detalle).subscribe(
      res => {
        console.log(res);
        this.miFormulario.reset();
      }, error => {

        this.erroresBackEnd(error);

      }
    );

    this.mensajeService.mensajeSweetInformacion('success', "Se agrego el detalle");
  }


  // Actualizar detalle
  ActualizarDetalle(){
    
    const { id_detalle } = this.detalle;
    if ( !id_detalle ) {
      return;
    }

    const detalle: Detalle ={
      id_conversacion: this.detalle.conversacion?.id_conversacional,
      ...this.miFormulario.value 
    }
      console.log(detalle);
      
    this.detalleService.actualizarDetalle(detalle, this.detalle.id_detalle!).subscribe(
      res => {
        this.miFormulario.reset();
        this.verConversacion()
      }, error => {

        this.erroresBackEnd(error);
      
      }
    );
    this.mensajeService.mensajeSweetInformacion('success', "Se actualizo el detalle");
  }

  // metodo submit del formulario
  submitFormulario() {
    if (this.detalle.id_detalle) {
       this.ActualizarDetalle();
    }else{
      this.crearDetalle();
    }
  }

  // navegar al componente conversacion_detalles
  verConversacion(){
    this.router.navigateByUrl(`conversacion_detalles/0/${this.detalle.conversacion?.id_conversacional}`);
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
      console.log(error);
      
      if (error == 'El codigo ya existe en la base de datos.') {
        this.mensajeService.mensajeSweetInformacion('error', "El codigo del detalle ya existe en la base de datos");
      }else{
        this.mensajeService.mensajeSweetInformacion('error', "Debe llenar todos los campos");
      }
      
    } 
  }
}
