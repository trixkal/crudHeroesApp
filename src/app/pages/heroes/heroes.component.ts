import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroModel } from '../../models/hero.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  constructor(private heroesService: HeroesService) { }

  heroes: HeroModel[] = [];
  loading = false;

  ngOnInit(): void {
    this.loading = true;
    this.heroesService.getHeroes()
      .subscribe(resp => {
        this.heroes = resp;
        this.loading = false;
      });
  }

  deleteHero(hero: HeroModel, index: number) {
    Swal.fire({
      title: 'Are you sure ?',
      text: `Are you sure you want to delete${hero.name}`,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true

    }).then(resp => {
      if (resp.value === true) {
        this.heroes.splice(index, 1);
        this.heroesService.deleteHero(hero.id).subscribe();
      }
    });

  }

}
