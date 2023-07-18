// Fonction pour fermer la modale
function closeModal() {
    const modalElement = document.getElementById('user-modal');
    modalElement.style.display = 'none';
}

// Ajouter un gestionnaire d'événement pour fermer la modale lorsqu'on clique à l'extérieur
window.addEventListener('click', (event) => {
    const modalElement = document.getElementById('user-modal');
    if (event.target === modalElement) {
        closeModal();
    }
});

// Fonction pour afficher les résultats du fetch dans des cartes distinctes
function displayFetchResults(data) {
    const fetchResultElement = document.getElementById('fetch-result');

    data.forEach(user => {
        // Créer une carte pour chaque utilisateur
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        // Créer l'élément paragraphe pour afficher le prénom de l'utilisateur
        const nameElement = document.createElement('h2');
        nameElement.textContent = user.first_name;
        cardElement.appendChild(nameElement);

        // Créer l'élément paragraphe pour afficher l'adresse e-mail de l'utilisateur
        const emailElement = document.createElement('p');
        emailElement.textContent = user.email;
        cardElement.appendChild(emailElement);

        // Créer l'élément img pour afficher l'avatar de l'utilisateur
        const imgElement = document.createElement('img');
        imgElement.src = user.avatar;
        imgElement.alt = 'Avatar';
        cardElement.appendChild(imgElement);

        // Ajouter un gestionnaire d'événement pour ouvrir la modale lorsqu'on clique sur la carte
        cardElement.addEventListener('click', () => {
            const modalElement = document.getElementById('user-modal');
            const modalAvatar = document.getElementById('modal-avatar');
            const modalName = document.getElementById('modal-name');
            const modalEmail = document.getElementById('modal-email');

            // Mettre à jour le contenu de la modale avec les informations de l'utilisateur
            modalAvatar.src = user.avatar;
            modalName.textContent = `${user.first_name} ${user.last_name}`;
            modalEmail.textContent = user.email;

            // Afficher la modale
            modalElement.style.display = 'block';
        });

        // Ajouter la carte à l'élément de résultat
        fetchResultElement.appendChild(cardElement);
    });
}

// Effectuer l'appel fetch pour récupérer les données des utilisateurs
let nb = 12;
let url = 'https://reqres.in/api/users?per_page=' + nb;
fetch(url)
    .then(response => response.json())
    .then(body => {
        // Appeler la fonction pour afficher les résultats dans le HTML
        displayFetchResults(body.data);
    })
    .catch(error => console.error('Une erreur s\'est produite :', error));