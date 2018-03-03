var _dot = require('@websanova/vue-dot');

module.exports = (function () {

    function _http(data) {
        this.options.Vue.http(data).then(data.success.bind(this), data.error.bind(this));
    }

    function _parseResponse(res) {
        return res.data.data;
    }

    var _defaultOptions = {
        fetchData: {
            url: 'properties',
            success: function (res) {
                _dot.merge(this.watch.data, _parseResponse(res));

                this.watch.loaded = true;
            },
            error: function (res) {
                // TODO: ?
            }
        },
        http: _http
    };

    function Property(options, properties) {
        this.options = Object.assign({}, _defaultOptions, options || {});

        this.watch = new options.Vue({
            data: function () {
                return {
                    loaded: options.preload === false ? true : false,
                    data: properties || {}
                };
            }
        });
    }

    Property.prototype.loaded = function() {
        return this.watch.loaded;
    };

    Property.prototype.get = function(key, def) {
        return _dot.get(key, this.watch.data) || def;
    };

    Property.prototype.set = function(key, val) {
        _dot.set(key, val, this.watch.data);
    };

    Property.prototype.fetch = function() {
        this.options.http.call(this, this.options.fetchData);
    };

    return function install(Vue, options, properties) {
        var property;

        options = options || {};

        options.Vue = Vue;

        property = new Property(options, properties);

        Vue.property = property;

        if (options.preload !== false) {
            property.fetch();
        }

        Object.defineProperties(Vue.prototype, {
            $property: {
                get: function() {
                    return property;
                }
            }
        });
    }
})();