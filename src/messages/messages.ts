import {customElement, LitElement, html} from "lit-element";
import {MessageService} from "../message-service";
import {lazyInject} from "../container";
import styles from './messages.css'

@customElement('app-messages')
class MessagesElement extends LitElement {
    @lazyInject(MessageService)
    private messageService: MessageService

    static styles = [styles]

    render() {
        return html`
            ${this.messageService.messages.length ?
            html`
                    <div>
                        <h2>Messages</h2>
                        <button class="clear"
                          @click="${this.messageService.clear}">clear</button>
                        ${this.messageService.messages.map((message) => html`<div> ${message} </div>`)}
                    </div>
                ` : null
        }
        `
    }
}