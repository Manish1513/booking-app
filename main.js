document.addEventListener('DOMContentLoaded', function () {
    displayAppointments();
  });
  
  function bookAppointment() {
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
  
    if (name && date && time) {
      const appointment = {
        name: name,
        date: date,
        time: time,
      };
      const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
      existingAppointments.push(appointment);
      localStorage.setItem('appointments', JSON.stringify(existingAppointments));
  
      
      document.getElementById('name').value = '';
      document.getElementById('date').value = '';
      document.getElementById('time').value = '';
  
      
      displayAppointments();
    } else {
      alert('Please fill in all fields.');
    }
  }
  
  function displayAppointments() {
    const appointmentsList = document.getElementById('appointmentsList');
    appointmentsList.innerHTML = '';
  
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  
    if (appointments.length === 0) {
      appointmentsList.innerHTML = '<li>No appointments booked yet.</li>';
    } else {
      appointments.forEach(function (appointment) {
        const listItem = document.createElement('li');
        listItem.textContent = `${appointment.name} - Date: ${appointment.date}, Time: ${appointment.time}`;
        appointmentsList.appendChild(listItem);
      });
    }
  }
  