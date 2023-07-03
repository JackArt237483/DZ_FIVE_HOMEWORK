const som = document.querySelector("#som");
const usd = document.querySelector("#usd");
const eur = document.querySelector("#eur");

const loadData = (callback) => {
  const xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET", "data.json", true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.send(null);
};

const convertCurrency = (fromElem, toElem, rate) => {
  toElem.value = (fromElem.value * rate).toFixed(2);
};

const convertator = (fromElem, toElem, rate) => {
  fromElem.addEventListener("input", () => {
    convertCurrency(fromElem, toElem, rate);
    fromElem.value === "" && (toElem.value = "");
  });
};

loadData((data) => {
  const usdRate = data.usd;
  const eurRate = data.eur;

  convertator(som, usd, 1 / usdRate);
  convertator(usd, som, usdRate);
  convertator(som, eur, 1 / eurRate);
  convertator(eur, som, eurRate);
  convertator(usd, eur, eurRate / usdRate);
  convertator(eur, usd, usdRate / eurRate);
});