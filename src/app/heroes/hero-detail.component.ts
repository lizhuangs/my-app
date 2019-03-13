// Keep the Input import for now, you'll remove it later:
import { Component, OnInit, HostBinding } from '@angular/core';
import { Location } from '@angular/common';
import { HeroService } from './hero.service';
import { Hero } from './hero';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { slideInDownAnimation } from '../animations';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  animations: [slideInDownAnimation]
})

export class HeroDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  hero: Hero;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    // console.log(location.href);
    /*
    如果一个组件永远不会被复用，或者说不会连续几次都导航到这个界面，可以使用快照
    let id = this.route.snapshot.paramMap.get('id');
      this.heroService.getHero(+id)
        .then((hero: Hero) => this.hero = hero);
    */
    /* this.route.paramMap
      .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
      .subscribe(hero => this.hero = hero); */
    /* this.hero = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.heroService.getHero(params.get('id')))
    ); */
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }

  gotoHeroes() {
    let heroId = this.hero ? this.hero.id : null;
    // console.log('heroId:' + heroId);
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }

  goBack(): void {
    this.gotoHeroes();
    // this.location.back();
  }

  onKeyUpEnter(name: string): void {
    this.hero.name = name;
  }
}
