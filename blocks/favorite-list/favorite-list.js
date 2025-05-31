import ItemStore from "../../services/itemStore.js";
import "../favorite-item/favorite-item.js";

export default class FavoriteList extends HTMLElement {
    constructor() {
        super();
        this._store = ItemStore.getInstance();
        this._onFavoritesChange = this._onFavoritesChange.bind(this);
    }

    connectedCallback() {
        this._store.subscribe(this._onFavoritesChange);
        this._onFavoritesChange(this._store.getFavorites());
    }

    disconnectedCallback() {
        this._store.unsubscribe(this._onFavoritesChange);
    }

    _onFavoritesChange(favArray) {
        this.innerHTML = "";
        if (!favArray || favArray.length === 0) {
            this.innerHTML = "<p>No hay favoritos marcados.</p>";
            return;
        }
        favArray.forEach((item) => {
            const favItem = document.createElement("favorite-item");
            favItem.dataset.item = JSON.stringify({ id: item.id, name: item.name });
            this.appendChild(favItem);
        });
    }
}

customElements.define("favorite-list", FavoriteList);