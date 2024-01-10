function remplirAccessoires() {
    var gridContainer = document.getElementById('grid-container');

    fetch('accessoires.json')
        .then(response => response.json())
        .then(data => {
            // Créer trois copies du template et les remplir avec les données du JSON
            for (let i = 0; i < 3; i++) {
                var template = document.getElementById('template_accessoires').content.cloneNode(true);

                var accessoire = data[i];

                template.querySelector('img').src = `images/${accessoire['accessoires-image']}.jpg`;
                template.querySelector('h2').innerText = accessoire['accessoires-titre'];
                template.querySelector('p').innerText = accessoire['accessoires-texte'];
                template.querySelector('a').href = accessoire['lien'];

                gridContainer.appendChild(template);
            }
        })
        .catch(error => console.error('Erreur lors de la récupération des accessoires :', error));
}

// Fonction pour gérer la navigation au clavier
function keyboardManager() {
    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case ' ':
            case 'ArrowDown':
            case 'PageDown':
            case '2':
                window.scrollBy(0, window.innerHeight);
                event.preventDefault();
                break;

            case 'ArrowUp':
            case 'PageUp':
                window.scrollBy(0, -window.innerHeight);
                event.preventDefault();
                break;
        }
    });
}

// Appeler les fonctions au chargement de la page
window.onload = function () {
    remplirAccessoires();
    keyboardManager();
}