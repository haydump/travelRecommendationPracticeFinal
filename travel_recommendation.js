// MARK: Contact
const form = document.getElementById("contactForm");

function onSubmitContact() {
  if (!form) { return }
  let name = form.querySelector("#name");
  let email = form.querySelector("#email");
  let message = form.querySelector("#message");

  if (
    name.value != null && name.value.trim() != ""
    && email.value != null && email.value.trim() != ""
    && message.value != null && message.value.trim() != ""
  ) {
    showPopup(true);
    name.value = "";
    email.value = "";
    message.value = "";
  }
}

form && (form.addEventListener('submit', (e) => {
  e.preventDefault();
  onSubmitContact();
}));

function showPopup(bool) {
  if (bool) {
    document.getElementById('popup').style.visibility = 'visible';
  } else {
    document.getElementById('popup').style.visibility = 'hidden';
  }
}
