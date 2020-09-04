import {customElement, LitElement, html, css, property, internalProperty} from "lit-element";
import {Hero} from "../hero";
import {HeroService} from "../hero-service";
import {lazyInject} from "../container";
import globalStyles from '../global-styles.css'
import styles from "./dashboard.css";
import {RouterService} from "../router-service";

@customElement('app-dashboard')
class DashboardElement extends LitElement {
    static styles = [globalStyles, styles]

    @lazyInject(HeroService)
    private heroService: HeroService

    @lazyInject(RouterService)
    private router: RouterService

    @internalProperty()
    private heroes: Hero[] = []

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

    renderHero = (hero: Hero) => {
        return html`
            <a class="col-1-4" @click=${this.router.navigateToHeroDetail.bind(this, hero.id)}>
                <div class="module hero">
                    <h4>${hero.name}</h4>
                </div>
            </a>
        `
    }
}