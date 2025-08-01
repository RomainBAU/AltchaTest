# 🔐 Test Altchat via Sentinel

Mini projet client-server pour tester l'intégration d'Altchat via Sentinel en local.

## 📋 Description

Ce projet propose une interface de connexion complète avec :
- ✅ Authentification par username/password (en dur)
- 🛡️ Validation de captcha via l'API Altchat
- 🎨 Interface moderne et responsive
- 📊 Intégration avec Sentinel Dashboard

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 14 ou supérieure)
- Sentinel en cours d'exécution sur `http://localhost:8080`

### Installation
```bash
# Installer les dépendances
npm install

# Démarrer le serveur
npm start
```

Le serveur démarrera sur `http://localhost:3000`

## 🔧 Configuration

### API Altchat
- **API Key**: `key_1j1ifk1u300a04csoia`
- **Security Group ID**: `sgr_1j1ifgqj00090kd8rgu`

### Comptes de test
| Username | Password |
|----------|----------|
| admin    | password123 |
| user     | test123 |
| demo     | demo123 |

## 🌐 Pages disponibles

### Page de connexion (`/`)
- Formulaire avec username/password
- Widget captcha Altchat intégré
- Validation en temps réel
- Design moderne avec animations

### Page de succès (`/success.html`)
- Affichage de félicitations
- Détails de la connexion
- Animations de célébration
- Liens vers dashboard Sentinel

### Page d'erreur (`/nope.html`)
- Message d'erreur clair
- Conseils de dépannage
- Animations d'échec
- Informations de debug

## 🔍 Architecture

```
├── server.js              # Serveur Express
├── package.json           # Configuration npm
├── public/
│   ├── index.html         # Page de connexion
│   ├── script.js          # JavaScript frontend
│   ├── styles.css         # CSS principal
│   ├── success.html       # Page de succès
│   ├── success-styles.css # CSS page succès
│   ├── nope.html          # Page d'erreur
│   └── nope-styles.css    # CSS page erreur
└── README.md              # Documentation
```

## 🛠️ API Endpoints

### `POST /api/login`
Endpoint de connexion avec validation captcha.

**Paramètres :**
```json
{
  "username": "admin",
  "password": "password123",
  "captchaToken": "token_from_altchat_widget"
}
```

**Réponses :**
- `200` : Connexion réussie
- `400` : Captcha invalide ou manquant
- `401` : Identifiants incorrects
- `500` : Erreur serveur

### `GET /api/captcha-config`
Retourne la configuration du captcha.

**Réponse :**
```json
{
  "securityGroupId": "sgr_1j1ifgqj00090kd8rgu"
}
```

## 🎯 Flux d'utilisation

1. **Démarrage** : L'utilisateur accède à `http://localhost:3000`
2. **Connexion** : Saisie des identifiants et résolution du captcha
3. **Validation** : 
   - Vérification des credentials côté serveur
   - Validation du captcha via API Altchat
4. **Redirection** :
   - ✅ **Succès** → Page de félicitation
   - ❌ **Échec** → Page NOPE

## 🔗 Liens utiles

- **Application** : http://localhost:3000
- **Dashboard Sentinel** : http://localhost:8080/#/dashboard
- **Documentation Altchat** : https://altcha.org/docs

## 🛡️ Sécurité

- Validation des tokens captcha via API officielle Altchat
- Vérification des credentials côté serveur
- Protection contre les attaques par force brute (via captcha)
- Logs détaillés des tentatives de connexion

## 🐛 Dépannage

### Erreurs courantes
1. **Captcha ne se charge pas** : Vérifiez la connexion internet
2. **Erreur 500** : Vérifiez que l'API Altchat est accessible
3. **Connexion échoue** : Utilisez les comptes de test fournis

### Logs
Les logs du serveur affichent :
- Tentatives de connexion
- Résultats de validation captcha
- Erreurs d'authentification

## 🎨 Fonctionnalités

### Interface
- Design moderne avec glassmorphism
- Animations fluides et engageantes
- Responsive design (mobile-friendly)
- Feedback visuel en temps réel

### Sécurité
- Intégration captcha Altchat
- Validation multi-niveaux
- Gestion d'erreurs robuste
- Logs de sécurité détaillés

---

🎉 **Projet créé pour tester l'intégration Altchat avec Sentinel** 🎉