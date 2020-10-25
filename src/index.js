import 'bootstrap/dist/css/bootstrap.css'

const checkError = function (res) {
    if (res.status >= 200 && res.status <= 299) {
        return res.json();
    } else {
        throw Error(res.statusText);
    }
}

const getPersonsByHobby = function () {
    const input = document.getElementById("???").value; //TODO, take input from HTML page
    const result = fetch("https://benjamincholeva.dk/api/persons/hobby/" + input)
        .then(checkError)
        .then(data => {
            document.getElementById("???").innerHTML = data.map(SingleDataToTable);
        })
    
}

const getPersonsByZip = function () {
    const input = document.getElementById("???").value;  //TODO, take input from HTML page
    const result = fetch("https://benjamincholeva.dk/api/persons/zip/" + input)
        .then(checkError)
        .then(data => {
            document.getElementById("???").innerHTML = data.map(SingleDataToTable);
        })
    
}

const getPersonByPhone = function(){
    const input = null; //TODO, take input from HTML page
    const result = fetch("https://benjamincholeva.dk/api/persons/person/" + input)
        .then(checkError)
        .then(data => {
            document.getElementById("???").innerHTML = SingleDataToTable(data);
        })
}

const SingleDataToTable = function(data){
    return "<tr>"+
            "<td>" + data.firstName + " " + data.lastName + "</td"+
            "<td" + data.email + "</td>"+
            "<td>" + data.phones.join(", ") + "</td>"+
            "<td>" + data.address.street + ", " + data.address.info + "</td>"+
            "<td>" + data.hobbies.map(hobbyMapper) + "</td>"+
            "</tr>";
}

const hobbyMapper = function(hobby){
    return "<a href=\"" + hobby.link + "\">" + hobby.name + "</a>";
}






/*          method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: number,
                    firstname: String,
                    lastname: String,
                    email: String,
                    phones: [
                        {
                            id: number,
                            number: number,
                            description: String
                        },
                    ],
                    address: {
                        id: number,
                        street: String,
                        additionalinfo: String,
                        cityinfo: [
                            {
                                zipcode: String,
                                city: String
                            }
                        ],

                    },
                    hobbies: [
                        {
                            name: String,
                            wikilink: String,
                            category: String,
                            type: String
                        },
                    ],
                },
        )};
    });

    /*