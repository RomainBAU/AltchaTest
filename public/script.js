document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('message');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');

    function showMessage(message, type = 'info') {
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
    }

    function hideMessage() {
        messageDiv.style.display = 'none';
    }

    function setLoadingState(loading) {
        if (loading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    }

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        hideMessage();
        setLoadingState(true);

        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');

        // Récupérer le token du captcha
        const altchaWidget = document.getElementById('altcha');
        const captchaToken = altchaWidget.value;

        if (!captchaToken) {
            showMessage('⚠️ Veuillez compléter le captcha', 'error');
            setLoadingState(false);
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    captchaToken: captchaToken
                })
            });

            const result = await response.json();

            if (result.success) {
                showMessage('✅ ' + result.message, 'success');
                // Redirection vers la page de félicitation
                setTimeout(() => {
                    window.location.href = '/success.html?user=' + encodeURIComponent(result.user);
                }, 1500);
            } else {
                showMessage('❌ ' + result.message, 'error');
                // Redirection vers la page NOPE pour certaines erreurs
                if (response.status === 401) {
                    setTimeout(() => {
                        window.location.href = '/nope.html';
                    }, 2000);
                }
                // Reset du captcha
                altchaWidget.reset();
            }
        } catch (error) {
            console.error('Erreur:', error);
            showMessage('🔥 Erreur de connexion au serveur', 'error');
            // Redirection vers la page NOPE en cas d'erreur serveur
            setTimeout(() => {
                window.location.href = '/nope.html';
            }, 2000);
        } finally {
            setLoadingState(false);
        }
    });

    // Gestion des événements du captcha
    const altchaWidget = document.getElementById('altcha');
    
    altchaWidget.addEventListener('verified', function() {
        console.log('Captcha vérifié avec succès');
    });

    altchaWidget.addEventListener('error', function(event) {
        console.error('Erreur captcha:', event.detail);
        showMessage('❌ Erreur lors de la vérification du captcha', 'error');
    });

    // Auto-focus sur le champ username
    document.getElementById('username').focus();
});