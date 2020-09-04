import {customElement, LitElement, html, internalProperty} from "lit-element";
import {MessageService} from "../message-service";
import {lazyInject} from "../container";
import globalStyles from '../global-styles.css'
import styles from './messages.css'
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@customElement('app-messages')
class MessagesElement extends LitElement {
    static styles = [globalStyles, styles]

    @lazyInject(MessageService)
    private messageService: MessageService

    @internalProperty()
    private messages: string[] = [];

    private unsubscribe$ = new Subject<void>();

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