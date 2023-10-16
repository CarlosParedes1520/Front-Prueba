import { Component, Input } from '@angular/core';
import { ConversacionServiceService } from '../../services/conversacion-service.service';
import { Conversacion } from 'src/app/interfaces/chat';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conversaciones',
  templateUrl: './conversaciones.component.html',
  styleUrls: ['./conversaciones.component.css']
 
})
export class ConversacionesComponent {


  //paginador
  public totalElements = 0;
  public totalPages = 0;
  public numberOfElements=0;
  public numeracionDeElPaginador: any =[];

  // variables
  // public conversaciones: Conversacion [] = []; 
  public conversacionesAct: Conversacion [] = []; 
  public conversacion: Conversacion ={}
  public conversacion1: Conversacion[]=[];
  public conversacion2: Conversacion[]=[];
  public termino : String = ""; 
  public list: any = this.listarConversacion();
  public errorStatus: boolean = true;
  paginaSeleccionada: number = -1

    // para poder cerrar subscripciones
    urlSubscription!: Subscription;
    urlSubscriptionBus!: Subscription;
    paginador!: any;
     @Input() num = 0;
    mensajeError!: string;
  



  // constructor
  constructor( 
      private conversacionService: ConversacionServiceService,
      private router: Router,
      private activatedRouter: ActivatedRoute,
      ) {
       //this.numpage = this.conversacionService.numpage;
      }

  // On-init
  ngOnInit(): void {
    this.listaConversacionPag()
  }


  // Ciclos de vida ngOnDestroy
  ngOnDestroy(): void {
    this.cerrarSubscripcionLista();
    this.cerrarSubscripcionUrlBus();
  }

  // Método para cambiar de paginacion
  listaConversacionPag = (): void => {

    this.urlSubscription = this.activatedRouter.paramMap.subscribe( params => {
 
      let pagina = +params.get('page')!;
      if ( !pagina) {
        pagina = 0;
      }

      if (this.num < 0) {
        this.num = 0;
      }

     pagina =  this.num ;

      this.conversacionService.listarConversacionPaginacion(  this.num)
        .subscribe( (response: any) => {

          this.router.navigateByUrl(`conversaciones/${this.num}`);
            if (response.content.length < 5) {
              console.log("No hay mas");
            }

            if (response.empty) {
              this.conversacion2 = [];
              this.paginador = null;
              // cambiar la ruta de navegación
              this.router.navigateByUrl(`conversaciones/${this.num}`);
              this.cerrarSubscripcionLista();
              return;
            }
            // el dato emitido va a ser de tipo conversacion
            this.conversacion2 = (response.content as Conversacion[]);
            this.paginador = response;
        }, error => {
          this.cerrarSubscripcionLista();
          if (error.status === 0 ) this.mensajeError = 'Error de conección con el servidor';
        });
    });
  }


  // buscar conversacion por id
  buscarXId(){
    this.errorStatus =true;
    // si esta vacio el input 
    if (this.termino.trim().length == 0) {
     // this.conversacion2 = this.conversacionesAct;
     this.errorStatus =true;
      this.listaConversacionPag();
      return;
    }

    this.conversacionService.getConversacionPorId(this.termino.trim()).subscribe((res)=> {
      this.conversacion = res;
      console.log(this.conversacion);
      
      if (!res) {
        //this.conversacion2 = this.conversacionesAct;
       // console.log('sii d');
        
        return;
      }

      this.conversacion2 = [res];
      console.log( this.conversacion2);
      
    },(error)=>{ 
      this.errorStatus = error.ok;
  
    })
  }


  // borrar conversacion por id
  borrarConversacion(id?: number){
    
    if (!id) {
      return;
    }

    this.conversacionService.borrarConversacion(id).subscribe((res)=>{
      this.conversacion2 = this.conversacion2.filter(con => con.id_conversacional !== id) ;
      this.conversacionesAct= this.conversacion2;
    })
    location.reload();   
  }



  crearNuevo(){
    this.router.navigateByUrl(`/conversacion/${'nuevo'}`);
  }



    // Método para cerrar la Subscripción
    cerrarSubscripcionLista = (): void => {
      if ( this.urlSubscription ) this.urlSubscription.unsubscribe();
    }
  

    
  // Método para cerrar la Subscripción
  cerrarSubscripcionUrlBus = (): void => {
    if ( this.urlSubscriptionBus ) this.urlSubscriptionBus.unsubscribe();
  }
  

  // paginacion siguiente por url
  siguientePagina = () => {
    this.paginaSeleccionada = this.num;
    this.num = this.num+1;
    this.listaConversacionPag()
  }

   // paginacion Anteriror por url
  anteriorePagina = () => {
    this.num = this.num-1;
    this.paginaSeleccionada = this.num-1;
    this.listaConversacionPag()
  }

  // paginacion por numeros por url
  // navegar(page:number,id?: number){
  navegar(id?: number){
    if (!id) {
      return;
    }
   
    this.router.navigateByUrl(`/conversacion_detalles/0/${id}`);
  }

  // Cambiar de pagina por url
  cambiarPagina(event: any){

    console.log(event.target.innerText);
    if (event.target.innerText == 'Inicio') {
      event.target.value = 0;
      this.num =event.target.value;
    }else{
      this.num = Number(event.target.innerText);
    }

    this.paginaSeleccionada = this.num-1;
    this.listaConversacionPag()
  
  }


  // listar los numeros del paginador
  listarConversacion(): any {

    this.urlSubscription = this.activatedRouter.paramMap.subscribe(params=>{
      let pagina = +params.get('page')!;

    
            if ( !pagina) {
              pagina = 0;
            }
              
            if (this.num < 0) {
              this.num = 0;
            }
        let numeradorPagina =  0; 
        let arrayPagina: any =  []; 

        this.conversacionService.listarConversacionPaginacion(pagina).subscribe((res:any)=>{ 
          this.conversacion1= res as Conversacion[] 

                this.totalElements = res.totalElements;
                this.totalPages = res.totalPages;
                this.numberOfElements = res.numberOfElements;

                for (let index = 0; index < res.totalPages; index++) {
                  this.numeracionDeElPaginador[index] = index
                }
        });
        return arrayPagina;
    });
    
  }

}
