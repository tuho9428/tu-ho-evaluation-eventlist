class EventView {
  constructor() {
    // inputs
    this.eventNameInput = document.getElementById("event-name");
    this.startDateInput = document.getElementById("start-date");
    this.endDateInput = document.getElementById("end-date");
    // add form
    this.addEventListForm = document.getElementById("add-event-list-form");
    // event-list div
    this.eventList = document.getElementById("event-list");
    // table
    this.eventListTable = document.getElementById("event-list-table");

    // update
    this.eventNameUpdate = document.getElementById("update-event-name");
    this.startDateUpdate = document.getElementById("update-start-date");
    this.endDateUpdate = document.getElementById("update-end-date");
    // update form
    this.updateEventListForm = document.getElementById(
      "update-event-list-form"
    );
    // Btn
    this.addBtn = document.getElementById("add-btn");
    this.saveBtn = document.getElementById("save-btn");
    this.cancelBtn = document.getElementById("cancel-btn");

    this.updateBtn = document.getElementById("update-btn");
    this.cancelUpdateBtn = document.getElementById("cancel-update-btn");

    this.eventDuration = document.querySelector(".event-list-item__duration");
  }

  renderEventElement(event) {
    const { id, eventName, startDate, endDate } = event;

    const row = document.createElement("tr");
    row.classList.add("event-list-item");
    row.id = id;

    const eventNameCell = document.createElement("td");
    eventNameCell.classList.add("event-list-item__event-name");
    eventNameCell.textContent = eventName;

    const startDateCell = document.createElement("td");
    startDateCell.classList.add("event-list-item__start-date");
    startDateCell.textContent = startDate.slice(0,10);

    const endDateCell = document.createElement("td");
    endDateCell.classList.add("event-list-item__end-date");
    endDateCell.textContent = endDate.slice(0,10);

    const actionCell = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-primary", "event-list-item__edit");
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-secondary", "event-list-item__delete");
    deleteBtn.textContent = "Delete";

    const durationCell = document.createElement("td");
    durationCell.classList.add("event-list-item__duration");

    durationCell.textContent = (new Date(endDate).getTime() - new Date(startDate).getTime())/ (1000*3600*24);

    actionCell.appendChild(editBtn);
    actionCell.appendChild(deleteBtn);

    row.appendChild(eventNameCell);
    row.appendChild(startDateCell);
    row.appendChild(endDateCell);
    row.appendChild(durationCell);
    row.appendChild(actionCell);

    this.eventListTable.appendChild(row);
  }

  deleteEventElements(eventId) {
    const rowToRemove = document.getElementById(eventId);
    if (rowToRemove) {
      rowToRemove.remove();
    } else {
      console.log("Row with id " + eventId + " does not exist.");
    }
  }

  updateEventElements(eventId) {
    const eventItem = document.getElementById(eventId);
    const eventName = eventItem.querySelector(".event-list-item__event-name");
    const eventStartDate = eventItem.querySelector(
      ".event-list-item__start-date"
    );
    const eventEndDate = eventItem.querySelector(".event-list-item__end-date");
    const eventDuration = eventItem.querySelector(".event-list-item__duration");

    // Update eventName if input is not empty
    if (this.eventNameUpdate.value.trim() !== "") {
      eventName.textContent = this.eventNameUpdate.value.trim();
    }

    // Update eventStartDate if input is not empty
    if (this.startDateUpdate.value.trim() !== "") {
      eventStartDate.textContent = this.startDateUpdate.value.trim();
    }

    // Update eventEndDate if input is not empty
    if (this.endDateUpdate.value.trim() !== "") {
      eventEndDate.textContent = this.endDateUpdate.value.trim();
    }

    
    eventDuration.textContent = this.endDateUpdate.value.trim();

  }

  // show add InputFields
  showInputFields() {
    const inputField = document.getElementById("input-field");
    inputField.classList.toggle("hidden");
  }

  // cancel add event
  hideInputFields() {
    const inputField = document.getElementById("input-field");
    inputField.classList.add("hidden");
  }

  // show Update Input Fields
  showUpdateInputFields() {
    const inputField = document.getElementById("update-input-field");
    inputField.classList.remove("hidden");
  }

  // hide Update Input Fields
  cancelUpdateEvent() {
    const updateField = document.getElementById("update-input-field");
    updateField.classList.add("hidden");
  }
}
