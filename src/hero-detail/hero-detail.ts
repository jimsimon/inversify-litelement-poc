import {customElement, LitElement, property, html, internalProperty} from "lit-element";
import {Hero} from "../hero";
import {HeroService} from "../hero-service";
import {lazyInject} from "../container";
import globalStyles from '../global-styles.css'
import styles from './hero-detail.css'
import {RouterService} from "../router-service";

@customElement('app-hero-detail')
class HeroDetailElement extends LitElement {
    static styles = [globalStyles, styles]

    @property()
    heroId: number

    @lazyInject(HeroService)
    private heroService: HeroService

    @lazyInject(RouterService)
    private router: RouterService

    @internalProperty()
    private hero: Hero

    render() {
        return this.hero ? this.renderHero() : null
    }

    renderHero() {
        return html`
            <div>
                <h2>${this.hero.name.toUpperCase()} Details</h2>
                <div><span>id: </span>${this.hero.id}</div>
                <div>
                    <label>name:
                        <input value="${this.hero.name}" placeholder="name"/>
                    </label>
                </div>
                <button @click="${this.router.goBack}">go back</button>
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

    save(): void {
        this.hero.name = this.shadowRoot.querySelector('input').value
        this.heroService.updateHero(this.hero)
            .subscribe(() => this.router.goBack());
    }
}