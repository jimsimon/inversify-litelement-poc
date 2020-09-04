import 'reflect-metadata'

// import './hmr'
import './dashboard/dashboard'
import './hero-detail/hero-detail'
import './hero-search/hero-search'
import './heroes/heroes'
import './messages/messages'
import './application'
import {worker} from './mocks/browser'
import {render} from 'lit-html'
import router from './router'
import {TemplateResult, html} from 'lit-element'

worker.start()

router.on('route', async (args: any, routing: Promise<TemplateResult>) => {
    const view = await routing
    if (view) {
        render(html`
            <style>
                body {
                    margin: 2em;
                    color: #333;
                    font-family: Cambria, Georgia;
                }
            </style>
            <app-root>
                ${view}
            </app-root>
        `, document.body)
    }
}).start()

// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept()
}