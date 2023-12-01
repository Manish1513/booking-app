document.addEventListener('DOMContentLoaded', function () {
  displayAppointments();
});

function bookAppointment() {
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (name && date && time) {
    // Retrieve existing appointments from local storage
    const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

    // Add the new appointment
    const newAppointment = {
      name: name,
      date: date,
      time: time,
    };

    existingAppointments.push(newAppointment);

    // Save the updated appointments to local storage as a JSON string
    localStorage.setItem('appointments', JSON.stringify(existingAppointments));

    // Clear form fields
    document.getElementById('name').value = '';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';

    // Refresh the displayed appointments
    displayAppointments();
  } else {
    alert('Please fill in all fields.');
  }
}

function deleteAppointment(userId) {
  // Retrieve existing appointments from local storage
  const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Find the index of the appointment to be deleted
  const indexToDelete = existingAppointments.findIndex(appointment => appointment.userId === userId);

  if (indexToDelete !== -1) {
    // Remove the appointment from the array
    existingAppointments.splice(indexToDelete, 1);

    // Save the updated appointments to local storage as a JSON string
    localStorage.setItem('appointments', JSON.stringify(existingAppointments));

    // Refresh the displayed appointments
    displayAppointments();
  }
}

function displayAppointments() {
  const appointmentsList = document.getElementById('appointmentsList');
  appointmentsList.innerHTML = '';

  // Retrieve existing appointments from local storage
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  if (appointments.length === 0) {
    appointmentsList.innerHTML = '<li>No appointments booked yet.</li>';
  } else {
    appointments.forEach(function (appointment) {
      const listItem = document.createElement('li');
      listItem.textContent = `${appointment.name} - Date: ${appointment.date}, Time: ${appointment.time}`;
      
      // Add a delete button with an onclick event to call deleteAppointment function
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteAppointment(appointment.userId));
      
      listItem.appendChild(deleteButton);
      appointmentsList.appendChild(listItem);
    });
  }
}
