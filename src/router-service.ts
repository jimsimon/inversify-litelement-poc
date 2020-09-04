import {injectable} from "inversify";
import router from './router'

@injectable()
export class RouterService {
    navigateToDashboard() {
        router.navigate('/dashboard')
    }

    navigateToHeroes() {
        router.navigate('/heroes')
    }

    navigateToHeroDetail(id: number) {
        router.navigate(`/detail/${id}`)
    }

    goBack(): void {
        router.back()
    }
}