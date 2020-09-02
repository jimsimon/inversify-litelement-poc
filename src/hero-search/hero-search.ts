import {customElement, LitElement, html} from "lit-element";
import {Observable, Subject} from "rxjs";
import {Hero} from "../hero";
import {HeroService} from "../hero-service";
import {debounceTime, distinctUntilChanged, switchMap, takeUntil} from "rxjs/operators";
import { lazyInject } from "../container";

@customElement('app-hero-search')
export class HeroSearchElement extends LitElement {
    private unsubscribe$ = new Subject<void>();
    @lazyInject(HeroService)
    private heroService: HeroService
    heroes$: Observable<Hero[]>;
    heroes: Hero[]
    private searchTerms = new Subject<string>();

    connectedCallback(): void {
        super.connectedCallback()
        this.heroes$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.heroService.searchHeroes(term)),
            takeUntil(this.unsubscribe$)
        )
        this.heroes$.subscribe(heroes => this.heroes = heroes);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

    render() {
        html`
            <link rel="stylesheet" href="./hero-search.css">
            <div id="search-component">
                <h4><label for="search-box">Hero Search</label></h4>
                <input id="search-box" @input="${this.search}" />
                <ul class="search-result">
                    ${this.renderHeroes()}
                </ul>
            </div>
        `
    }

    renderHeroes() {
        this.heroes.map((hero) => {
            return html`
                <li>
                    <a href="/detail/${hero.id}">
                        ${hero.name}
                    </a>
                </li>
            `
        })
    }

    // Push a search term into the observable stream.
    search(event: InputEvent): void {
        const target = event.target as HTMLInputElement;
        this.searchTerms.next(target.value);
    }
}