import apiItems from "../../services/apiItems.js";
import "../item-card/item-card.js";

export default class ItemList extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const items = await apiItems.getItems();
        this._render(items);
    }

    _render(items) {
        this.innerHTML = "";
        if (!items || items.length === 0) {
            this.innerHTML = "<p>No hay ítems para mostrar.</p>";
            return;
        }
        items.forEach((item) => {
            const card = document.createElement("item-card");
            card.dataset.item = JSON.stringify({ id: item.id, name: item.name });
            this.appendChild(card);
        });
    }
}

customElements.define("item-list", ItemList);