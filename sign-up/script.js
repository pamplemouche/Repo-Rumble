// Dans ton fichier script.js qui est lié à ton index.html externe
const apiUrl = 'https://script.google.com/macros/s/AKfycbywPIpGQ4IDYC-rlg5_bx5Qw8fE6hENRKaZVUPAX_IMMyS1uhSBDmzqOWa4TpFtgdF8Tg/exec'; // L'URL que tu as copiée après le déploiement

async function envoyerDonneesAAppScript(data) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST', // Ou 'GET' si c'est une requête simple, mais POST c'est mieux pour envoyer des données
            mode: 'no-cors', // Peut être nécessaire mais peut aussi bloquer si App Script ne renvoie pas les bons headers CORS
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Ici, la gestion de la réponse est plus complexe à cause des CORS.
        // Souvent, tu ne peux pas lire le contenu de la réponse si tu as 'no-cors'.
        // C'est pourquoi cette méthode est moins recommandée pour les débutants.
        console.log('Requête envoyée à App Script. Vérifie ta feuille !');

    } catch (error) {
        console.error('Erreur lors de l\'appel à App Script :', error);
    }
}

// Exemple d'utilisation
// envoyerDonneesAAppScript({ nom: 'Alice', email: 'alice@example.com' });
