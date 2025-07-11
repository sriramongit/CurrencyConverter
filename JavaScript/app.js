
const dropdowns = document.querySelectorAll(".dropdown select");

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
}