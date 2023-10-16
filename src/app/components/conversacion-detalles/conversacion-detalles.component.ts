import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Conversacion, Detalle } from 'src/app/interfaces/chat';
import { ConversacionServiceService } from 'src/app/services/conversacion-service.service';
import { DetalleServiceService } from 'src/app/services/detalle-service.service';
import { Content } from '../../interfaces/paginador';

@Component({
  selector: 'app-conversacion-detalles',
  templateUrl: './conversacion-detalles.component.html',
  styleUrls: ['./conversacion-detalles.component.css']
})
export class ConversacionDetallesComponent {

//paginador
  totalElements = 0;
  totalPages = 0;
  numberOfElements=0;
  numeracionDeElPaginador: any =[];


  //
   num = 0;
   urlSubscription!: Subscription;
   conversacionSelecionado: Conversacion = {}; 
   public termino : String = ""; 
   public errorStatus: boolean = true;
   paginaSeleccionada: number = -1;
   //public conversacion2: Conversacion[]=[];
   

  // objeto de tipo Conversacion
  public conversacion: Conversacion = {
  } ;


  // constructor
  constructor( private conversacionService: ConversacionServiceService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private detalleServiceService: DetalleServiceService
    ) {
     
  }

  // On-init
  ngOnInit(): void {

    this. listaConversacionPag();
    
  }

  // redirecciona al formulario editar o agregar
  navegar(navegarDetalles: boolean){
    
    this.urlSubscription = this.activatedRouter.paramMap.subscribe(params=>{
        let id = +params.get('id')!;
        console.log('Entra?');
        console.log(this.conversacion);

        if (!id) {
          console.log('id no valido');
           return;
        }

        if (navegarDetalles) {
          this.router.navigateByUrl(`/detalles/${id}`);
        } else {
          this.router.navigateByUrl(`/conversacion/${id}`);
        }
      });

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


 // Método para cambiar de paginacion
 listaConversacionPag = (): void => {
  this.urlSubscription = this.activatedRouter.paramMap.subscribe(params=>{
    let pagina = +params.get('page')!;
    let id = +params.get('id')!;
    if (id) {

        if ( !pagina) {
          pagina = 0;
        }
          
        if (this.num < 0) {
          this.num = 0;
        }
        
        pagina = this.num;
        
          this.conversacionService.listarConversacionPaginacion2(this.num,id).subscribe((res: any)=>{ 
            this.router.navigateByUrl(`conversacion_detalles/${this.num}/${id}`);
            // console.log(res.totalElements);// total global de elemento que tiene 
            // console.log(res.totalPages);//total de paginas que va a tener el paginador
            // console.log(res.numberOfElements);//numero de elementos que trae el paginador
            this.conversacion.detalles= res.content as Conversacion[] 

            //this.conversacion2 = (res.content as Conversacion[]);
            //this.conversacionSelecionado = res;
            this.conversacionService.getConversacionPorId(id+"").subscribe((res: any)=>{ 
              this.conversacionSelecionado = res;
               console.log(this.conversacionSelecionado);
             });
            
            this.totalElements = res.totalElements;
            this.totalPages = res.totalPages;
            
            this.numberOfElements = res.numberOfElements;

            for (let index = 0; index < res.totalPages; index++) {
              this.numeracionDeElPaginador[index] = index
            }

          });
    } else {
      this.router.navigateByUrl('conversacion');
    }
  });
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
  navegarP(id?: number){
    if (!id) {
      return;
    }
    this.router.navigateByUrl(`/conversacion_detalles/${id}`);
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



  // Método para cerrar la Subscripción
  cerrarSubscripcionLista = (): void => { //bien
    if ( this.urlSubscription ) this.urlSubscription.unsubscribe();
  }

  // listar los numeros del paginador
 /* listarConversacion(): any {
    let numeradorPagina =  0; 
    let arrayPagina : any =  []; 
    this.urlSubscription = this.activatedRouter.paramMap.subscribe(params=>{

      let id = +params.get('id')!;
    
        this.conversacionService.getConversacionPorId(id+"").subscribe((res: any)=>{ 
          
          //this.conversacion2 = res 

          this.conversacion.detalles= res.detalles
          //console.log(res.detalles);
          this.numpage=2;
          numeradorPagina = Math.ceil(res.detalles.length/2) ;

          //console.log(this.conversacion.detalles );
          

          for (let index = 0; index < numeradorPagina; index++) {
            arrayPagina[index] = index;
            
          }
          
        });
      });

      console.log(arrayPagina+"  =?????");
    return arrayPagina;
  }*/


  // buscar conversacion por id
  buscarXId(){
    this.errorStatus =true;
    this.urlSubscription = this.activatedRouter.paramMap.subscribe(params=>{
      let id = +params.get('id')!;
      if (this.termino.trim().length == 0) {
        // this.conversacion2 = this.conversacionesAct;
        this.errorStatus =true;
         this.listaConversacionPag();
         return;
       }
        if (!id) {
          return
        }
        
          this.errorStatus =true;
          // si esta vacio el input 
          if (this.termino.trim().length == 0) {
          // this.conversacion2 = this.conversacionesAct;
          this.errorStatus =true;
            this.listaConversacionPag();
            return;
          }

        this.detalleServiceService.getDetallePorId2(id,this.termino.trim()).subscribe((res)=> {
          this.conversacion.detalles= res 
          console.log(this.conversacion);
          
 
          if (!res) {
            console.log('vacio');
            this.errorStatus = false;
            return;
          }
        },(error)=>{ 
          this.errorStatus = error.ok;
          console.log(this.errorStatus);
          
        })

    },(error)=>{ 
      this.errorStatus = error.ok;
      console.log(this.errorStatus);
    })
  }

  

}
