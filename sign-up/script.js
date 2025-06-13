document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const messageDiv = document.getElementById('message');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page par défaut

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            showMessage('Les mots de passe ne correspondent pas !', 'error');
            return;
        }

        // --- Hachage du mot de passe (super important pour la sécurité !) ---
        // On utilise l'API Web Cryptography pour ça. C'est du sérieux !
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data); // SHA-256, c'est une bonne base
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashedPassword = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            // Maintenant, on envoie tout à Google App Script
            google.script.run
                .withSuccessHandler(onSuccess)
                .withFailureHandler(onError)
                .processSignup({
                    username: username,
                    email: email,
                    password: hashedPassword // On envoie le mot de passe haché !
                });

        } catch (error) {
            console.error('Erreur lors du hachage du mot de passe :', error);
            showMessage('Erreur interne lors de l\'inscription.', 'error');
        }
    });

    function onSuccess(response) {
        if (response.success) {
            showMessage(response.message, 'success');
            signupForm.reset(); // On vide le formulaire après l'inscription
        } else {
            showMessage(response.message, 'error');
        }
    }

    function onError(error) {
        console.error('Erreur App Script :', error);
        showMessage('Erreur lors de la communication avec le serveur. Réessaie !', 'error');
    }

    function showMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
    }
});
