import {customElement, LitElement, property, html} from "lit-element";
import {Hero} from "../hero";
import {HeroService} from "../hero-service";
import { lazyInject } from "../container";
import router from '../router'

@customElement('app-hero-detail')
class HeroDetailElement extends LitElement {
    @lazyInject(HeroService)
    private heroService: HeroService

    @property()
    hero: Hero

    @property()
    heroId: number

    render() {
        html`${this.hero ? this.renderHero : null}`
    }

    renderHero() {
        return html`
            <link rel="stylesheet" href="./hero-detail.css">
            <div>
                <h2>${this.hero.name.toUpperCase()} Details</h2>
                <div><span>id: </span>{{hero.id}}</div>
                <div>
                    <label>name:
                        <input value"${this.hero.name}" placeholder="name"/>
                    </label>
                </div>
                <button @click="${this.goBack}">go back</button>
                <button @click="${this.save}">save</button>
            </div>
        `
    }

    connectedCallback() {
        super.connectedCallback();
        this.getHero()
    }

    getHero(): void {
        this.heroService.getHero(this.heroId)
            .subscribe(hero => this.hero = hero);
    }

    goBack(): void {
        router.back()
    }

    save(): void {
        this.heroService.updateHero(this.hero)
            .subscribe(() => this.goBack());
    }
}