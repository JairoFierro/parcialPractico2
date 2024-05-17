import { Component, OnInit } from '@angular/core';
import { Serie } from '../serie';
import { SerieService } from '../serie.service';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrls: ['./serie-list.component.css']
})
export class SerieListComponent implements OnInit {

  series: Array<Serie> = [];
  promedio:number=0;
  selected: boolean = false;
  selectedSerie!: Serie;
  constructor(private serieService: SerieService) { }

  getBooks(): void {
    this.serieService.getSeries().subscribe({next: apiData =>{ this.series = apiData, this.calcularPromedio();} , error: e => console.error(e)});
    
  }

  calcularPromedio():void{
    let suma:number=0;
    for(let i=0;i<this.series.length;i++){
      suma+=this.series[i].seasons;
    }
    this.promedio=suma/this.series.length;
  }

  onSelected(serie: Serie): void {
    this.selected = true;
    this.selectedSerie = serie;
  }

  ngOnInit() {
    this.getBooks();
  }

}
