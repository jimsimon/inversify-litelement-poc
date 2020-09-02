import { customElement, LitElement, html, css, property } from "lit-element";
import { Hero } from "../hero";
import {HeroService} from "../hero-service";
import { lazyInject } from "../container";

@customElement('app-dashboard')
class DashboardElement extends LitElement {
    @lazyInject(HeroService)
    private heroService: HeroService

    @property()
    heroes: Hero[] = []

    render() {
        return html`
            <link rel="stylesheet" href="./dashboard.css">
            <h3>Top Heroes</h3>
            <div class="grid grid-pad">
              ${this.renderHeroes()}
            </div>
            
            <app-hero-search></app-hero-search>
        `
    }

    connectedCallback() {
        super.connectedCallback();
        this.getHeroes()
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes.slice(1, 5));
    }

    renderHeroes() {
        this.heroes.map(this.renderHero)
    }

    renderHero(hero: Hero) {
        return html`
            <a class="col-1-4" href="/detail/${hero.id}">
                <div class="module hero">
                    <h4>${hero.name}</h4>
                </div>
            </a>
        `
    }
}