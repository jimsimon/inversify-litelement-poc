import {rest} from 'msw'
import {Hero} from "../hero";

export const HEROES: Hero[] = [
    {id: 11, name: 'Dr Nice'},
    {id: 12, name: 'Narco'},
    {id: 13, name: 'Bombasto'},
    {id: 14, name: 'Celeritas'},
    {id: 15, name: 'Magneta'},
    {id: 16, name: 'RubberMan'},
    {id: 17, name: 'Dynama'},
    {id: 18, name: 'Dr IQ'},
    {id: 19, name: 'Magma'},
    {id: 20, name: 'Tornado'}
];

export const handlers = [
    rest.get('/api/heroes', (req, res, ctx) => {
        let result = HEROES
        const params = req.url.searchParams;
        if (params.has('id')) {
            const id = params.get('id')
            const hero = HEROES.find(h => h.id === parseInt(id))
            result = [hero]
        } else if (params.has('name')) {
            const name = params.get('name')
            result = HEROES.filter(h => h.name.includes(name))
        }
        return res(
            ctx.status(200),
            ctx.json(result)
        )
    }),
    rest.get('/api/heroes/:id', (req, res, ctx) => {
        const id = req.params.id
        const hero = HEROES.find(h => h.id === parseInt(id))
        if (hero) {
            return res(
                ctx.status(200),
                ctx.json(hero)
            )
        }
        return res(
            ctx.status(404)
        )
    })
]

function genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
}