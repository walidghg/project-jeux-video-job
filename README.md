# JJB Simulator

Bienvenue dans **JJB Simulator**, un jeu de combat tactique en pixel art inspiré du Jiu-Jitsu Brésilien. Choisis ton camp, gère ta condition physique et soumets ton adversaire !

---

## 🚀 Installation & Lancement

Ce projet utilise [Kaboom.js](https://kaboomjs.com/). Assure-toi d'avoir [Node.js](https://nodejs.org/) installé sur ta machine.

1. **Cloner ou ouvrir le dossier** du projet dans ton terminal.
2. **Installer les dépendances** :
   ```bash
   npm install
   Lancer le serveur de développement :

Bash
npm run dev
Ouvre le lien affiché dans ton terminal (généralement http://localhost:5173) dans ton navigateur pour jouer.
🎮 CommandesActionToucheDéplacementFlèches directionnellesDouble LegEspaceSweep PapillonZBlock / ParryCKimura (Ult)FRejouerR (à l'écran de fin)🥋 Règles du JeuObjectif 
Le but est de vider la barre de vie (HP) de l'adversaire ou d'avoir le plus de points à la fin du temps imparti.
Les FactionsAu début, tu dois choisir entre la Faction Bleue ou la Faction Rouge.
Ton choix déclenchera un scénario d'intro unique basé sur la trahison de ta faction d'origine.
Mécaniques de CombatCardio (Stamina) : Ta barre bleue diminue quand tu utilises des techniques ou que tu te déplaces. 
Reste immobile pour régénérer ton cardio. Une fois épuisé, tu es vulnérable.Block (Parry) : Utilise la touche C pour bloquer les attaques. 
Bien utilisé (0.2s de fenêtre), il permet d'annuler les dégâts de l'IA.Setup Kimura : Chaque "Double Leg" réussi augmente ton compteur de Kimura (max 6).
Une fois à 6, la touche F déclenche ton attaque ultime dévastatrice.Cooldowns : Chaque technique a un temps de recharge. 
Surveille le HUD en haut à gauche pour savoir quand tes compétences sont prêtes (OK).DifficultéTu peux choisir entre trois niveaux de difficulté au menu :Normal : Pour s'entraîner.Difficile : Pour les compétiteurs.Cauchemar : Pour les ceintures noires uniquement.
🛠 Crédits
Développé avec Kaboom.js et passion.
Assets : Mana Seed Character Base.
