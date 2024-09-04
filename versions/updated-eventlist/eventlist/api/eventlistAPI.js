const eventAPI = (() => {
    const BASE_EVENT_API = "http://localhost:3000/events";

    // fetchEventListAPI
    const fetchEventListAPI = async () => {
        try {
            const response = await fetch(BASE_EVENT_API);
            const eventList = await response.json();
            return eventList; 
        } catch (error) {
            console.error("Error fetching event list:", error);
            throw new Error("Failed to fetch event list");
        }
    }

    // addEventListAPI
    const addEventAPI = async (newEvent) => {
        try {
            const response = await fetch(BASE_EVENT_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEvent),
            });
            const newEventList = await response.json();
            return newEventList;
        } catch (error) {
            console.error("Error add a event:", error);
            throw new Error("Failed to add a event");
        }
    };

    // DELETE a add a event
    const deleteEventAPI = async (eventId) => {
        return fetch(`${BASE_EVENT_API}/${eventId}`,{
            method: "DELETE",
        }).then((res) => res.json());
    };

    // PATCH to update a event
    const updateEventAPI = async (eventId, updatedFields) => {
        const url = `${BASE_EVENT_API}/${eventId}`;

        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFields),
        });

        const updatedEvent = await response.json();

        return updatedEvent;
    };


    return {
        fetchEventListAPI,
        addEventAPI,
        deleteEventAPI,
        updateEventAPI,
    }

})();
