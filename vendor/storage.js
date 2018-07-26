var storage = {
    _storage: window.localStorage,
    enable: function() {
        return this._storage != undefined;
    },
    set: function(key, value) {
        if (this._storage) {
            this._storage.setItem(key, value);
        }
    },
    get: function(key) {
        var val = undefined;
        if (this._storage) {
            val = this._storage.getItem(key);
        }
        return val;
    },
    has: function(key) {
        return this.get(key) != null;
    },
    remove: function(key) {
        if (this._storage) {
            this._storage.removeItem(key);
        }
    },
    clear: function() {
        this._storage.clear();
    }
};