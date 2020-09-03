import {customElement, LitElement, html, css, property, internalProperty} from "lit-element";
import {Hero} from "../hero";
import {HeroService} from "../hero-service";
import {lazyInject} from "../container";
import styles from "./dashboard.css";

@customElement('app-dashboard')
class DashboardElement extends LitElement {
    @lazyInject(HeroService)
    private heroService: HeroService

    @internalProperty()
    heroes: Hero[] = []

    static styles = [styles]

    render() {
        return html`
            <h3>Top Heroes</h3>
            <div class="grid grid-pad">
              ${this.renderHeroes(this.heroes)}
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

    renderHeroes(heroes: Hero[]) {
        return heroes.map(this.renderHero)
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