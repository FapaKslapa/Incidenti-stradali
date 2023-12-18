
export function createForm(numTarghe) {

  let html = '';
  //data, numero targa, indirizzo, bottone modal
  const richiestaTarga = '<div id="alert%IDA"></div>' +
    '<div class="form-floating">' +
    '<input type="text" class="form-control" id="valoreTarga%ID">' +
    '<label class="form-label">Inserire targa %NUM</label>' +
    '</div><br>';
  for (let i = 0; i < numTarghe; i++) {
    html += richiestaTarga.replace("%IDA", i);
    html = html.replace("%ID", i);
    html = html.replace("%NUM", (i + 1));
  }
  return html;
}


export function creaCode(lastCode) {
  const lettere = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numeri = "0123456789";
  const index = lastCode.indexOf("Z");
  let array = lastCode.split("");
  if (lastCode !== "") {
    if (index === -1) {
      array[array.length - 1] = lettere.charAt(lettere.indexOf(array[array.length - 1]) + 1);
    } else {
      if (index - 1 <= 4 && index - 1 >= 2) {
        const indexNumber = lastCode.indexOf("9");
        if (indexNumber === -1)
          array[index - 1] = numeri.charAt(numeri.indexOf(array[index - 1]) + 1);
        else {
          if (indexNumber == 2)
            array[indexNumber - 1] = lettere.charAt(lettere.indexOf(array[indexNumber - 1]) + 1);
          else
            array[indexNumber - 1] = numeri.charAt(numeri.indexOf(array[indexNumber - 1]) + 1);
        }
      } else
        array[index - 1] = lettere.charAt(lettere.indexOf(array[index - 1]) + 1);
    }
    return array.join("");
  }
  return "AA000AA";
}

export function checkPlate(plate) {
  const formato = /[[A-Za-z]{2,2}[0-9]{3,3}[A-Za-z]{2,2}]|[A-Za-z]{2,2}[0-9]{3,3}]/g;
  const pattern = new RegExp(formato);
  return pattern.test(plate);
}

export function checkDate(date) {
  let todaysDate = datetimeLocal();
  if (todaysDate < date) {
    return false;
  } else {
    return true;
  }
}

export function sortCode(a, b) {
  let arrayA = a.codice.match(/([A-Z]+)|([0-9]+)/g);
  let arrayB = b.codice.match(/([A-Z]+)|([0-9]+)/g);
  let num = 0;
  if (arrayA[0] < arrayB[0])
    num = -1;
  else if (arrayA[0] > arrayB[0])
    num = 1;
  else {
    if (Number(arrayA[1]) < Number(arrayB[1]))
      num = -1;
    else if (Number(arrayA[1]) > Number(arrayB[1]))
      num = 1;
    else {
      if (arrayA[2] < arrayB[2])
        num = -1;
      else if (arrayA[2] > arrayB[2])
        num = 1;
      else
        num = 0
    }
  }
  return num;
}

export function inverseSortCode(a, b) {
  let arrayA = a.codice.match(/([A-Z]+)|([0-9]+)/g);
  let arrayB = b.codice.match(/([A-Z]+)|([0-9]+)/g);
  let num = 0;
  if (arrayA[0] > arrayB[0])
    num = -1;
  else if (arrayA[0] < arrayB[0])
    num = 1;
  else {
    if (Number(arrayA[1]) > Number(arrayB[1]))
      num = -1;
    else if (Number(arrayA[1]) < Number(arrayB[1]))
      num = 1;
    else {
      if (arrayA[2] > arrayB[2])
        num = -1;
      else if (arrayA[2] < arrayB[2])
        num = 1;
      else
        num = 0
    }
  }
  return num;
}

export function indexUguali(array) {
  const index = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i].value === array[j].value) {
        index.push(i, j);
      }
    }
  }

  return index;
}

export function createDict(date, address, plates, feriti, morti, lastCode) {
  return {
    codice: creaCode(lastCode),
    targhe: plates,
    data: date,
    luogo: address,
    feriti: feriti,
    morti: morti,
  }
}

export function datetimeLocal() {
  const dt = new Date();
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  let val = dt.toISOString().slice(0, 16);
  return val;
}

export function createAlert(color, testo) {
  return '<div class="alert alert-' + color + '" ' + 'role = "alert">' +
    testo +
    '</div>'
}