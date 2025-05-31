import BaseHTMLElement from "../base/BaseHTMLElement.js";
import ItemStore from "../../services/itemStore.js";
import SearchCommand from "../../services/searchCommand.js";

export default class SearchBarPage extends BaseHTMLElement {

    constructor() {
        super();
        this.currentItem = null;
        this.command = new SearchCommand(ItemStore.getInstance(), result => this.showResult(result));
    }

    async connectedCallback() {
        const blockContent = document.getElementById('search-bar-template').content.cloneNode(true);
        this.shadowRoot.appendChild(blockContent);
        await this.loadCSS("/blocks/searchBar/searchBar.css");

        this.addListeners();
    }

    addListeners() {
        const input = this.shadowRoot.querySelector('.search-bar__input');
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = input.value.trim();
                if (query !== '') {
                    this.command.execute(query);
                }
            }
        });
    }

    showResult(result) {
        const resultEl = this.shadowRoot.querySelector('.search-bar__result');
        this.currentItem = result;

        if (!result) {
            resultEl.textContent = 'No item found.';
        } else {
            resultEl.textContent = `Found: ${result.name} ` + (result.favorite ? 'is favorite ♥︎' : 'is not favorite');
        }
    }

    getCurrentItem() {
        return this.currentItem;
    }
}

customElements.define("search-bar-page", SearchBarPage);