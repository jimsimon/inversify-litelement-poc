import 'reflect-metadata'

import './hmr'
import './dashboard/dashboard'
import './hero-detail/hero-detail'
import './hero-search/hero-search'
import './heroes/heroes'
import './messages/messages'
import { render } from 'lit-html'
import router from './router'
import { TemplateResult, html } from 'lit-element'

router.on('route', async (args: any, routing: Promise<TemplateResult>) => {
    const view = await routing
    if (view) {
        render(html`
            <link rel="stylesheet" href="./index.css">
            <h1>Tour of Heroes</h1>
            <nav>
              <a href="/dashboard">Dashboard</a>
              <a href="/heroes">Heroes</a>
            </nav>
            ${await routing}
            <app-messages></app-messages>
        `, document.body)
    }
}).start()


// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept()
}