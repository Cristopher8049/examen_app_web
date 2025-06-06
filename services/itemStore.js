import { observerMixin } from "./observerMixin.js";
import LocalStorage from "./localStorage.js";

class ItemStore {

    favorites = LocalStorage.loadFavorites();
    s
    static _instance = null;

    static {
        this._instance = new ItemStore();
    }

    constructor() {
        if (ItemStore._instance) {
            throw new Error("Ya existe una instancia!!!")
        }

    }

    static getInstance() {
        return this._instance;
    }


    add(item) {
        if (!this.has(item.id)) {
            this.favorites.push(item);
            this.notify();
        }

    }

    remove(id) {
        this.favorites = this.favorites.filter((x) => x.id !== id);
        this.notify();
    }

    toggle(item) {
        this.has(item.id) ? this.remove(item.id) : this.add(item);
        this.notify();

    }

    has(id) {
        return this.favorites.find((x) => x.id === id);
    }

    getFavorites() {
        return [...this.favorites];
    }

    commit() {
        LocalStorage.saveFavorites(this.favorites);
        this.notify(this.getFavorites());
    }
}

Object.assign(ItemStore.prototype, observerMixin);

export default ItemStore;