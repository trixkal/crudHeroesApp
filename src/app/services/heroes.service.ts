import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroModel } from '../models/hero.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private mainURL = 'https://roco-8b1a4.firebaseio.com';
  constructor(private http: HttpClient) { }

  createHero(hero: HeroModel) {
    return this.http.post(`${this.mainURL}/heroes.json`, hero)
    .pipe(
      map((resp: any) => {
        console.log(resp);
        hero.id = resp.name;
        return hero;
      })
    );
  }

  updateHero(hero: HeroModel) {
    const tempHero = {
      ...hero
    };
    delete tempHero.id;
    return this.http.put(`${this.mainURL}/heroes/${hero.id}.json`, tempHero);
  }

  getHeroes() {
    return this.http.get(`${this.mainURL}/heroes.json`)
    .pipe(
      map(this.createHeroArray) // esto envia el resultado del map como el primer argumento para el metodo createHeroArray.
    );
  }

  deleteHero(id: string) {
    return this.http.delete(`${this.mainURL}/heroes/${id}.json`);
  }

  getHeroById(id: string) {
    return this.http.get(`${this.mainURL}/heroes/${id}.json`);
  }

  private createHeroArray(heroeObj: object) {
    const heroes: HeroModel[] = [];
    if (heroeObj === null) {
      return [];
    }
    Object.keys(heroeObj).forEach(key => {
      const hero: HeroModel = heroeObj[key];
      hero.id = key; // este key es el id que crea firebase.
      heroes.push(hero);

    });
    return heroes;

  }
}
