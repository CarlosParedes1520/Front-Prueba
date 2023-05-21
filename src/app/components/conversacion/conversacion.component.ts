import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConversacionServiceService } from 'src/app/services/conversacion-service.service';
import { Conversacion } from '../../interfaces/chat';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.component.html',
  styleUrls: ['./conversacion.component.css']
})
export class ConversacionComponent {

  // Variables
  public conversacion: Conversacion = {};


  //Formulario 
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
  ) { }

  // OnInit
  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({id})=>{
      console.log(id);
      if (id && id !== 'nuevo') {
        this.conversacionService.getConversacionPorId(id).subscribe((res)=> {
          console.log(res);
          this.conversacion = res;
          this.cargarDatosFormulario();
        });
      } 
    });
  }

  // crear conversacion
  crearConversacion(){
    
    const conversacion: Conversacion ={
      ...this.miFormulario.value 
    }
      
    this.conversacionService.registro(conversacion).subscribe(
      res => {
        console.log(res);
        
        const {id_conversacional}= res as Conversacion;
        console.log(id_conversacional);
        
        if ( id_conversacional ) {
            this.router.navigateByUrl(`detalles/${id_conversacional}`);
        }
      }
    );

  }

  // actualizar conversacion
  actualizarConversacion(){
    
    const conversacion: Conversacion ={
      
      ...this.miFormulario.value 
    }

      console.log(conversacion);
      
    this.conversacionService.actualizar(conversacion, this.conversacion.id_conversacional!).subscribe(
      res => {
        console.log(res);
        
        const {id_conversacional}= res as Conversacion;
        console.log(id_conversacional);
        
        if ( id_conversacional ) {
            this.router.navigateByUrl(`conversacion_detalles/${id_conversacional}`);
        }
      }
    );
  }

  // CArgar datos a actualizar
  cargarDatosFormulario(){
    this.miFormulario.patchValue({
      identificador: this.conversacion.identificador ?? '',
      sistema: this.conversacion.sistema ?? "",
      fecha: this.conversacion.fecha ?? new Date(),
    });
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
}
