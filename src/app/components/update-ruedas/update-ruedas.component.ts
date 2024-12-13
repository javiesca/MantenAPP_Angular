import { Component, OnInit } from '@angular/core';
import { Ruedas } from '../../interfaces/ruedas';
import { ActivatedRoute, Router } from '@angular/router';
import { RuedasService } from '../../services/ruedas.service';

@Component({
  selector: 'app-update-ruedas',
  templateUrl: './update-ruedas.component.html',
  styleUrl: './update-ruedas.component.css'
})
export class UpdateRuedasComponent implements OnInit {

    idRuedas: number;
    ruedas : Ruedas = new Ruedas();

    constructor(private rs : RuedasService, private route : ActivatedRoute, private router : Router) { }

    ngOnInit(): void {
        this.obtenerRuedas();
    }

    obtenerRuedas(): void {
        this.idRuedas = this.route.snapshot.params['idRuedas'];
        this.rs.getRuedas(this.idRuedas).subscribe(datos =>{
            this.ruedas = datos;
        })
    }

    onSubmit(){
      this.rs.updateRuedas(this.idRuedas, this.ruedas).subscribe(datos =>{
        console.log(datos);
        this.router.navigate(['vehiculo-detalles', this.ruedas.vehiculo.idVehiculo]);
      }, error => console.log(error));
    }


}
