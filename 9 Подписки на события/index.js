module.exports = {

    allNotes : [],
    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        this.allNotes.push({event : event , subscriber : subscriber, handler : handler});
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        this.allNotes = this.allNotes.filter(function (note) {
            return note.event !== event || note.subscriber !== subscriber;
        });

        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        this.allNotes.forEach(function (note) {
            if (event === note.event) {
                note.handler.call(note.subscriber);
            }
        });

        return this;
    }
};
