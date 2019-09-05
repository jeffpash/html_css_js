/*
Attendre le chargement du DOM
https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener
https://developer.mozilla.org/fr/docs/Web/Events/DOMContentLoaded
*/
document.addEventListener('DOMContentLoaded', () => {
    /*
    Déclaration des variables
    */
        /* 
        Sélectionner toutes les balises BUTTON de la NAV
        https://developer.mozilla.org/fr/docs/Web/API/Document/querySelectorAll
        */
        const navButtons = document.querySelectorAll('nav button');

        /*
        Sélectionner une balise du DOM
        https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector
        */
        const playButton = document.querySelector('#playButton');
        const userCard = document.querySelector('#userCard');
        const userCardImg = document.querySelector('#userCard img');
        const computerCard = document.querySelector('#computerCard');
        const computerCardImg = document.querySelector('#computerCard img');
        const userScore = document.querySelector('#userScore');
        const computerScore = document.querySelector('#computerScore');
        const aside = document.querySelector('aside');

        // Créer une collection de données
        const computerMemory = [ 'stone', 'paper', 'scissors' ];

        // Créer un objet pour les scores
        let scores = {
            user: {
                score: 0,
                choice: undefined
            },
            computer: {
                score: 0,
                choice: undefined
            }
        }

        let step = 'void';
    //

    /*
    Créer une fonction pour définir les scores
    */
        const defineScore = (player, score) => {
            /* 
            Changer le contenu textuel d'une balise
            https://developer.mozilla.org/fr/docs/Web/API/Node/textContent
            */
            player === 'user' 
            ? userScore.textContent =  score 
            : computerScore.textContent = score;
        };

        defineScore('user', scores.user.score);
        defineScore('computer', scores.computer.score);
    //

    /* 
    Créer unne fonction pour le résultat de la partie
    */
        const getGameResult = () => {
            /* 
            Supprimer la class close de la balise aside
            */
            aside.classList.remove('close');

            if( scores.user.choice === 'stone' && scores.computer.choice === 'scissors' ){
                scores.user.score++;
                defineScore('user', scores.user.score);
                aside.classList.add('win');
            }
            else if( scores.user.choice === 'paper' && scores.computer.choice === 'stone' ){
                scores.user.score++;
                defineScore('user', scores.user.score);
                aside.classList.add('win');
            }
            else if( scores.user.choice === 'scissors' && scores.computer.choice === 'paper' ){
                scores.user.score++;
                defineScore('user', scores.user.score);
                aside.classList.add('win');
            }
            else if( scores.user.choice === scores.computer.choice ){
                console.log('ex aequo')
            }
            else{
                scores.computer.score++;
                defineScore('computer', scores.computer.score);
                aside.classList.add('lose');
            }
        };
    //

    /*
    Créer une fonction pour définir le choix de l'ordinateur
    */
        const defineComputerChoice = () => {
            /*
            Définir un entier aléatoirement entrer 0 et X
            https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/random
            */
            let cptChoice = Math.floor(Math.random() * Math.floor(computerMemory.length));
            scores.computer.choice = computerMemory[cptChoice];

            // Définit le choix de l'ordinateur
            changeCardImage('computer', scores.computer.choice);

            // Définir le résultat
            getGameResult(scores.user.choice, scores.computer.choice);

            // Afficher la carte de l'ordinateur
            computerCard.classList.remove('close');
        };
    //

    /*
    Création d'un fonction pour modifier les images des cartes
    */
        const changeCardImage = (player, choice) => {
            /*
            Evaluer le choix
            https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/switch
            Pour changer la valeur de l'attribut SRC
            https://developer.mozilla.org/fr/docs/Web/API/Element/setAttribute
            */
            switch(choice){
                case 'stone':
                    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Opérateurs/L_opérateur_conditionnel
                    player === 'user'
                    ? userCardImg.setAttribute('src', './img/noun_rock_5846.png')
                    : computerCardImg.setAttribute('src', './img/noun_rock_5846.png');
                break;

                case 'paper':
                    player === 'user'
                    ? userCardImg.setAttribute('src', './img/noun_Paper_1091290.png')
                    : computerCardImg.setAttribute('src', './img/noun_Paper_1091290.png');
                break;

                default:
                    player === 'user'
                    ? userCardImg.setAttribute('src', './img/noun_Scissors_2826183.png')
                    : computerCardImg.setAttribute('src', './img/noun_Scissors_2826183.png');
                break;
            };
        };
    //

    /*
    Capter le clic sur les balise BUTTON de la NAV
    */
        // Faire une boucle sur navButtons
        for( let button of navButtons ){
            // Ajouter l'écouteur d'événement
            button.addEventListener('click', () => {
                /* 
                Récupérer la valeur de l'attribut button-data
                https://developer.mozilla.org/fr/docs/Web/API/Element/getAttribute
                */
                scores.user.choice = button.getAttribute('button-data');

                // Définit le choix de l'utilisateur
                changeCardImage('user', scores.user.choice);

                // Afficher le choix de l'utilisateur et le bouton
                userCard.classList.remove('close')
                playButton.classList.remove('close');
            });
        };

        /* 
        Capter le clic sur le bouton playButton
        */
        playButton.addEventListener('click', () => {
            if( step === 'void' ){
                defineComputerChoice();
                step = 'result';
                playButton.textContent = 'Rejouer';
            }
            else{
                userCard.classList.add('close');
                computerCard.classList.add('close');

                aside.classList.remove('lose', 'win');
                aside.classList.add('close');

                playButton.classList.add('close');
                playButton.textContent = 'Jouer';
                step = 'void';
            }
        });
    //
});
//