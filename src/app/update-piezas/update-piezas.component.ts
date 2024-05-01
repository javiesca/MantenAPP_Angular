import { Component, OnInit } from '@angular/core';
import { Piezas } from '../piezas';
import { PiezasService } from '../piezas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-piezas',
  templateUrl: './update-piezas.component.html',
  styleUrl: './update-piezas.component.css'
})
export class UpdatePiezasComponent implements OnInit {

  piezas : Piezas = new Piezas();
  idPiezas : number;

  constructor(private ps : PiezasService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.idPiezas = this.route.snapshot.params['idPiezas'];
  }

}
