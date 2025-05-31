import ItemStore from "../../services/itemStore.js";

export default class SaveButton extends HTMLElement {
    constructor() {
        super();
        const tpl = document.getElementById("save-button-template");
        const clone = tpl.content.cloneNode(true);
        this.appendChild(clone);

        this._btn = this.querySelector(".save-button__btn");
        this._store = ItemStore.getInstance();
    }

    connectedCallback() {
        this._btn.addEventListener("click", () => {
            this._store.commit();
        });
    }
}

customElements.define("save-button", SaveButton);