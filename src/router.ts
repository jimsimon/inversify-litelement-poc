import { TemplateResult, html } from 'lit-element'
import Router from 'middle-router'

interface RouteParams {
    resolve: (result: TemplateResult) => void
    params: Record<string, unknown>
}

const router = Router()
    .use('', async ({resolve}: RouteParams) => {
        // router.navigate('/dashboard')
        resolve(html`<app-dashboard></app-dashboard>`)
    })
    .use('/dashboard', async ({resolve}: RouteParams) => {
        resolve(html`<app-dashboard></app-dashboard>`)
    })
    .use('/detail/:id', async ({params, resolve}: RouteParams) => {
        resolve(html`<app-hero-detail heroId="${params.id}"></app-hero-detail>`)
    })
    .use('heroes', async ({resolve}: RouteParams) => {
        resolve(html`<app-heroes></app-heroes>`)
    })

export default router