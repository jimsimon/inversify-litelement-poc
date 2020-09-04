import {rest} from 'msw'
import {Hero} from "../hero";

export const heroes: Hero[] = [
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
        let result = heroes
        const params = req.url.searchParams;
        if (params.has('id')) {
            const id = parseInt(params.get('id'))
            const hero = heroes.find(h => h.id === id)
            result = [hero]
        } else if (params.has('name')) {
            const name = params.get('name')
            result = heroes.filter(h => h.name.includes(name))
        }
        return res(
            ctx.status(200),
            ctx.json(result)
        )
    }),
    rest.get('/api/heroes/:id', (req, res, ctx) => {
        const id = parseInt(req.params.id)
        const hero = heroes.find(h => h.id === id)
        if (hero) {
            return res(
                ctx.status(200),
                ctx.json(hero)
            )
        }
        return res(
            ctx.status(404)
        )
    }),
    rest.post('/api/heroes', (req, res, ctx) => {
        const hero = {
            ...req.body as Record<string, any>,
            id: genId(heroes)
        } as Hero
        heroes.push(hero)
        return res(
            ctx.status(201),
            ctx.json(hero)
        )
    }),
    rest.delete('/api/heroes/:id', (req, res, ctx) => {
        const id = parseInt(req.params.id)
        const index = heroes.findIndex(h => h.id === id);
        let deletedHero = {};
        if (index >= 0 ) {
            deletedHero = heroes.splice(index, 1)
        }
        return res(
            ctx.status(200),
            ctx.json(deletedHero)
        )
    }),
    rest.put('/api/heroes', (req, res, ctx) => {
        const hero = req.body as Hero
        const index = heroes.findIndex(h => h.id === hero.id)
        heroes[index] = hero
        return res(
            ctx.status(200),
            ctx.json(heroes)
        )
    })
]

function genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
}