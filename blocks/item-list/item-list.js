import apiItems from "../../services/apiItems.js";
import "../item-card/item-card.js";
import ItemStore from "../../services/itemStore.js";

export default class ItemList extends HTMLElement {
    constructor() {
        super();
        this._store = ItemStore.getInstance();
        this._onStoreChange = this._onStoreChange.bind(this);
    }

    async connectedCallback() {
        this._store.subscribe(this._onStoreChange);
        const items = await apiItems.getItems();
        this._items = items;
        this._render();
    }

    disconnectedCallback() {
        this._store.unsubscribe(this._onStoreChange);
    }

    _onStoreChange() {
        this._render();
    }

    _render() {
        this.innerHTML = "";
        if (!this._items || this._items.length === 0) {
            this.innerHTML = "<p>No hay ítems para mostrar.</p>";
            return;
        }
        this._items.forEach((item) => {
            const card = document.createElement("item-card");
            card.dataset.item = JSON.stringify({ id: item.id, name: item.name });
            this.appendChild(card);
        });
    }
}

customElements.define("item-list", ItemList);