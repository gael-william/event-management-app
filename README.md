# Event Management App

Application de gestion d'événements développée pour un test technique Full Stack.

## Stack Technologique

- **Backend** : Laravel 12 (API REST)
- **Frontend** : React 19 + Vite
- **Base de données** : MySQL
- **UI** : Tailwind CSS
- **HTTP Client** : Axios
- **Routing** : React Router DOM

## Fonctionnalités Principales

- **CRUD Événements** : Création, lecture, mise à jour, suppression
- **Liste des Événements** : Affichage en cards avec recherche temps réel
- **Détail Événement** : Informations complètes avec formulaire d'inscription
- **Inscription Participant** : Gestion des places et validation
- **Gestion Capacité** : Blocage automatique si événement complet
- **Validation Email** : Interdiction des doublons par événement
- **Responsive Design** : Compatible mobile, tablette, desktop
- **États de Chargement** : Indicateurs visuels pendant les requêtes
- **Gestion d'Erreurs** : Messages utilisateur clairs

## Architecture du Projet

```
event-management-app/
├── backend/                 # API Laravel
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   ├── Models/
│   │   └── Requests/
│   ├── database/migrations/
│   ├── routes/api.php
│   └── ...
└── frontend/                # Application React
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── pages/
    │   └── router/
    ├── public/
    └── ...
```

## Installation Backend

1. Accéder au dossier backend :
   ```bash
   cd backend
   ```

2. Installer les dépendances PHP :
   ```bash
   composer install
   ```

3. Configurer l'environnement :
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Configurer la base de données MySQL dans `.env` :
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=event_management
   DB_USERNAME=votre_username
   DB_PASSWORD=votre_password
   ```

5. Exécuter les migrations :
   ```bash
   php artisan migrate
   ```

## Installation Frontend

1. Accéder au dossier frontend :
   ```bash
   cd frontend
   ```

2. Installer les dépendances Node.js :
   ```bash
   npm install
   ```

## Lancement de l'Application

1. Lancer le serveur backend :
   ```bash
   cd backend
   php artisan serve
   ```
   Serveur accessible sur `http://127.0.0.1:8000`

2. Lancer le serveur frontend :
   ```bash
   cd frontend
   npm run dev
   ```
   Application accessible sur `http://localhost:5173`

## Routes Frontend Principales

- `/` : Liste des événements
- `/events/:id` : Détail d'un événement
- `/events/create` : Création d'un événement

## Endpoints API Principaux

### Événements
- `GET /api/events` : Liste des événements (avec recherche et filtre date)
- `POST /api/events` : Créer un événement
- `GET /api/events/{id}` : Détail d'un événement
- `PUT /api/events/{id}` : Modifier un événement
- `DELETE /api/events/{id}` : Supprimer un événement

### Inscriptions
- `POST /api/events/{id}/register` : Inscrire un participant
- `GET /api/events/{id}/registrations` : Liste des inscriptions
- `DELETE /api/registrations/{id}` : Supprimer une inscription

## Règles Métier Implémentées

- **Capacité Atteinte** : Inscription refusée si événement complet (HTTP 422)
- **Email Unique** : Interdiction des doublons par événement (HTTP 409)
- **Validation Champs** : Vérification des données (HTTP 400 avec détails)

## Choix Techniques

- **Laravel** : Framework robuste pour API REST avec Eloquent ORM
- **React** : Composants réutilisables et état local
- **Tailwind CSS** : Styling rapide sans CSS custom
- **Form Requests** : Validation centralisée côté backend
- **Axios** : Requêtes HTTP simples et configurables

## Pistes d'Amélioration Futures

- Ajout d'authentification utilisateur
- Pagination des listes
- Tests unitaires et fonctionnels
- Notifications par email
- Upload d'images pour événements
- Interface d'administration
- Cache et optimisation performance

## Auteur

Développé par [Votre Nom] pour un test technique Full Stack.