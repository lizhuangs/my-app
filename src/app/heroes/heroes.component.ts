import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  private selectedId: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }

  getHeroes(): void {
    // 将subscribe改成then即是将rxjs调用改为promise方式调用
    // toPromise操作符把Observable直接转换成Promise对象

    // this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    /* this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.selectedId = +params.get('id');
        return this.heroService.getHeroes();
      }).subscribe(heroes => this.heroes = heroes); */
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedId = hero.id;
    this.selectedHero = hero;
  }

  isSelected(hero: Hero) { return hero.id === this.selectedId; }

  gotoDetail(): void {
    this.router.navigate(['/hero', this.selectedHero.id]);
  }
}
