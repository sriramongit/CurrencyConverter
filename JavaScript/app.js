const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const message = document.querySelector(".msg");

//setting all the options in the dropdown
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    //Logic for selecting initial from and to
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "To" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  //Updating flag on selecting country
  //adding event listener to select
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target); //passing the element where the change has taken place
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  //select ka parent hai select-container, uske andar ka image
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault(); //form k andar ka button click karne par koi bhi kaam automatically na ho. Saare kaam ham karwayenge humare hisab se

  let amount = document.querySelector(".amount input");
  let amtValue = amount.value;

  if (amtValue < 1 || amtValue === "") {
    amount.value = "1";
    amtValue = 1;
  }

  // console.log(fromCurrency.value.toLowerCase(), toCurrency.value.toLowerCase());

  //modifying the base url according to from and get currencies
  const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();
  let rate =
    data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    let finalAmt = amtValue * rate;
    
    message.innerText = `${amtValue} ${fromCurrency.value} = ${finalAmt} ${toCurrency.value}`
});
