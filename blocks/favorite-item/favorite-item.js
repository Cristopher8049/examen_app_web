import ItemStore from "../../services/itemStore.js";

export default class FavoriteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._store = ItemStore.getInstance();
    }

    connectedCallback() {
        const tpl = document.getElementById("favorite-item-template");
        const clone = tpl.content.cloneNode(true);
        this.shadowRoot.appendChild(clone);

        const item = JSON.parse(this.dataset.item);

        this.nameSpan = this.shadowRoot.querySelector(".favorite-item__name");
        this.removeBtn = this.shadowRoot.querySelector(".favorite-item__remove-btn");

        this.nameSpan.textContent = item.name;

        this.removeBtn.addEventListener("click", () => {
            this._store.remove(item.id);
            this.remove();
        });
    }
}

customElements.define("favorite-item", FavoriteItem);