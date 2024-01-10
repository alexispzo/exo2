function chargerListePokemon() {
    for ( let i = 1 ; i <= 100 ; i++) {
        fetch("https://pokeapi.co/api/v2/pokemon-species/" + i)
        .then(response => response.json())
        .then(function(response_json) {
            for (langue of response_json.names) {                
                if (langue.language.name == 'fr') {
                    document.getElementById("tableau_body").innerHTML +=
                    "<tr>" +
                    " <td>" + i + "</td>" +
                    " <td>" + langue.name + "</td>"
                    "</tr>"

                }
            }
        })
    }

}           

function chargerListePokemon() {
    for ( let i = 1 ; i <= 100 ; i++) {
        fetch("https://pokeapi.co/api/v2/pokemon-species/" + i)
        .then(response => response.json())
        .then(function(response_json) {
                document.getElementById("tableau_body").innerHTML +=
                "<tr>" +
                " <td>" + i + "</td>" +
                " <td>" + response.json.names[4].name + "</td>"
                "</tr>"   
        })
    }

}           

async function chargerListePokemonv2() {
    for ( let i = 1 ; i <= 100 ; i++) {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + i)
        let response_json = await response.json()
        document.getElementById("tableau_body").innerHTML +=
        "<tr>" + 
        " <td>" + i + "</td>" +
        " <td>" + response_json.names[4].name + "</td>"
        "</tr>"   
        
    }

}  


async function afficher() {
    const button = document.getElementById('affichage');
    button.style.display = 'none';

    var template = document.getElementById('card-template');
    var parent = document.getElementById('grid');

    for (var i = 1; i <= 100; i++) {
        var clone = document.importNode(template.content, true);

        var imgElement = clone.querySelector('.card-img');
        imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i}.svg`;

        try {

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}/`);
            const data = await response.json();

            const responseType = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
            const dataType = await responseType.json();
            const types = dataType.types.map(type => type.type.name);

            const typesContainer = clone.querySelector('.types');
                types.forEach(type => {
                    const typeImage = document.createElement('img');
                    typeImage.src = `images/type_${type}.png`; // Supposons que les images des types sont dans le dossier "images"
                    typeImage.alt = type;
                    typesContainer.appendChild(typeImage);
                });

            const nomFrancais = data.names[4].name;
            const nouveaucontenu = clone.firstElementChild.innerHTML
                .replace('{{nom}}', nomFrancais)
                .replace('{{numero}}', i);
            clone.firstElementChild.innerHTML = nouveaucontenu;

        } catch (error) {
            console.error('Erreur lors de la récupération du nom du Pokémon :', error);
        }

        parent.appendChild(clone);
    }

}    
