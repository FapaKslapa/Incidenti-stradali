// ricerca tramite codice
export function searchByCode(searchCodice, array) {
  return array.map(e => e.codice).indexOf(searchCodice);
}

// ricerca tramite targa
export function searchByPlate(searchPlate, array) {
  return array.filter(e => e.targhe.includes(searchPlate));
}

import { formattaData } from "./cards.js";

export function createModal(index, array) {
  let html = "";
  if (index !== -1) {
    // titolo, testo, feriti, morti
    const template = '<div class="card bg-light">' +
      '<div class="card-body">' +
      '<h5 class="card-title">%TITOLO</h5>' +
      '<p class="card-text">%TESTO</p>' +
      '<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#dati%ID1" aria-expanded="false" aria-controls="collapseExample"><img src="icon/expand.svg" alt="Espandi"></button>' +
      '<div class="collapse" id="dati%ID2"><br>' +
      '<div class="card card-body"><div class="row justify-content-center"><div class="col-4"><h2><span class="badge text-bg-danger">Feriti: %FERITI</span></h2></div><div class="col-4"><h2><span class="badge text-bg-dark">Morti: %MORTI</span></h2></div></div></div>' +
      '</div>' +
      '</div>' +
      '</div>';

    // luogo, orario, targhe
    const templateBody = '<p>Luogo: %LUOGO</p><p>Orario: %ORARIO</p><p>Numero targhe: %NUMERO</p>'

    // colore, testo
    const templateTarghe = '<div class="col-4"><h4><span class="badge %COLORE">%TESTO</span><h4></div>'


    let targhe = "";
    let body = "";

    // elenco targhe coinvolte
    for (let j = 0; j < array[index].targhe.length; j++) {
      targhe += templateTarghe.replace("%COLORE", "bg-primary");
      targhe = targhe.replace("%TESTO", array[index].targhe[j]);
    }

    body = templateBody.replace("%LUOGO", array[index].luogo);
    body = body.replace("%ORARIO", formattaData(array[index].data));
    body = body.replace("%NUMERO", '<div class="container text-center"><div class="row justify-content-center">' + targhe + '</div></div>');

    // codice, targa, data, luogo, feriti, morti
    let riga = template.replace("%TITOLO", array[index].codice);
    riga = riga.replace("%TESTO", body);
    riga = riga.replace("%ID1", 1);
    riga = riga.replace("%ID2", 1);
    riga = riga.replace("%FERITI", array[index].feriti);
    riga = riga.replace("%MORTI", array[index].morti);
    html += riga;
  } else {
    html = "non trovato";
  }
  return html;
}