const template = +'<div class="card">' +
  '<div class="card card-body">%TESTO<div class="col"><button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#dati%ID1" aria-expanded="true" aria-controls="collapseExample"><img src="icon/expand.svg" alt="Espandi"></button></div>' +
  '<div class="collapse" id="dati%ID2"><br>' +
  '<div class="card card-body">%DETTAGLI</div>' +
  '</div>' +
  '</div>' +
  '</div>';
const templateAccordion = '<div class="accordion-item">' +
  '<h2 class="accordion-header">' +
  '<div data-bs-theme="dark">' +
  '<button class="accordion-button collapsed text-bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#accordation%ID1" aria-expanded="false" aria-controls="flush-collapseOne">%TITLE</button></div></h2>' +
  '<div id="accordation%ID2" class="accordion-collapse collapse">' +
  '<div class="accordion-body bg-dark">%BODY</div>' +
  '</div>' +
  '</div>';
const templateBody = '<p>Luogo: %LUOGO</p><p>Orario: %ORARIO</p><p>Numero targhe: %NUMERO</p>'
const templateTarghe = '<div class="col-4"><h4><span class="badge %COLORE">%TESTO</span><h4></div>'
const colori = {
  rosso: "bg-danger text-black",
  blu: "bg-primary text-black",
  giallo: "bg-warning text-black",
  verde: "bg-success text-black",
  azzurro: "bg-info text-black"
}

export function disegnaCard(array) {
  let body = "";
  let totalHtml = "";
  console.log(array);
  if (array.length === 0) {
    return "Nessun risultato"
  } else {
    for (let i = 0; i < array.length; i++) {
      let html = "";
      let targhe = "";
      let dettagli = '<div class="container text-center"><div class="row justify-content-center"><div class="col-4"><h2><span class="badge text-bg-danger">Feriti: %FERITI</span></h2></div><div class="col-4"><h2><span class="badge text-bg-dark">Morti: %MORTI</span></h2></div></div></div>';
      let cont = 0;
      html += template.replace("%TITOLO", "Codice: " + array[i].codice);
      body = templateBody.replace("%LUOGO", array[i].luogo);
      body = body.replace("%ORARIO", formattaData(array[i].data));
      for (let j = 0; j < array[i].targhe.length; j++) {
        if (cont == 5) cont = 0;
        targhe += templateTarghe.replace("%COLORE", "bg-primary");
        targhe = targhe.replace("%TESTO", array[i].targhe[j])
        cont++;
      }
      body = body.replace("%NUMERO", '<div class="container text-center"><div class="row justify-content-center">' + targhe + "</div></div>");
      html = html.replace("%TESTO", body);
      html = html.replace("%ID1", i);
      html = html.replace("%ID2", i);
      dettagli = dettagli.replace("%FERITI", array[i].feriti);
      dettagli = dettagli.replace("%MORTI", array[i].morti);
      html = html.replace("%DETTAGLI", dettagli);
      totalHtml += templateAccordion.replace("%ID1", i);
      totalHtml = totalHtml.replace("%ID2", i);
      totalHtml = totalHtml.replace("%TITLE", "Codice: " + array[i].codice);
      totalHtml = totalHtml.replace("%BODY", html);
    }
    return totalHtml;
  }
}

export function formattaData(data) {
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit',
    minute: '2-digit'
  };
  let res = new Date(data);//creo l'oggetto data
  return res.toLocaleDateString(undefined, options);
}


export function ordinaData(a, b) {
  return new Date(b.data) - new Date(a.data);
};