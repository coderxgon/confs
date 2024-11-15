// Get elements
const postConfessionButton = document.getElementById('postConfessionButton');
const confessionFormModal = document.getElementById('confessionFormModal');
const closeModal = document.getElementById('closeModal');
const confessionForm = document.getElementById('confessionForm');
const confessionsDisplayArea = document.getElementById('confessionsDisplayArea');

// Open the confession form
postConfessionButton.onclick = function () {
  confessionFormModal.style.display = "block";
};

// Close the confession form
closeModal.onclick = function () {
  confessionFormModal.style.display = "none";
};

// Submit the form
confessionForm.onsubmit = function (event) {
  event.preventDefault();
  const senderName = document.getElementById('senderName').value;
  const message = document.getElementById('message').value;

  // AJAX to submit confession to the server
  const formData = new FormData();
  formData.append('senderName', senderName);
  formData.append('message', message);

  fetch('submit_confession.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert("Confession posted successfully!");
      confessionFormModal.style.display = "none";
      loadConfessions(); // Reload confessions after posting
    } else {
      alert("Error posting confession!");
    }
  })
  .catch(error => console.error('Error:', error));
};

// Load confessions from the database
function loadConfessions() {
  fetch('get_confessions.php')
    .then(response => response.json())
    .then(data => {
      confessionsDisplayArea.innerHTML = '';
      data.forEach(confession => {
        const confessionBox = document.createElement('div');
        confessionBox.classList.add('confessionBox');

        const confessionContent = `
          <h2>From : ${confession.sender_name}</h2><br><hr>
          <h3>Message : ${confession.message}</h3><hr>
          <small>${confession.posted_at}</small>
          <span class="heart-react" onclick="reactToConfession(${confession.id})">❤️</span>
        `;
        confessionBox.innerHTML = confessionContent;
        confessionsDisplayArea.appendChild(confessionBox);
      });
    })
    .catch(error => console.error('Error:', error));
}

// React to confession (example function for "like" or heart reaction)
function reactToConfession(confessionId) {
  console.log("Reacting to confession:", confessionId);
  // Handle reaction logic here (e.g., update database)
}

window.onload = loadConfessions;

confessionForm.onsubmit = function (event) {
  event.preventDefault();
  const senderName = document.getElementById('senderName').value;
  const message = document.getElementById('message').value;

  // Check if fields are filled
  if (!senderName || !message) {
    alert("Please fill in both fields.");
    return;
  }

  // Prepare form data for submission
  const formData = new FormData();
  formData.append('senderName', senderName);
  formData.append('message', message);

  // Send the data to the server using AJAX
  fetch('submit_confession.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert("Confession posted successfully!");
      confessionFormModal.style.display = "none";
      loadConfessions(); // Reload confessions after posting
    } else {
      // Print error message to console for debugging
      console.error("Error:", data.error);
      alert("Error posting confession: " + data.error);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while posting the confession.');
  });
};
