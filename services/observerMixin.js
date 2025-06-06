export const observerMixin = {

    _observers: new Set(),

    subscribe(fn) {
        this._observers.add(fn);
    },

    unsubscribe(fn) {
        this._observers.delete(fn);
    },

    notify(data) {
        this._observers.forEach(fn => fn(data));
    },
};