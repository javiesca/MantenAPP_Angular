import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-guardar-piezas',
  templateUrl: './guardar-piezas.component.html',
  styleUrl: './guardar-piezas.component.css'
})
export class GuardarPiezasComponent implements OnInit {

  idVehiculo: number;

  constructor(private route : ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.idVehiculo = this.route.snapshot.params['idVehiculo'];

  }

}
