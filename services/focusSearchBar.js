export default class FocusSearchCommand {
    constructor(searchBarPageElement) {
        this.searchBarPageElement = searchBarPageElement;
    }

    execute() {
        if (!this.searchBarPageElement) return;

        const input = this.searchBarPageElement.shadowRoot.querySelector('.search-bar__input');
        if (input) {
            input.focus();
            console.log('Search bar focused!');
        }
    }
}