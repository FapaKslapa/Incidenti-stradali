import { searchByCode, searchByPlate, createModal } from "./ricerca.js";
import { disegnaCard } from "./cards.js";
import { createForm, checkPlate, sortCode, checkDate, indexUguali, createDict, datetimeLocal, createAlert, inverseSortCode } from "./aggiungi.js";
import { salvaDati, recuperaDati } from "./cache.js";
const codiceRicerca = document.getElementById("searchCod");
const invio = document.getElementById("invio");
const select = document.getElementById("scelta");
const modal = new bootstrap.Modal("#modalAdd");
const modalAddBody = document.getElementById("modalAddBody");
const cards = document.getElementById("cards");
const create = document.getElementById("create");
const buttonSort = document.getElementById("ordina");
const modalCreate = new bootstrap.Modal("#modalCreate");
const saveModifiche = document.getElementById("salvaModifiche");
const saveModal = document.getElementById("saveModal");
const modalSave = new bootstrap.Modal("#modalSave");
let arrayTarghe = [];
const nTarghe = document.getElementById("nTarghe");
const address = document.getElementById("indirizzo");
const date = document.getElementById("data");
const alertDate = document.getElementById("alertDate");
date.value = datetimeLocal();
const feriti = document.getElementById("feriti");
const morti = document.getElementById("morti");
const add = document.getElementById("aggiungiIncidenteForm");
const modalPlate = new bootstrap.Modal("#modalPlate");
const modalPlateBody = document.getElementById("formPlate");
const buttonPlate = document.getElementById("buttonPlate");
let sort = false;
let sortCodeControl = false;
let alert = "";
const ordinaCode = document.getElementById("ordinaCode");
// dizionario incidenti
let incidentiStradali = [];

add.onclick = () => {
  if (checkDate(date.value)) {
    alertDate.innerHTML = "";
    modalCreate.hide();
    modalPlateBody.innerHTML = createForm(nTarghe.value);
    modalPlate.show();
  } else {
    alertDate.innerHTML = createAlert("danger", "Errore: è stata inserita una data errata");
  }
}

buttonPlate.onclick = () => {
  arrayTarghe = [];
  const formElements = document.querySelectorAll('.plateForm input');
  const arrayInput = Array.from(formElements);
  const indiciDoppi = indexUguali(arrayInput);
  if (indiciDoppi.length === 0) {
    for (let i = 0; i < arrayInput.length; i++) {
      alert = document.getElementById("alert" + i);
      if (checkPlate(arrayInput[i].value)) {
        arrayTarghe.push(arrayInput[i].value);
        alert.innerHTML = createAlert("success", "Corretto: la targa inserita è corretta");
      } else
        alert.innerHTML = createAlert("danger", "Errore: è stata inserita una targa errata");
    }
    if (arrayTarghe.length === arrayInput.length) {
      modalPlate.hide();
      incidentiStradali.sort(sortCode);
      incidentiStradali.push(createDict(date.value, address.value, arrayTarghe, feriti.value, morti.value, incidentiStradali[incidentiStradali.length - 1].codice));
      if (sort)
        incidentiStradali.sort((a, b) => new Date(a.data) - new Date(b.data));
      else
        incidentiStradali.sort((a, b) => new Date(b.data) - new Date(a.data));
      cards.innerHTML = disegnaCard(incidentiStradali);
    }
  } else {
    for (let i = 0; i < indiciDoppi.length; i++) {
      alert = document.getElementById("alert" + indiciDoppi[i]);
      alert.innerHTML = createAlert("danger", "Errore: è stata inserita una targa errata");
    }
  }
}

invio.onclick = () => {
  if (codiceRicerca.value !== "") {
    if (select.selectedIndex == 0)
      cards.innerHTML = disegnaCard(searchByPlate(codiceRicerca.value, incidentiStradali));
    else {
      modal.show();
      modalAddBody.innerHTML = createModal(searchByCode(codiceRicerca.value, incidentiStradali), incidentiStradali);
    }
  } else {
    cards.innerHTML = disegnaCard(incidentiStradali);
  }
}
cards.innerHTML = disegnaCard(incidentiStradali);



function changeImage(id, path, alt) {
  id.innerHTML = '<img src="%PATH" alt="%ALT">'.replace("%PATH", path).replace("%ALT", alt);
}

create.onclick = () => {
  modalCreate.show();
}

buttonSort.onclick = () => {
  if (!sort) {
    incidentiStradali.sort((a, b) => new Date(a.data) - new Date(b.data));
    sort = true;
    changeImage(buttonSort, "icon/sort2.svg");
  } else {
    incidentiStradali.sort((a, b) => new Date(b.data) - new Date(a.data));
    sort = false;
    changeImage(buttonSort, "icon/sort.svg");
  }
  cards.innerHTML = disegnaCard(incidentiStradali);
}

ordinaCode.onclick = () => {
  if (!sortCodeControl) {
    incidentiStradali.sort(sortCode);
    sortCodeControl = true;
    changeImage(ordinaCode, "icon/sort2.svg");
  } else {
    incidentiStradali.sort(inverseSortCode);
    sortCodeControl = false;
    changeImage(ordinaCode, "icon/sort.svg");
  }
  cards.innerHTML = disegnaCard(incidentiStradali);
}

saveModifiche.onclick = () => {
  salvaDati(incidentiStradali, "incidentiStradali");
}

saveModal.onclick = () => {
  salvaDati(incidentiStradali, "incidentiStradali");
}


setInterval(function() {
  modalSave.show();
}, 3600000);

recuperaDati("incidentiStradali")
  .then((response) => {
    incidentiStradali = JSON.parse(response.result);
    cards.innerHTML = disegnaCard(incidentiStradali);
  })