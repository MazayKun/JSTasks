const UNSELECTED = 0;
const SELECTED = 1;
const WRONG = 2;
const SOLVED = 3;

const cards = Array.from(document.querySelectorAll('.card'));
var uncertainCardsNumber = 0;
var conditions = shuffleCards(cards);
cards.forEach(card => {
        card.addEventListener('click', clickOnCard);
    }
)


//Секция функций 

function clickOnCard(event) {
    if(conditions[cards.indexOf(this)]['state'] == SELECTED && uncertainCardsNumber == 1) {
        uncertainCardsNumber = 0;
        conditions[cards.indexOf(this)]['state'] = UNSELECTED;
        this.classList.toggle('flip');
        this.classList.toggle('unflip');
        return;
    }
    if(conditions[cards.indexOf(this)]['state'] != UNSELECTED) {
        return;
    }
    if (!this.classList.contains('flip') && !this.classList.contains('unflip')) {
        this.classList.add('flip');
    }else{
        this.classList.toggle('flip');
        this.classList.toggle('unflip');
    }
    switch (uncertainCardsNumber) {
        case 0: {
            uncertainCardsNumber++;
            conditions[cards.indexOf(this)]['state'] = SELECTED;
            break;
        }
        case 1: {
            var index = cards.indexOf(this);
            if(conditions[conditions[index]['pair']]['state'] == SELECTED) {
                conditions[conditions[index]['pair']]['state'] = SOLVED;
                conditions[index]['state'] = SOLVED;
                cards[index].classList.add('right-flip');
                cards[conditions[index]['pair']].classList.add('right');
                cards[index].classList.remove('flip');
                cards[conditions[index]['pair']].classList.remove('flip');
                uncertainCardsNumber = 0;
            }else {
                for (var i = 0 ; i < 12; i++) {
                    if(conditions[i]['state'] == SELECTED) {
                        conditions[i]['state'] = WRONG;
                        cards[i].classList.add('wrong');
                    }
                }
                cards[index].classList.add('wrong-flip');
                conditions[index]['state'] = WRONG;
                uncertainCardsNumber++;
            } 
            break;
        }
        case 2: {
            for (var i = 0; i < 12; i++) {
                if(conditions[i]['state'] == WRONG) {
                    conditions[i]['state'] = UNSELECTED;
                    cards[i].classList.remove('wrong');
                    cards[i].classList.remove('wrong-flip');
                    cards[i].classList.remove('flip');
                    cards[i].classList.add('unflip');
                }
            }
            conditions[cards.indexOf(this)]['state'] = SELECTED;
            uncertainCardsNumber = 1;
            break;
        }

    }
        
    
}

function getRndInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function shuffleCards() {
    var cardsNumbers = [];
    var conditions = []
    for (var i = 0; i < 12; i++) {
        cardsNumbers.push(i);
        conditions.push({});
    }
    var emoji = ['🐙','🦀','🐓','🐷','🐸','🦄'];
    for (var em of emoji) {
        var first = cardsNumbers.splice(getRndInt(cardsNumbers.length), 1);
        cards[first].textContent = em;
        var second = cardsNumbers.splice(getRndInt(cardsNumbers.length), 1);
        cards[second].textContent = em;
        conditions[first] = {'pair' : second, 'state' : UNSELECTED};
        conditions[second] = {'pair' : first, 'state' : UNSELECTED};
    }
    return conditions;
}
function sleep(ms) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < ms);
}