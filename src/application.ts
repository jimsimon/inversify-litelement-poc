import {customElement, html, LitElement} from "lit-element";
import globalStyles from './global-styles.css'
import styles from './application.css'
import { lazyInject } from "./container";
import {RouterService} from "./router-service";

@customElement('app-root')
class ApplicationElement extends LitElement {
    @lazyInject(RouterService)
    private router: RouterService;

    static styles = [globalStyles, styles]

    render() {
        return html`
            <h1>Tour of Heroes</h1>
            <nav>
              <a @click="${this.router.navigateToDashboard}">Dashboard</a>
              <a @click="${this.router.navigateToHeroes}">Heroes</a>
            </nav>
            <slot></slot>
            <app-messages></app-messages>
        `
    }
}