import {customElement, LitElement, html} from "lit-element";
import {MessageService} from "../message-service";
import { lazyInject } from "../container";

@customElement('app-messages')
class MessagesElement extends LitElement {
    @lazyInject(MessageService)
    private messageService: MessageService

    render() {
        html `
            <link rel="stylesheet" href="./messages.css">
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