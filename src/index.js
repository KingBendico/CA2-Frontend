import 'bootstrap/dist/css/bootstrap.css'

const checkError = function (res) {
    if (res.status >= 200 && res.status <= 299) {
        return res.json();
    } else {
        throw Error(res.statusText);
    }
}

const getPersonsByHobby = function () {
    console.log("getPersonsByHobby")
    const input = document.getElementById("hobby-lookup-input").value;
    const result = fetch("https://benjamincholeva.dk/api/persons/hobby/" + input)
        .then(checkError)
        .then(data => {
            document.getElementById("persons-table-body").innerHTML = data.map(SingleDataToTable).join("");
        })
        .catch((error) => {
            console.log(error);
        });

}

const getPersonsByZip = function () {
    console.log("getPersonsByZip")
    const input = document.getElementById("zipcode-lookup-input").value;
    const result = fetch("https://benjamincholeva.dk/api/persons/zip/" + input)
        .then(checkError)
        .then(data => {
            document.getElementById("persons-table-body").innerHTML = data.map(SingleDataToTable).join("");
        })
        .catch((error) => {
            console.log(error);
        });

}

const getPersonByPhone = function () {
    console.log("getPersonByPhone")
    const input = document.getElementById("phone-lookup-input").value;
    const result = fetch("https://benjamincholeva.dk/api/persons/person/" + input)
        .then(checkError)
        .then(data => {
            document.getElementById("persons-table-body").innerHTML = SingleDataToTable(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

const SingleDataToTable = function (data) {
    return "<tr>" +
        "<td>" + data.firstName + " " + data.lastName + "</td>" +
        "<td>" + data.email + "</td>" +
        "<td>" + data.phones.join(", ") + "</td>" +
        "<td>" + data.address.street + ", " + data.address.info + "</td>" +
        "<td>" + data.hobbies.map(hobbyMapper).join(", ") + "</td>" +
        "</tr>";
}

const hobbyMapper = function (hobby) {
    return "<a href=\"" + hobby.link + "\">" + hobby.name + "</a>";
}

const addPerson = function () {
    let firstName = document.getElementById("first-name-input").innerText;
    let lastName = document.getElementById("last-name-input").innerText;
    let email = document.getElementById("email-address-input").innerText;
    let streetName = document.getElementById("street-name-input").innerText;
    let zipcode = document.getElementById("zipcode-input").innerText;
    let phones = document.getElementById("phones-input").innerText;
    let hobbies = document.getElementById("hobbies-input").innerText;

    let options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.getAttribute,
            phones: JSON.stringify({ number: phones, description: "" }),
            firstname: firstName.getAttribute,
            lastname: lastName.getAttribute,
            address: JSON.stringify({ street: streetName, additionalInfo: "" }),
            hobbies: JSON.stringify({ hName: hobbies, hWikiLink: "", hCategory: "", hType: "" }),
            zip: parseInt(zipcode)
        })
    }
    fetch("https://benjamincholeva.dk/api/persons/add", options)
        .then(checkError)
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

const SingleDataToTableTest = function () {
    const tablerow = "<tr>" +
        "<td>" + "data.firstName" + " " + "data.lastName" + "</td>" +
        "<td>" + "data.email" + "</td>" +
        "<td>" + "data.phones" + "</td>" +
        "<td>" + "data.streetname + data.zipcode" + "</td>" +
        "<td>" + "data.hobbies" + "</td>" +
        "</tr>";
    document.getElementById("persons-table-body").innerHTML = tablerow;
}

document.getElementById("test-button").addEventListener("click", SingleDataToTableTest);
document.getElementById("add-person-button").addEventListener("click", addPerson);
document.getElementById("zipcode-button").addEventListener("click", getPersonsByZip);
document.getElementById("hobby-button").addEventListener("click", getPersonsByHobby);
document.getElementById("phone-button").addEventListener("click", getPersonByPhone);