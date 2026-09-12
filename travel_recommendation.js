const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');

function searchCondition(input) {
  const resultDiv = document.getElementById('result');
  if (!resultDiv) { return }

  if (!input) {
    showResult(false)
    return
  }

  resultDiv.innerHTML = '';

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      const results = [
        ...data.countries.flatMap(item => item.cities),
        ...data.temples,
        ...data.beaches,
      ]
        .filter((c) => {
          return (
            c.name.toLowerCase().includes(input)
            || c.description.toLowerCase().includes(input)
          )
        });

      if (results.length > 0) {
        const html = results.map((ret) => (`
          <div class="result-location">
            <img src="${ret.imageUrl}">
            <p><b>${ret.name}</b></p>
            <p>${ret.description}</p>
          </div>
          `)).join('')
        resultDiv.innerHTML = html
        showResult(true)
      } else {
        showResult(true)
        resultDiv.innerHTML = 'No results found.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

function showResult(bool) {
  if (bool) {
    document.querySelector('section.section-description').style.display = 'none';
    document.querySelector('section.section-result').style.display = 'block';
  } else {
    document.querySelector('section.section-description').style.display = 'block';
    document.querySelector('section.section-result').style.display = 'none';
  }
}


btnSearch && (btnSearch.addEventListener('click', (event) => {
  const input = document.getElementById('inputSearch').value.trim().toLowerCase();
  searchCondition(input);
}));

btnReset && (btnReset.addEventListener('click', (event) => {
  searchCondition(null);
}));

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
