import { Component } from '@angular/core';
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

  // variables
  public conversaciones: Conversacion [] = []; 
  public conversacionesAct: Conversacion [] = []; 
  public conversacion!: Conversacion;
  public conversacion2!: Conversacion[];
  public termino : String = ""; 
    // para poder cerrar subscripciones
    urlSubscription!: Subscription;
    urlSubscriptionBus!: Subscription;
    paginador!: any;
    num = 0;
    mensajeError!: string;

  // constructor
  constructor( 
      private conversacionService: ConversacionServiceService,
      private router: Router,
      private activatedRouter: ActivatedRoute,
      ) {}

  // On-init
  ngOnInit(): void {

    this.conversacionService.conversacionesLista().subscribe( resp => {
      this.conversaciones = resp ?? [];
      this.conversacionesAct = resp ?? [];
      this.conversacion2= resp ?? [];
    });

    this.updateDisplayedItems();
  }


  // buscar conversacion por id
  buscarXId(){
   
    if (this.termino.trim().length == 0) {
      this.conversaciones = this.conversacionesAct;
      return;
    }


    this.conversacionService.getConversacionPorId(this.termino.trim()).subscribe((res)=> {
      this.conversacion = res

      if (!res) {
        this.conversaciones = this.conversacionesAct;
        return;
      }

      this.conversaciones = [res];
      
    },(error)=>{ console.log(error);
    })
  }


  // borrar conversacion por id
  borrarConversacion(id?: number){
    
    if (!id) {
      return;
    }

    this.conversacionService.borrarConversacion(id).subscribe((res)=>{
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


  // Método para cambiar de paginacion
  listaConversacionPag = (): void => {
    // this.cerrarSubscripcionUrlBus();
    this.urlSubscription = this.activatedRouter.paramMap.subscribe( params => {
      // leemos y validamos el parametro url
      //@ts-ignore
      let pagina = +params.get('page');
      if ( !pagina) {
        pagina = 0;
      }
      this.num = pagina;
      // metodo del servicio para listar
      this.conversacionService.listarConversacionPaginacion(pagina)
        .subscribe( (response: any) => {
            if (response.empty) {
              this.conversaciones = [];
              this.paginador = null;
              // cambiar la ruta de navegación
              this.router.navigateByUrl('cliente/:page');
              this.cerrarSubscripcionLista();
              return;
            }
            // el dato emitido va a ser de tipo Cliente
            this.conversaciones = (response.content as Conversacion[]);
            this.paginador = response;
        }, error => {
          this.cerrarSubscripcionLista();
          if (error.status === 0 ) this.mensajeError = 'Error de conección con el servidor';
        }
      );
    });
  }

    // Método para cerrar la Subscripción
    cerrarSubscripcionLista = (): void => {
      if ( this.urlSubscription ) this.urlSubscription.unsubscribe();
    }
  



    ///////////////////////
    // items: any[] = [
      
  
    //   { name: 'Jane', age: 30 },
    //   { name: 'John', age: 25 },
    //   { name: 'Jane', age: 30 },
    //   { name: 'John', age: 25 },
    //   { name: 'Jane', age: 30 },
    //   // Agregar más elementos si es necesario
    // ];
    pageSize = 5; // Tamaño de página
    currentPage = 1; // Página actual
    //displayedItems!: any[]; ==conversacion2
  

 
  
    updateDisplayedItems() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
   
    }
  
  
}
