import {customElement, html, LitElement} from "lit-element";
import styles from './application.css'

@customElement('app-root')
class ApplicationElement extends LitElement {
    static styles = [styles]

    render() {
        return html`
            <h1>Tour of Heroes</h1>
            <nav>
              <a href="/dashboard">Dashboard</a>
              <a href="/heroes">Heroes</a>
            </nav>
            <slot></slot>
            <app-messages></app-messages>
        `
    }
}