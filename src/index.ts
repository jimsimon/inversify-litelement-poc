import 'reflect-metadata'

import { Container, injectable } from "inversify";
import { LitElement, html, customElement } from 'lit-element'
import getDecorators from "inversify-inject-decorators";

@injectable()
class HelloWorldService {
    sayHi () {
        console.log('hi')
    }
}

const container = new Container({
    autoBindInjectable: true,
    skipBaseClassChecks: true
})
const { lazyInject } = getDecorators(container)

@customElement('hello-world')
class HelloWorldElement extends LitElement {
    @lazyInject(HelloWorldService)
    private service: HelloWorldService

    render() {
        return html`<p>Hello World</p><button @click="${this.service.sayHi}">Click Me</button>`
    }
}

document.body.innerHTML = '<hello-world></hello-world>'