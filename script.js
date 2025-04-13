if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
  
  let reminders = [];
  
  function setReminder() {
    const name = document.getElementById("medName").value;
    const time = document.getElementById("medTime").value;
  
    if (!name || !time) {
      alert("Please enter both medicine name and time");
      return;
    }
  
    reminders.push({ name, time });
  
    const li = document.createElement("li");
    li.textContent = `${name} at ${time}`;
    document.getElementById("remindersList").appendChild(li);
  
    Notification.requestPermission();
  }
  
  setInterval(() => {
    const now = new Date();
    const currentTime = now.toTimeString().substring(0, 5); // HH:MM format
  
    reminders.forEach(reminder => {
      if (reminder.time === currentTime) {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification("💊 MedMindr", {
            body: `Time to take your medicine: ${reminder.name}`,
            icon: "https://cdn-icons-png.flaticon.com/512/4320/4320360.png",
            vibrate: [200, 100, 200],
          });
        });
  
        // Optional: remove after triggered once
        reminders = reminders.filter(r => r.time !== reminder.time);
      }
    });
  }, 30000); // check every 30 seconds
  