export default class SearchCommand {
    constructor(store, onResult) {
        this.store = store;
        this.onResult = onResult;
    }

    execute(query) {
        const items = this.store.getFavorites();
        const found = items.find(item =>
            (item.name && item.name.toLowerCase().includes(query.toLowerCase())) ||
            (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
        );

        if (this.onResult) {
            this.onResult(found);
        }
    }
}