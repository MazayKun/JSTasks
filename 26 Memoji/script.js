// Ключевые значения состояний каждой карточки
const UNSELECTED = 0;
const SELECTED = 1;
const WRONG = 2;
const SOLVED = 3;

// Количество активных карт (карты, для которых пара еще не найдена, но они перевернуты рубашкой вниз)
var uncertainCardsNumber = 0;
// Время на игру 
var time = 60;

// Флаг первого клика
var isClicked = false;

// Массив карт с веб страницы
const cards = Array.from(document.querySelectorAll('.card'));

// Объект таймера 
const timer = document.querySelector('.timer');
timer.textContent = '0' + (time - time % 60)/60 + ':' + ((time < 10) ? '0' + time : (time % 60 < 10)? '0' + time % 60 : time % 60 );

// Кнопка play again
const playBtn = document.querySelector('.play');

// Окно окончания игры
const endGame = document.querySelector('.end_game');

// Массив состояний карт
var conditions = shuffleCards(cards);

cards.forEach(card => {
        card.addEventListener('click', clickOnCard);
    }
)
playBtn.addEventListener('click', newGame);
var intervalId; 

// ---------------------Секция функций---------------------------

// Событие клика по карточке 
function clickOnCard(event) {
    if(!isClicked) {
        isClicked = true;
        intervalId = setInterval(gameIter, 1000); 
    }
    // Обратный разворот карточки, которая только что была перевернута, повторным кликом по ней
    if(conditions[cards.indexOf(this)]['state'] == SELECTED && uncertainCardsNumber == 1) {
        uncertainCardsNumber = 0;
        conditions[cards.indexOf(this)]['state'] = UNSELECTED;
        this.classList.toggle('flip');
        this.classList.toggle('unflip');
        return;
    }
    // Игнорирование кликов по картам, которые подсвечены красным или зеленым
    if(conditions[cards.indexOf(this)]['state'] != UNSELECTED) {
        return;
    }
    // Переворот карты, которая лежала рубашкой вверх
    if (!this.classList.contains('flip') && !this.classList.contains('unflip')) {
        this.classList.add('flip');
    }else{
        this.classList.toggle('flip');
        this.classList.toggle('unflip');
    }

    // Выбор ситуации в зависимости от количества активных карт на столе 
    // (Активными считаются перевернутые карты рубашкой вниз без подсветки и карты, подсвеченные красным)
    switch (uncertainCardsNumber) {
        // Активных карт нет, так что мы просто переворачиваем выбранную рубашкой вниз
        case 0: {
            uncertainCardsNumber++;
            conditions[cards.indexOf(this)]['state'] = SELECTED;
            break;
        }
        // Одна активная карта на столе была, мы смотрим, является ли кликнутая ее парой
        // Если это пара, то они оби становятся неактивными и подсвечиваются зеленым
        // Если это не пара, то они остаются активными и подсвечиваются красным
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
                if(hasWon()) {
                    win();
                }
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
        // На столе 2 активных карты, значит это была неверная пара. Просто открывается новая активная карта
        // А 2 красные теряют статус активных и возвращаются в исходное положение
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

// Функция заново начинает игру по клику на кнопку play again
function newGame() {
    uncertainCardsNumber = 0
    conditions = shuffleCards();
    for (var card of cards) {
        card.classList.remove('flip');
        card.classList.remove('unflip');
        card.classList.remove('wrong');
        card.classList.remove('right');
        card.classList.remove('wrong-flip');
        card.classList.remove('right-flip');
    }
    time = 60;
    timer.textContent = '0' + (time - time % 60)/60 + ':' + ((time < 10) ? '0' + time : (time % 60 < 10)? '0' + time % 60 : time % 60 );
    isClicked = false;
    endGame.classList.add('invisible');
    document.querySelector('.jump:nth-child(4)').classList.remove('invisible');
}

// Функция одного тика игрового мира (Максимальный таймер 599 секунды)
function gameIter() {
    time--;
    timer.textContent = '0' + (time - time % 60)/60 + ':' + ((time < 10) ? '0' + time : (time % 60 < 10)? '0' + time % 60 : time % 60 );
    if(time == 0) {
        clearInterval(intervalId);
        timeIsOver();
    }
}

// Функция перетасовки карточек
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

// Функция вызывается при победе в игр
function win() {
    showResult(true);
    clearInterval(intervalId);
}

// Функция вызывается при окончании времени, те при поражении 
function timeIsOver() {
    showResult(false);
}

// Проверка условий победы
function hasWon() {
    for (var condition of conditions) {
        if(condition['state'] != SOLVED) {
            return false;
        }
    }
    return true;
}

// Фунция, которая делает видимым результат (true=win, false=lose)
function showResult(res) {
    var spans = Array.from(document.querySelectorAll('.jump'));
    var letters;
    if(res) {
        playBtn.textContent = 'Play again';
        letters = ['W', 'i', 'n'];
        spans[3].classList.add('invisible');
    }else{
        playBtn.textContent = 'Try again';
        letters = ['L', 'o', 's', 'e'];
    }
    for (var i = 0; i < letters.length; i++) {
        spans[i].textContent = letters[i];
    }
    endGame.classList.remove('invisible');
}

// Случайное число от 0 до max (не включительно)
function getRndInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}