class EventModel {
    #events;
    constructor() {
        this.#events = [];
    }

    setEvents(events){
        this.#events = events;
    }

    getEvents() {
        return [...this.#events];
    }

    addEvent(newEvent) {
        this.#events.push(newEvent);
    }

    updateEvent(updateEvent) {
        this.#events = this.#events.map((event) => {
            if (event.id === updateEvent.id) {
                return { ...event, ...updateEvent};
            }
            return event;
        });
    }

    removeEvent(id) {
        this.#events = this.#events.filter((event) => {
            return event.id !== id;
        });
    }
}