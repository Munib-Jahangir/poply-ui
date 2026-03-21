import type { App, Plugin } from 'vue';
import Poply from '../../core/Poply';

export const poplySymbol = Symbol('poply');

export const PoplyVue: Plugin = {
    install(app: App) {
        app.config.globalProperties.$poply = Poply;
        app.provide(poplySymbol, Poply);
    }
};

export function usePoply() {
    return Poply;
}

export default PoplyVue;
