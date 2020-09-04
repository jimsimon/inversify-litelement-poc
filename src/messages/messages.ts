import {customElement, LitElement, html, internalProperty} from "lit-element";
import {MessageService} from "../message-service";
import {lazyInject} from "../container";
import styles from './messages.css'
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@customElement('app-messages')
class MessagesElement extends LitElement {
    @lazyInject(MessageService)
    private messageService: MessageService

    static styles = [styles]

    private unsubscribe$ = new Subject<void>();

    @internalProperty()
    private messages: string[] = [];

    connectedCallback() {
        super.connectedCallback();
        this.messageService.messages
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(message => this.messages = [...this.messages, message])
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

    render() {
        return html`
            ${this.messages.length ?
            html`
                    <div>
                        <h2>Messages</h2>
                        <button class="clear"
                          @click="${this.clearMessages}">clear</button>
                        ${this.messages.map((message) => html`<div> ${message} </div>`)}
                    </div>
                ` : null
        }
        `
    }

    clearMessages() {
        this.messages = []
    }
}