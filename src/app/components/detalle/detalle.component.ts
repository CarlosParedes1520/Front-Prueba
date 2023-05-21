import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Detalle } from 'src/app/interfaces/chat';
import { DetalleServiceService } from 'src/app/services/detalle-service.service';
import { ValidadorService } from 'src/app/services/validador.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})




export class DetalleComponent {


  miFormulario: FormGroup = this.fb.group({
    codigo: ['', [ Validators.required] ],
    rol: ['', [ Validators.required] ],
    mensaje: ['', [ Validators.required] ],
    // idConversacion: ['', [ Validators.required] ],
    prompts: ['', [ Validators.required] ],
    fecha: ['', [ Validators.required] ],
  });


  private detalle: Detalle = {

  };
  
  constructor( 
    private fb: FormBuilder,
     private detalleService: DetalleServiceService,
     private router: Router,
     private activatedRouter: ActivatedRoute
  ) { }


  crearDetalle(){
    
    const { conversacion } = this.detalle;
    if ( !conversacion ) {
      return;
    }

    const detalle: Detalle ={
      conversacion,
      ...this.miFormulario.value 
    }
      console.log(detalle);
      
    this.detalleService.registro(detalle).subscribe(
      res => {
        console.log(res);
        this.miFormulario.reset();
      }
    );
  }

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
        console.log(res);
        this.miFormulario.reset();
        this.verConversacion()
      }
    );
  }


  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({id_con, id_det})=>{
      console.log(id_con);
      console.log(id_det);
      if (id_con) {
        
        console.log('entra');
        
        this.detalle.conversacion = { id_conversacional: id_con };
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

  submitFormulario() {
    if (this.detalle.id_detalle) {
       this.ActualizarDetalle();
    }else{
      this.crearDetalle();
    }
  }


  verConversacion(){
    this.router.navigateByUrl(`conversacion_detalles/${this.detalle.conversacion?.id_conversacional}`);
  }

  cargarDatosFormulario(){
    this.miFormulario.patchValue({
      codigo: this.detalle.codigo ?? '',
      rol: this.detalle.rol ?? "",
      mensaje: this.detalle.mensaje ?? "",
      prompts: this.detalle.prompts ?? "",
      fecha: this.detalle.fecha ?? new Date(),
    });
  }


    //Validar campos
    campoValido = ( campo: string ): boolean => {
      if ( this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched) {
        return true;
      } else {
        return false;
      }
    }
}
