let allData = []; // Array voor alle data in te bewaren

async function jsonDataFetchen() {
    try {
        const response = await fetch('geslachten.json'); // Ophalen JSON-bestand
        const data = await response.json(); // Converteren naar JavaScript-object
        allData = data;
        showDataInTable(allData);
    } catch (error) {
        console.error(error);
    }
}

function showDataInTable(data) {

    const tabelBody = document.getElementById('output');
    tabelBody.innerHTML = ''; // Verwijder vorige rijen

    let genderIcon;

    data.forEach(person => { // for each loop om data uit JSON te halen

        const row = document.createElement('tr'); // Nieuwe rij maken

        if (person.geslacht === 'man') { // if check op gender
            genderIcon = '♂️'
        } else if (person.geslacht === 'vrouw') {
            genderIcon = '♀️'
        } else {
            genderIcon = 'x'
        }

        // Voornaam
        const voornaam = document.createElement('td');
        voornaam.textContent = person.voornaam;

        // Familienaam
        const familienaam = document.createElement('td');
        familienaam.textContent = person.familienaam;

        // Geslacht
        const geslacht = document.createElement('td');
        geslacht.textContent = genderIcon;

        // Foto
        const foto = document.createElement('td');
        const img = document.createElement('img');
        img.src = person.foto; // Pad naar foto
        foto.appendChild(img);

        // Voeg cellen toe aan rij met append
        row.appendChild(voornaam);
        row.appendChild(familienaam);
        row.appendChild(geslacht);
        row.appendChild(foto);

        // Voeg rij toe aan tabel
        tabelBody.appendChild(row);
    });



}

function setupClickEvents() {
    const links = document.querySelectorAll('#genderlinks a');

    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault(); // voorkom herladen
            const type = link.dataset.type; // haal het geslachtstype op
            hyperlink(type);
        });
    });

}

function hyperlink(type) { // function voor de genders te sorteren in de hyperlink
    if (type === 'alle') {
        showDataInTable(allData); // Toon alles
    } else {
        const filtered = allData.filter(person => person.geslacht === type);
        showDataInTable(filtered); // Toon gefilterde resultaten
    }
}

// Start event-listeners vanaf de pagina klaar is
document.addEventListener('DOMContentLoaded', () => {
    setupClickEvents();
    jsonDataFetchen();
});