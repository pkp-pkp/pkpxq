import * as Pinia from 'pinia';
export {useAppStore} from './app'
export {useUserStore} from './user'

const pinia = Pinia.createPinia();
export default pinia;
