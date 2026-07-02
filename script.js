const nameInput = document.getElementById("nameInput");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messagesList = document.getElementById("messagesList");

sendButton.addEventListener("click", function () {
  const userName = nameInput.value.trim();
  const userMessage = messageInput.value.trim();

  if (userName === "" || userMessage === "") {
    alert("Заполните имя и сообщение");
    return;
  }

  const formData = new FormData();
  formData.append("name", userName);
  formData.append("text", userMessage);

  fetch("save.php", {
    method: "POST",
    body: formData
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.success) {
        nameInput.value = "";
        messageInput.value = "";
        loadMessages();
      } else {
        alert(data.message);
      }
    })
    .catch(function (error) {
      console.log("Ошибка:", error);
      alert("Не получилось сохранить сообщение");
    });
});

function loadMessages() {
  fetch("load.php")
    .then(function (response) {
      return response.json();
    })
    .then(function (messages) {
      messagesList.innerHTML = "";

      messages.forEach(function (message) {
        addMessageToPage(
          message.name,
          message.text,
          message.time
        );
      });
    })
    .catch(function (error) {
      console.log("Ошибка загрузки:", error);
    });
}

function addMessageToPage(name, text, time) {
  const newCard = document.createElement("div");
  newCard.classList.add("message-card");

  const nameElement = document.createElement("div");
  nameElement.classList.add("message-name");
  nameElement.textContent = name;

  const textElement = document.createElement("div");
  textElement.classList.add("message-text");
  textElement.textContent = text;

  const timeElement = document.createElement("div");
  timeElement.classList.add("message-time");
  timeElement.textContent = time;

  newCard.appendChild(nameElement);
  newCard.appendChild(textElement);
  newCard.appendChild(timeElement);

  messagesList.appendChild(newCard);
}

loadMessages();

setInterval(function () {
  loadMessages();
}, 3000);