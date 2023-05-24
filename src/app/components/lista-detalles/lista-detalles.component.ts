import { Component } from '@angular/core';
import { Detalle } from 'src/app/interfaces/chat';
import { DetalleServiceService } from 'src/app/services/detalle-service.service';

@Component({
  selector: 'app-lista-detalles',
  templateUrl: './lista-detalles.component.html',
  styleUrls: ['./lista-detalles.component.css']
})
export class ListaDetallesComponent {

  public detalles: Detalle [] = []; 
constructor(private detalleService: DetalleServiceService){
  
}


  ngOnInit(): void {
    this.detalleService.detallesLista().subscribe( resp => {
      
      this.detalles = resp ?? [];
      
    });
    
  }
}
