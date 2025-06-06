const observers = new Set();

function subscribe(fn) {
    observers.add(fn);
}

function unsubscribe(fn) {
    observers.delete(fn);
}

function notify() {
    observers.forEach(fn => fn());
}



const state = {
    favorites: []
}

const proxyState = new Proxy(state, {
    set(target, prop, value) {
        target[prop] = value;

        notify();

        return proxy;
    }
})