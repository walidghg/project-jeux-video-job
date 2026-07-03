# 🥋 JJB Simulator

Bienvenue dans **JJB Simulator**, un jeu de combat tactique en pixel art inspiré du **Jiu-Jitsu Brésilien**. Choisis ton camp, gère ta condition physique et soumets ton adversaire !

---

# 🚀 Installation & Lancement

Ce projet utilise **Kaboom.js**. Assure-toi d'avoir **Node.js** installé sur ta machine.

## 1. Cloner ou ouvrir le dossier du projet

Ouvre le dossier du projet dans ton terminal.

## 2. Installer les dépendances

```bash
npm install
```

## 3. Lancer le serveur de développement

```bash
npm run dev
```

Ouvre ensuite le lien affiché dans ton terminal (généralement **http://localhost:5173**) dans ton navigateur pour jouer.

---

# 🎮 Commandes

| Action | Touche |
|---------|--------|
| Déplacement | Flèches directionnelles |
| Double Leg | Espace |
| Sweep Papillon | Z |
| Block / Parry | C |
| Kimura (Ultime) | F |
| Rejouer | R (à l'écran de fin) |

---

# 🥋 Règles du Jeu

## 🎯 Objectif

Le but est de :

- Vider la barre de vie (**HP**) de l'adversaire ;
- Ou avoir le plus de points lorsque le temps est écoulé.

---

## 🔵🔴 Les Factions

Au début de la partie, tu dois choisir entre :

- 🔵 **Faction Bleue**
- 🔴 **Faction Rouge**

Ton choix déclenchera une scène d'introduction unique basée sur la trahison de ta faction d'origine.

---

## ⚔️ Mécaniques de Combat

### 💙 Cardio (Stamina)

- La barre bleue diminue lorsque tu :
  - te déplaces ;
  - utilises des techniques.
- Reste immobile pour régénérer ton cardio.
- Une fois épuisé, ton personnage devient beaucoup plus vulnérable.

---

### 🛡️ Block / Parry

Appuie sur **C** pour bloquer les attaques.

Si le blocage est effectué avec un timing parfait (**fenêtre de 0,2 seconde**), les dégâts sont totalement annulés.

---

### 🔥 Setup Kimura

Chaque **Double Leg** réussi augmente ton compteur de **Kimura**.

- Maximum : **6 charges**
- À **6 charges**, appuie sur **F** pour déclencher ton attaque ultime.

---

### ⏳ Cooldowns

Chaque technique possède un temps de recharge.

Surveille le **HUD** en haut à gauche :

- **OK** → compétence disponible
- Sinon → attends la fin du cooldown.

---

# 🎚 Difficulté

Trois niveaux de difficulté sont disponibles.

## 🙂 Normal

Pour découvrir le jeu et s'entraîner.

## 😤 Difficile

Pour les compétiteurs.

## 💀 Cauchemar

Réservé aux ceintures noires.

---

# 🛠 Crédits

Développé avec **Kaboom.js** et beaucoup de passion.

### Assets

- Mana Seed Character Base
