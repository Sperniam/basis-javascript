fetch('geslachten.json') //het JSON bestand Linken met JavaScript
    .then(response => response.json())
    .then(data => {
        allData = data;
        showDataInTable(data);
    })
    .catch(error => { // catch voor errors op te vangen
        console.error('Error loading JSON:', error);
    });

    let allData = []; // Array voor alle data in te bewaren

function showDataInTable(data) {

    const output = document.getElementById('output'); // verwijst naar html div 'output'
    output.innerHTML = ''; // verwijderen vorige content

    let genderIcon;

    let tableHTML =  // tabel maken met String

    '<table><thead><tr>' +
    '<th>Voornaam</th>' +
    '<th>Familienaam</th>' +
    '<th>Geslacht</th>' +
    '<th>Foto</th>' +
    '</tr></thead><tbody>';

    data.forEach(person => { // for each loop om data uit JSON te halen

        if (person.geslacht === 'man') { // if check op gender
            genderIcon = '♂️'
        } else if (person.geslacht === 'vrouw') {
            genderIcon = '♀️'
        } else {
            genderIcon = 'x'
        }

        tableHTML += '<tr>' +   //Data in tabel grouperen
            '<td>' + person.voornaam + '</td>' +
            '<td>' + person.familienaam + '</td>' +
            '<td>' + genderIcon + '</td>' +
            '<td><img src="' + person.foto + '" alt="foto" width="80"></td>' +
            '</tr>';
    });

    tableHTML += '</tbody></table>'; //slimme manier voor data in een String te steken en daarna in tabel

    output.innerHTML = tableHTML; //effectief data in tabel steken

}

function hyperlink(type){ //function voor de genders te sorteren in de hyperlink
    if (type === 'alle') {
        showDataInTable(allData); // Toon alles
    } else {
        const filtered = allData.filter(person => person.geslacht === type);
        showDataInTable(filtered); // Toon gefilterde resultaten
    }
}

