import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guardar-mantenimiento',
  templateUrl: './guardar-mantenimiento.component.html',
  styleUrl: './guardar-mantenimiento.component.css'
})
export class GuardarMantenimientoComponent implements OnInit {

  idVehiculo: number

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.idVehiculo = this.route.snapshot.params['idVehiculo'];
    console.log(this.idVehiculo);
  }

}
