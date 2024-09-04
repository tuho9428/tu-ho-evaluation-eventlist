class EventController {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;
    this.initApp();
    this.currentEventId = null;
  }

  initApp() {
    this.setUpEvents();
    this.fetchEvents();
  }

  setUpEvents() {
    this.setUpAddEvent();
    this.setUpDeleteEvent();
    this.setUpEditEvent();
    this.setUpUpdateEvent();
    this.setUpShowInputFieldsEvent();
    this.setUpHideInputFieldsEvent();
    this.setUpCancelUpdateEvent();
  }

  fetchEvents() {
    eventAPI.fetchEventListAPI().then((events) => {
      this.#model.setEvents(events);
      events.forEach((event) => {
        this.#view.renderEventElement(event);
      });
    });
  }

  setUpAddEvent() {
    this.#view.saveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // new add
      if (!this.#view.inputValidation()) {
        alert("Please fill in all the fields before adding an event.");
        return;
      }

      const newEvent = {
        eventName: this.#view.eventNameInput.value,
        startDate: this.#view.startDateInput.value,
        endDate: this.#view.endDateInput.value,
      };

      eventAPI.addEventAPI(newEvent).then((_newEvent) => {
        this.#model.addEvent(_newEvent);
        this.#view.renderEventElement(_newEvent);
      });
      this.#view.hideInputFields();
    });
  }

  setUpDeleteEvent() {
    this.#view.eventListTable.addEventListener("click", (e) => {
      if (e.target.classList.contains("event-list-item__delete")) {
        const eventId = e.target.closest("tr").getAttribute("id");
        eventAPI.deleteEventAPI(eventId).then(() => {
          this.#model.removeEvent(eventId);
          this.#view.deleteEventElements(eventId);
        });
      }
    });
  }

  // edit
  setUpEditEvent() {
    this.#view.eventListTable.addEventListener("click", (e) => {
      if (e.target.classList.contains("event-list-item__edit")) {
        this.currentEventId = e.target.closest("tr").getAttribute("id");
        const eventItem = this.#model
          .getEvents()
          .find((event) => event.id === this.currentEventId);

        // Populate input fields with existing values
        this.#view.showUpdateFieldsWithId(this.currentEventId, eventItem);
        this.#view.showUpdateInputFields(this.currentEventId);
      }
    });
  }

  // do update
  setUpUpdateEvent() {
    this.#view.eventListTable.addEventListener("click", (e) => {
      if (e.target.classList.contains("update-btn")) {
        const eventId = e.target.getAttribute("data-event-id");
        if (!this.#view.updateValidation()) {
          alert("Please fill in all the fields before adding an event.");
          return;
        }
        const updatedFields = {
          eventName: this.#view.eventNameUpdate.value,
          startDate: this.#view.startDateUpdate.value,
          endDate: this.#view.endDateUpdate.value,
        };

        eventAPI
          .updateEventAPI(eventId, updatedFields)
          .then((updatedEventItem) => {
            this.#model.updateEvent(updatedEventItem);
            this.#view.updateEventElements(eventId);
            this.#view.updateDuration(eventId, updatedFields);

          });

        this.#view.cancelUpdateEvent(eventId);
      }
    });

  }

  // setUp Show Input Fields Event
  setUpShowInputFieldsEvent() {
    this.#view.addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.#view.showInputFields();
      // clear inputs
      this.#view.eventNameInput.value = "";
      this.#view.startDateInput.value = "";
      this.#view.endDateInput.value = "";
    });
  }

  // cancel add Event
  setUpHideInputFieldsEvent() {
    this.#view.cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.#view.hideInputFields();
      // clear inputs
      this.#view.eventNameInput.value = "";
      this.#view.startDateInput.value = "";
      this.#view.endDateInput.value = "";
    });
  }

  // cancel update Event
  setUpCancelUpdateEvent() {
    this.#view.eventListTable.addEventListener("click", (e) => {
      if (e.target.classList.contains("cancel-update-btn")) {
        const eventId = e.target.getAttribute("data-event-id");
        this.#view.cancelUpdateEvent(eventId);
      }
    });
  }
}
