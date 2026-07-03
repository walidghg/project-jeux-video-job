import kaboom from "kaboom";

kaboom({
    background: [30, 30, 30], 
});

// --- CHARGEMENT ---
loadSound("ult", "/ult.mp3");
loadSprite("kimono_blanc", "/joueur.png", { sliceX: 8, sliceY: 8 });
loadSprite("kimono_bleu", "/adversaire.png", { sliceX: 8, sliceY: 8 });

const VITESSE = 300;

// ==========================================
// SCÈNE 1 : CHOIX FACTION
// ==========================================
scene("menu", () => {
    add([text("JJB SIMULATOR", { size: 60 }), pos(width() / 2, height() / 4), anchor("center"), color(255, 215, 0)]);
    add([text("1 - Faction BLEUE\n2 - Faction ROUGE", { size: 40, align: "center" }), pos(width() / 2, height() / 2), anchor("center")]);

    onKeyPress("1", () => go("difficulte", "blue"));
    onKeyPress("2", () => go("difficulte", "red"));
});

scene("difficulte", (faction) => {
    add([text("1 - Normal | 2 - Difficile | 3 - Cauchemar", { size: 30 }), pos(width() / 2, height() / 2), anchor("center")]);
    onKeyPress("1", () => go("intro", faction, { nom: "Normal", vitAdv: 100, degatsAdv: 10, cooldownAdv: 2 }));
    onKeyPress("2", () => go("intro", faction, { nom: "Difficile", vitAdv: 150, degatsAdv: 20, cooldownAdv: 1.2 }));
    onKeyPress("3", () => go("intro", faction, { nom: "Cauchemar", vitAdv: 220, degatsAdv: 35, cooldownAdv: 0.6 }));
});

// ==========================================
// SCÈNE 1.6 : INTRO
// ==========================================
scene("intro", (faction, difficulte) => {
    const dialogue = faction === "red" 
        ? "Blue: Tu as trahi la faction Blue !\nJe vais te le faire payer." 
        : "Red: Tu as trahi la faction Red !\nJe vais te le faire payer.";
    add([text(dialogue, { size: 40, align: "center" }), pos(width() / 2, height() / 2), anchor("center"), color(255, 255, 255)]);
    wait(3, () => go("jeu", faction, difficulte));
});

// ==========================================
// SCÈNE 2 : COMBAT
// ==========================================
scene("jeu", (faction, difficulte) => {
    let hpJoueur = 100, cardioJoueur = 100, hpAdversaire = 100, cardioAdversaire = 100;
    let pointsJoueur = 0, pointsAdversaire = 0, chargesKimura = 0;
    let cdDoubleLeg = 0, cdPapillon = 0, cdBlock = 0, cooldownAttaqueAdversaire = 0;
    let enCinematique = false, enBlock = false;

    // UI
    add([rect(width() - 100, height() - 150), pos(50, 100), color(255, 215, 0), outline(10, rgb(220, 20, 60)), z(-1)]);
    const scoreTexte = add([text("0 - 0", { size: 40 }), pos(width() / 2, 55), anchor("center"), color(255, 215, 0)]);
    const hudSkills = add([text("", { size: 18 }), pos(20, 120), color(255, 255, 255)]);
    const textCharges = add([text(`Setup Kimura: 0/6`, { size: 20 }), pos(20, 90), color(255, 0, 255)]);
    
    const barreHpJoueur = add([rect(200, 20), pos(20, 40), color(255, 0, 0)]); 
    const barreCardioJoueur = add([rect(200, 15), pos(20, 65), color(0, 150, 255)]); 
    const barreHpAdversaire = add([rect(200, 20), pos(width() - 220, 40), color(255, 0, 0)]); 
    const barreCardioAdversaire = add([rect(200, 15), pos(width() - 220, 65), color(0, 150, 255)]);

    const spriteJ = (faction === "blue") ? "kimono_blanc" : "kimono_bleu";
    const spriteA = (faction === "blue") ? "kimono_bleu" : "kimono_blanc";
    
    const joueur = add([sprite(spriteJ), scale(3), pos(width() / 4, height() / 2 + 50), area({ scale: 0.4 }), body(), "combattant"]);
    const adversaire = add([sprite(spriteA), scale(3), pos((width() / 4) * 3, height() / 2 + 50), area({ scale: 0.4 }), body(), "adversaire"]);

    onUpdate(() => {
        if (enCinematique) return;
        if (cdDoubleLeg > 0) cdDoubleLeg -= dt();
        if (cdPapillon > 0) cdPapillon -= dt();
        if (cdBlock > 0) cdBlock -= dt();

        hudSkills.text = `[Space] D.Leg: ${cdDoubleLeg > 0 ? cdDoubleLeg.toFixed(1) : "OK"}\n` +
                         `[Z] Sweep: ${cdPapillon > 0 ? cdPapillon.toFixed(1) : "OK"}\n` +
                         `[C] Block: ${cdBlock > 0 ? cdBlock.toFixed(1) : "OK"}\n` +
                         `[F] KIMURA: ${chargesKimura >= 6 ? "PRÊT!" : chargesKimura + "/6"}`;

        // Mouvement simple et stable
        let dx = 0; let dy = 0;
        if (isKeyDown("left")) dx -= 1; if (isKeyDown("right")) dx += 1;
        if (isKeyDown("up")) dy -= 1; if (isKeyDown("down")) dy += 1;
        if (dx !== 0 || dy !== 0) joueur.move(dx * VITESSE, dy * VITESSE);
        
        if (cardioJoueur < 100 && dx === 0 && dy === 0) cardioJoueur += 0.6;
        if (cardioAdversaire < 100) cardioAdversaire += 0.2;
        
        const dir = joueur.pos.sub(adversaire.pos).unit();
        adversaire.move(dir.scale(difficulte.vitAdv));
        
        if (cooldownAttaqueAdversaire > 0) cooldownAttaqueAdversaire -= dt();

        barreHpJoueur.width = hpJoueur * 2; barreCardioJoueur.width = cardioJoueur * 2;
        barreHpAdversaire.width = hpAdversaire * 2; barreCardioAdversaire.width = cardioAdversaire * 2;
    });

    onKeyPress("c", () => {
        if (cdBlock <= 0) {
            cdBlock = 1.5; enBlock = true;
            add([text("BLOCK !", { size: 30 }), pos(joueur.pos.x, joueur.pos.y - 40), color(0, 255, 0), lifespan(0.2)]);
            wait(0.2, () => enBlock = false);
        }
    });

    joueur.onCollideUpdate("adversaire", () => {
        if (enCinematique) return;
        if (cooldownAttaqueAdversaire <= 0 && cardioAdversaire >= 20) {
            cooldownAttaqueAdversaire = difficulte.cooldownAdv;
            cardioAdversaire -= 20;
            if (!enBlock) {
                hpJoueur -= difficulte.degatsAdv;
                add([text("Aie !", { size: 30 }), pos(joueur.pos.x, joueur.pos.y - 40), color(255, 0, 0), lifespan(1)]);
            } else {
                add([text("PARRY !", { size: 30 }), pos(joueur.pos.x, joueur.pos.y - 40), color(255, 255, 0), lifespan(0.5)]);
            }
        }
    });

    onKeyPress("space", () => {
        if (cdDoubleLeg <= 0 && cardioJoueur >= 20) {
            cdDoubleLeg = 2; cardioJoueur -= 20; hpAdversaire -= 10; pointsJoueur += 2;
            if (chargesKimura < 6) chargesKimura++;
            scoreTexte.text = `${pointsJoueur} - ${pointsAdversaire}`;
            textCharges.text = `Setup Kimura: ${chargesKimura}/6`;
            adversaire.pos.x += 120;
        }
    });

    onKeyPress("z", () => {
        if (cdPapillon <= 0 && cardioJoueur >= 30) {
            cdPapillon = 3; cardioJoueur -= 30; hpAdversaire -= 5;
            adversaire.pos.x += 350;
        }
    });

    onKeyPress("f", () => {
        if (chargesKimura >= 6 && !enCinematique) {
            enCinematique = true; play("ult"); shake(50);
            const noir = add([rect(width(), height()), pos(0,0), color(0,0,0), z(100)]);
            const kanji = add([text("木村\nKIMURA", { size: 150 }), pos(width()/2, height()/2), anchor("center"), color(220, 20, 60), z(102)]);
            
            // Animation flash finale
            wait(3, () => {
                destroy(noir); destroy(kanji); shake(100); enCinematique = false; 
                hpAdversaire -= 60; chargesKimura = 0; textCharges.text = `Setup Kimura: 0/6`;
                if (hpAdversaire <= 0) go("fin", "VICTOIRE !");
            });
        }
    });
});

scene("fin", (res) => {
    add([text(res, { size: 50 }), pos(width()/2, height()/2), anchor("center")]);
    add([text("Appuie sur R pour relancer", { size: 30 }), pos(width()/2, height()/2 + 60), anchor("center")]);
    onKeyPress("r", () => go("menu"));
});

go("menu");