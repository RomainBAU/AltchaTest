const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuration
const ALTCHAT_API_KEY = 'key_1j1ifk1u300a04csoia';
const SECURITY_GROUP_ID = 'sgr_1j1ifgqj00090kd8rgu';

// Utilisateurs en dur pour les tests
const VALID_USERS = {
    'admin': 'password123',
    'user': 'test123',
    'demo': 'demo123'
};

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route pour vérifier les credentials et le captcha
app.post('/api/login', async (req, res) => {
    try {
        const { username, password, captchaToken } = req.body;

        console.log('Tentative de connexion:', { username, captchaPresent: !!captchaToken });

        // Vérification des credentials
        if (!VALID_USERS[username] || VALID_USERS[username] !== password) {
            console.log('Échec authentification:', username);
            return res.status(401).json({ 
                success: false, 
                message: 'Nom d\'utilisateur ou mot de passe incorrect' 
            });
        }

        // Vérification du captcha via l'API Altchat
        if (!captchaToken) {
            return res.status(400).json({ 
                success: false, 
                message: 'Token captcha manquant' 
            });
        }

        const captchaResponse = await fetch('https://altcha.org/api/v1/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ALTCHAT_API_KEY}`
            },
            body: JSON.stringify({
                token: captchaToken,
                securityGroupId: SECURITY_GROUP_ID
            })
        });

        const captchaResult = await captchaResponse.json();
        console.log('Résultat captcha:', captchaResult);

        if (!captchaResult.verified) {
            return res.status(400).json({ 
                success: false, 
                message: 'Captcha invalide' 
            });
        }

        // Connexion réussie
        console.log('Connexion réussie pour:', username);
        res.json({ 
            success: true, 
            message: 'Connexion réussie!',
            user: username
        });

    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur' 
        });
    }
});

// Route pour obtenir la configuration du captcha
app.get('/api/captcha-config', (req, res) => {
    res.json({
        securityGroupId: SECURITY_GROUP_ID
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📊 Dashboard Sentinel: http://localhost:8080/#/dashboard`);
    console.log(`👤 Utilisateurs de test: ${Object.keys(VALID_USERS).join(', ')}`);
});