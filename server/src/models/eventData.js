

class EventData {

    constructor() {
        this.events = this.getEventData(20);
        this.special = this.getEventData(8);
    }

    getEventData = (count) => {
        let data = [];
        for (let i=1; i<count; i++){
            data.push({
                "_id" : i,
                "name": "Auto Expo " + 1,
                "description": "lorem ipsum",
                "date": new Date()
            });
        }

        return data;
    }

}

module.exports = EventData;




