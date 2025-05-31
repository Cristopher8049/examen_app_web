
const apiItems = {
    async getItems() {
        try {
            const response = await fetch("./data/items.json");
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("apiItems.getItems:", error);
            return [];
        }
    },
};

export default apiItems;