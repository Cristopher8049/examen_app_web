import ItemStore from "../../services/itemStore.js";

export default class ItemCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._store = ItemStore.getInstance();
  }

  connectedCallback() {
    const tpl = document.getElementById("item-card-template");
    const clone = tpl.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);

    const item = JSON.parse(this.dataset.item);

    this.nameSpan = this.shadowRoot.querySelector(".item-card__name");
    this.heartSpan = this.shadowRoot.querySelector(".item-card__heart");

    this.nameSpan.textContent = item.name;

    if (this._store.has(item.id)) {
      this.heartSpan.textContent = "♥";
      this.heartSpan.classList.add("heart--liked");
    } else {
      this.heartSpan.textContent = "♡";
    }

    this.heartSpan.addEventListener("click", () => {
      this._store.toggle({ id: item.id, name: item.name });
      if (this._store.has(item.id)) {
        this.heartSpan.textContent = "♥";
        this.heartSpan.classList.add("heart--liked");
      } else {
        this.heartSpan.textContent = "♡";
        this.heartSpan.classList.remove("heart--liked");
      }

      this.dispatchEvent(new Event("liked", { bubbles: true, composed: true }))
    });
  }
}

customElements.define("item-card", ItemCard);