const sanitizeHtml = require('sanitize-html');
const ent = require('ent');

const boolean = function (dirty) {
    let clean = false;
    if (dirty === true) clean = true;
    return clean;
}

const string = function (dirty) {
    let clean = '';
    if (dirty && dirty.constructor === String) {
        clean = unescape(dirty);
        clean = sanitizeHtml(clean, {
            allowedTags: []
        });
        clean = ent.decode(clean);
    }
    return clean;
}

const object = function (dirty) {
    if (!dirty) {
        return null;
    }
    const constructor = dirty.constructor;
    const keys = Object.keys(dirty);

    if (constructor === String) {
        dirty = string(dirty);

    } else if (constructor === Array) {

        for (let i = 0; i < dirty.length; i++) {
            dirty[i] = object(dirty[i]);
        }

    } else if (constructor === Object && keys && keys.length) {

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            if ((/^\$/).test(key)) {
                delete dirty[key];
            } else {
                dirty[key] = object(dirty[key]);
            }
        }

    } else if (
        constructor !== Boolean
        && (constructor !== Date || isNaN(dirty.getTime()))
        && (constructor !== Number || isNaN(dirty))
    ) {
        dirty = undefined;
    }
    return dirty;
}

module.exports = {
    boolean,
    string,
    object
};