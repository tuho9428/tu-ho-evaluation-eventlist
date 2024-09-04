class EventView {
  constructor() {
    // inputs
    this.eventNameInput = document.getElementById("event-name");
    this.startDateInput = document.getElementById("start-date");
    this.endDateInput = document.getElementById("end-date");

    // table
    this.eventListTable = document.getElementById("event-list-table");

    // update
    this.eventNameUpdate = document.getElementById(`update-event-name`);
    this.startDateUpdate = document.getElementById("update-start-date");
    this.endDateUpdate = document.getElementById("update-end-date");
    this.durationDate = document.getElementById("update-duration");

    this.durationCell = document.querySelector('.event-list-item__duration')

    // Btn
    this.addBtn = document.getElementById("add-btn");
    this.saveBtn = document.getElementById("save-btn");
    this.cancelBtn = document.getElementById("cancel-btn");

    this.updateBtn = document.getElementById("update-btn");
    this.cancelUpdateBtn = document.getElementById("cancel-update-btn");
  }

  renderEventElement(event) {
    const { id, eventName, startDate, endDate } = event;

    const tbody = this.eventListTable.querySelector("tbody"); // Get the tbody element

    const row = document.createElement("tr");
    row.classList.add("event-list-item");
    row.id = id;

    const eventNameCell = document.createElement("td");
    eventNameCell.classList.add("event-list-item__event-name");
    eventNameCell.textContent = eventName;

    const startDateCell = document.createElement("td");
    startDateCell.classList.add("event-list-item__start-date");
    startDateCell.textContent = startDate;

    const endDateCell = document.createElement("td");
    endDateCell.classList.add("event-list-item__end-date");
    endDateCell.textContent = endDate;

    const durationCell = document.createElement("td");
    durationCell.classList.add("event-list-item__duration");


    const durationDays = (new Date(endDate).getTime() - new Date(startDate).getTime())/ (1000*3600*24);
    const durationPeriod = durationDays >= 0 ? durationDays : 0;

    durationCell.textContent = durationPeriod;

    const actionCell = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-primary", "event-list-item__edit");

    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-secondary", "event-list-item__delete");

    deleteBtn.textContent = "Delete";

    // Update input fields for editing
    const updateInputField = document.createElement("tr");
    updateInputField.id = `update-input-field-${id}`;
    updateInputField.classList.add("update-input-field", "hidden");

    const nameInputCell = document.createElement("td");

    const nameInput = document.createElement("input");
    nameInput.id = `update-event-name-${id}`;
    nameInput.type = "text";
    nameInput.placeholder = "Event Name";

    const startDateInputCell = document.createElement("td");

    const startDateInput = document.createElement("input");
    startDateInput.id = `update-start-date-${id}`;
    startDateInput.type = "date";
    startDateInput.placeholder = "Start Date";

    const endDateInputCell = document.createElement("td");

    const endDateInput = document.createElement("input");
    endDateInput.id = `update-end-date-${id}`;
    endDateInput.type = "date";
    endDateInput.placeholder = "End Date";

    const durationInputCell = document.createElement("td");
    durationInputCell.id = `update-duration-${id}`;

    const actionInputCell = document.createElement("td");

    const updateBtn = document.createElement("button");
    updateBtn.id = `update-btn-${id}`;
    updateBtn.classList.add("btn", "btn-primary", "update-btn");
    updateBtn.textContent = "Update";
    updateBtn.setAttribute("data-event-id", id);

    const cancelUpdateBtn = document.createElement("button");
    cancelUpdateBtn.id = `cancel-update-btn-${id}`;
    cancelUpdateBtn.classList.add("btn", "btn-secondary", "cancel-update-btn");
    cancelUpdateBtn.textContent = "Cancel Update";
    cancelUpdateBtn.setAttribute("data-event-id", id);

    nameInputCell.appendChild(nameInput);
    startDateInputCell.appendChild(startDateInput);
    endDateInputCell.appendChild(endDateInput);
    actionInputCell.appendChild(updateBtn);
    actionInputCell.appendChild(cancelUpdateBtn);

    updateInputField.appendChild(nameInputCell);
    updateInputField.appendChild(startDateInputCell);
    updateInputField.appendChild(endDateInputCell);
    updateInputField.appendChild(actionInputCell);
    updateInputField.appendChild(durationInputCell);

    // end

    actionCell.appendChild(editBtn);
    actionCell.appendChild(deleteBtn);

    row.appendChild(eventNameCell);
    row.appendChild(startDateCell);
    row.appendChild(endDateCell);
    row.appendChild(actionCell);
    row.appendChild(durationCell);

    tbody.appendChild(row);
    tbody.appendChild(updateInputField);
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

  showUpdateInputFields(id) {
    const updateInputField = document.getElementById(
      `update-input-field-${id}`
    );
    if (updateInputField) {
      updateInputField.classList.remove("hidden");
    } else {
      console.error("Error: update input field element not found.");
    }

    const eventItem = document.getElementById(`${id}`);
    if (eventItem) {
      eventItem.classList.add("hidden");
    } else {
      console.error("Error: Event element not found.");
    }
  }

  cancelUpdateEvent(id) {
    const updateField = document.getElementById(`update-input-field-${id}`);
    this.cancelUpdateBtn = document.getElementById(`cancel-update-btn-${id}`);
    if (updateField) {
      updateField.classList.add("hidden");
    }
    else {
      console.error("Error: updateField not found.");
    }

    const updateFieldShow = document.getElementById(`${id}`);
    if (updateFieldShow) {
      updateFieldShow.classList.remove("hidden");
    }
    else {
      console.error("Error: updateFieldShow not found.");
    }
  }


  //inputValidation
  inputValidation() {
    const eventName = this.eventNameInput.value.trim();
    const startDate = this.startDateInput.value.trim();
    const endDate = this.endDateInput.value.trim();

    if (eventName === "" || startDate === "" || endDate === "") {
      return false; // Return false if any input field is empty
    }

    return true; // Return true if all input fields are not empty
  }

    //inputValidation
    updateValidation() {
      const eventNameUpdate = this.eventNameUpdate.value.trim();
      const startDateUpdate = this.startDateUpdate.value.trim();
      const endDateUpdate = this.endDateUpdate.value.trim();
  
      if (eventNameUpdate === "" || startDateUpdate === "" || endDateUpdate === "") {
        return false; // Return false if any input field is empty
      }
  
      return true; // Return true if all input fields are not empty
    }


  showUpdateFieldsWithId(id, eventItem){
    this.eventNameUpdate = document.getElementById(`update-event-name-${id}`);
    this.startDateUpdate = document.getElementById(`update-start-date-${id}`);
    this.endDateUpdate = document.getElementById(`update-end-date-${id}`);
    this.durationUpdate = document.getElementById(`update-duration-${id}`);

    this.eventNameUpdate.value = eventItem.eventName;
    this.startDateUpdate.value = eventItem.startDate;
    this.endDateUpdate.value = eventItem.endDate;
  }

  updateDuration(eventId, updatedFields) {
    const { startDate, endDate } = updatedFields;
  
    // Calculate the duration in days
    const startDateValue = new Date(startDate);
    const endDateValue = new Date(endDate);
    const durationDays = (endDateValue - startDateValue) / (1000 * 3600 * 24);
    console.log("durationDays",durationDays);
    const durationPeriod = durationDays >= 0 ? durationDays : 0;
    console.log("durationPeriod",durationPeriod);


    const eventItem = document.getElementById(eventId);
    const duration = eventItem.querySelector(".event-list-item__duration");

    // Update the duration display with calculated days
    if (duration) {
      duration.textContent = durationPeriod; // Ensure non-negative duration
    }
  }
  
  

}
