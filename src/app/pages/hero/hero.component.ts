import { Component, OnInit } from '@angular/core';
import { HeroModel } from '../../models/hero.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html'
})
export class HeroComponent implements OnInit {

  hero: HeroModel = new HeroModel();
  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.heroesService.getHeroById(id)
      .subscribe((resp: HeroModel) => {
        this.hero = resp;
        this.hero.id = id;
      });
    }
  }

  save(form: NgForm) {
    if (form.invalid) {
      console.log('form no valid');
      return;
    }

    Swal.fire({
      title: 'Wait',
      text: 'Savging Information',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    let requestObservable: Observable<any>;

    if (this.hero.id) {
      requestObservable = this.heroesService.updateHero(this.hero);
    } else {
      requestObservable =  this.heroesService.createHero(this.hero);
    }

    requestObservable.subscribe(resp => {
      Swal.fire({
        title: this.hero.name,
        text: `Success! The hero ${this.hero.name} is saved.`,
        icon: 'success'
      });

    });
}



}
