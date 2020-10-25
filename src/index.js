import 'bootstrap/dist/css/bootstrap.css'

const checkError = function (res) {
    if (res.status >= 200 && res.status <= 299) {
        return res.json();
    } else {
        throw Error(res.statusText);
    }
}


function filterByHobby(people, hobbyId) {
    return people.filter(
        person => person.hobbies.some(
            hobby => hobby.id === hobbyId
        )
    );
}


const filterByHobby = function () {
    const input = document.getElementById("hobby-button").value; //TODO, take input from HTML page
    const result = fetch("https://benjamincholeva.dk/api/persons/hobby/" + input)
        .then(checkError)
        .then(data => {
            let pHobby = {
                method: "GET",
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
}

