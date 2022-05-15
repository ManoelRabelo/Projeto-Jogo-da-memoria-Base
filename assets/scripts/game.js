let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    techs: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],

    cards: null,


    // checa se duas cartas ja foram escolhidas e bloqueia para terseira
    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];
        console.log(card);

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }
        else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },

    // confere  se cartas viradas sao iguais
    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    // permite escolher mais duas cartas
    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    // desvira as cartas
    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver() {
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    // cria as cartas do jogo
    createCardsFromTechs: function () {

        this.cards = []; // listas de cartas

        // cria os pares de cartas 
        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        })
        //separa os pares de cartas
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },

    // cria um par de cartas para cada tecnologia
    createPairFromTech: function (tech) {

        return [
            {
                id: this.createIdWithTech(tech),
                icon: tech,
                flipped: false,
            },
            {
                id: this.createIdWithTech(tech),
                icon: tech,
                flipped: false,
            }
        ]
    },

    // gera o Id especifico de cada cartas
    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },


    // embaralha as cartas
    shuffleCards: function (cards) {

        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }

}