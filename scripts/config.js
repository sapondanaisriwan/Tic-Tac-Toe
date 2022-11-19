function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset.playerid; // + แปลง string ไปเป็น int(ตัวเลข) +'1' => 1
  console.log(editedPlayer);
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = '';
}

function savePlayerConfig(event) {
  // Clicking on a "Submit" button, prevent it from submitting a form
  // Clicking on a link, prevent the link from following the URL
  // สรุป ป้องกันไม่ให้กดส่งแบบ form ก่อนหรือกด url ก่อน
  event.preventDefault(); // preventing browser sending a request automaitclly
  console.log(event);
  const formData = new FormData(event.target);
  // '    Max God   ' => 'Max God'
  const enteredPlayername = formData.get("playername").trim();
  console.log(enteredPlayername);

  // alternative way eneteredplayername === ""
  if (!enteredPlayername) {
    // check if eneterplayername is empty string ""
    event.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = "Please eneter a valid name";
    return;
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  console.log(updatedPlayerDataElement.children[1].textContent);
  updatedPlayerDataElement.children[1].textContent = enteredPlayername;

  players[editedPlayer - 1].name = enteredPlayername;

  closePlayerConfig();
}
