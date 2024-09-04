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

  }

  renderEventElement(event) {
    const { id, eventName, startDate, endDate } = event;

    const eventItem = document.createElement("div");
    eventItem.classList.add("event-list-item");
    eventItem.id = id;

    const eventNameItem = document.createElement("div");
    eventNameItem.classList.add("event-list-item__event-name");
    eventNameItem.textContent = eventName;

    const eventStartDate = document.createElement("div");
    eventStartDate.classList.add("event-list-item__start-date");
    eventStartDate.textContent = startDate;

    const eventEndDate = document.createElement("div");
    eventEndDate.classList.add("event-list-item__end-date");
    eventEndDate.textContent = endDate;

    const editBtn = document.createElement("button");
    editBtn.classList.add("event-list-item__edit");
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("event-list-item__delete");
    deleteBtn.textContent = "Delete";
    
    eventItem.append(eventNameItem, eventStartDate, eventEndDate, editBtn, deleteBtn);
    this.eventList.appendChild(eventItem);
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

    // Update name if input is not empty
    if (this.eventNameUpdate.value.trim() !== "") {
      eventName.textContent = this.eventNameUpdate.value.trim();
    }

    // Update start date if input is not empty
    if (this.startDateUpdate.value.trim() !== "") {
      eventStartDate.textContent = this.startDateUpdate.value.trim();
    }

    // Update end date if input is not empty
    if (this.endDateUpdate.value.trim() !== "") {
      eventEndDate.textContent = this.endDateUpdate.value.trim();
    }
  }

//   // show add InputFields
//   showInputFields() {
//     const inputField = document.getElementById("input-field");
//     inputField.classList.toggle("hidden");
//   }

//   // cancel add event
//   hideInputFields() {
//     const inputField = document.getElementById("input-field");
//     inputField.classList.add("hidden");
//   }


//   showUpdateInputFields() {
//     const inputField = document.getElementById("update-input-field");
//     inputField.classList.remove("hidden");
//   }

//   cancelUpdateEvent() {
//     const updateField = document.getElementById("update-input-field");
//     updateField.classList.add("hidden");
// }

}
