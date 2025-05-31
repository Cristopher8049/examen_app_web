import { observerMixin } from "./observerMixin.js";
import LocalStorage from "./localStorage.js";

class ItemStore {
    constructor() {

        observerMixin.init.call(this);

        this.favorites = LocalStorage.loadFavorites();
    }

    static getInstance() {
        if (!ItemStore._instance) {
            ItemStore._instance = new ItemStore();
        }
        return ItemStore._instance;
    }


    add(item) {
        if (!this.has(item.id)) {
            this.favorites.push(item);
        }
    }

    remove(id) {
        this.favorites = this.favorites.filter((x) => x.id !== id);
    }

    toggle(item) {
        this.has(item.id) ? this.remove(item.id) : this.add(item);
    }

    has(id) {
        return this.favorites.some((x) => x.id === id);
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