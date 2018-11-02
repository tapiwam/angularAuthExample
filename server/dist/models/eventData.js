"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventData = function EventData() {
    _classCallCheck(this, EventData);

    this.getEventData = function (count) {
        var data = [];
        for (var i = 1; i < count; i++) {
            data.push({
                "_id": i,
                "name": "Auto Expo " + 1,
                "description": "lorem ipsum",
                "date": new Date()
            });
        }

        return data;
    };

    this.events = this.getEventData(20);
    this.special = this.getEventData(8);
};

module.exports = EventData;