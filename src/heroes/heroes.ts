import {LitElement, html, customElement, internalProperty} from "lit-element";
import {HeroService} from "../hero-service";
import {lazyInject} from "../container";
import {Hero} from "../hero";
import styles from './heroes.css'
import {RouterService} from "../router-service";

@customElement('app-heroes')
class HeroesElement extends LitElement {
    @lazyInject(HeroService)
    private heroService: HeroService

    @lazyInject(RouterService)
    private router: RouterService

    @internalProperty()
    heroes: Hero[] = [];

    connectedCallback() {
        super.connectedCallback();
        this.getHeroes()
    }

    static styles = [styles]

    render() {
        return html`
            <h2>My Heroes</h2>
            <div>
                <label>Hero name:
                    <input />
                </label>
                <!-- (click) passes input value to add() and then clears the input -->
                <button @click="${this.add}">
                    add
                </button>
            </div>
            <ul class="heroes">
                ${this.renderHeroes()}
            </ul>
        `
    }

    renderHeroes = () => {
        return this.heroes.map((hero) => {
            return html`
                <li>
                    <a @click=${this.router.navigateToHeroDetail.bind(this, hero.id)}>
                        <span class="badge">${hero.id}</span> ${hero.name}
                    </a>
                    <button class="delete" title="delete hero"
                    @click="${this.delete.bind(hero)}">x</button>
                </li>
            `
        })
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
    }

    add(): void {
        const input = document.querySelector('input')
        let name = input.value
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.addHero({name} as Hero)
            .subscribe(hero => {
                this.heroes.push(hero);
            });
        input.value = ''
    }

    delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.deleteHero(hero).subscribe();
    }
}