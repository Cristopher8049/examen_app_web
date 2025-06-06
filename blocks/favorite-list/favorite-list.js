import ItemStore from "../../services/itemStore.js";
import "../favorite-item/favorite-item.js";

export default class FavoriteList extends HTMLElement {
    constructor() {
        super();
        this._store = ItemStore.getInstance();
    }

    connectedCallback() {
        document.addEventListener("liked", () => {
            this.render();
        })

        this.render();
    }

    render() {
        const favArray = this._store.getFavorites();

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

    disconnectedCallback() {
        this._store.unsubscribe();
    }

}

customElements.define("favorite-list", FavoriteList);