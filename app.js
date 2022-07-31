let btnLeft = document.querySelector('.left');
let btnRight = document.querySelector('.right');
let btnShoot = document.querySelector('.shoot');
let falcon = document.querySelector('.falcon');
let game = document.querySelector('.game');

let angle = 0;

/*
    direction 0 -> JOS
    direction 1 -> STANGA
    direction 2 -> SUS
    direction 3 -> DREAPTA
*/

let direction = 0;


//rotire spre stanga
btnLeft.addEventListener('click', () => {
    falcon.style.transform = `rotate(${angle + 90}deg)`;
    angle += 90;

    direction = (direction + 1) % 4;
    console.log(direction);
}); 

//rotire spre dreapta
btnRight.addEventListener('click', () => {
    falcon.style.transform = `rotate(${angle - 90}deg)`;
    angle -= 90;
    
    direction = ((direction - 1) % 4 + 4) % 4;
    // console.log(direction);
});


//generez navele inamice (tie fightere)
let tieGenerator = setInterval(() => {
    let tie = document.createElement('img');
    tie.classList.add('tie');
    tie.height = '50';
    tie.src = 'tie.png';
    tie.alt = 'tie';

    let poz = Math.floor(Math.random() * 4);
    // let poz = 0;

    if(poz == 0) {
        tie.style.animation = 'tie0 5s linear';
    } else if(poz == 1) {
        tie.style.animation = 'tie1 5s linear';
    } else if(poz == 2) {
        tie.style.animation = 'tie2 5s linear';
    } else if(poz == 3) {
        tie.style.animation = 'tie3 5s linear';
    }

    game.appendChild(tie);


    setTimeout(() => {
        tie.remove();
    }, 6000);

}, 3000);

//tragere
btnShoot.addEventListener('click', () => {
    let laser = document.createElement('div');
    laser.classList.add('laser');

    if(direction == 0) {
        laser.style.animation = 'laser0 1s linear';
    } else if( direction == 1 ) {
        laser.style.animation = 'laser1 1s linear';
    } else if(direction == 2) {
        laser.style.animation = 'laser2 1s linear';
    } else if( direction == 3 ) {
        laser.style.animation = 'laser3 1s linear';
    }



    let interval = setInterval(() => {
        let crd = laser.getBoundingClientRect();
        // console.log(crd);
        let enemy = document.querySelectorAll('.tie');

        for(let ship of enemy) {
            let target = ship.getBoundingClientRect();

            if( crd.left < target.left + target.width && crd.left + crd.width > target.left &&
                crd.top < target.top + target.width && crd.top + crd.height > target.top ) {

                laser.remove();
                ship.remove();
                // console.log('WIN');
            }
        }
    }, 1);

    game.appendChild(laser);
    setTimeout(() => {
        laser.remove();
        clearInterval(interval);
    }, 1000);
});


//Verific daca a ajuns un tie la falcon
setInterval(() => {

    let flc = falcon.getBoundingClientRect();
    let enemyShips = document.querySelectorAll('.tie');

    for(let ship of enemyShips) {
        let target = ship.getBoundingClientRect();

        if( flc.left < target.left + target.width && flc.left + flc.width > target.left &&
            flc.top < target.top + target.width && flc.top + flc.height > target.top ) {

            falcon.remove();
            ship.remove();
            clearInterval(tieGenerator);
            console.log('LOSE');

            //Ecranul de final pt ca am pierdut :(

            let finish = document.createElement('div');
            finish.classList.add('finish');
            document.body.appendChild(finish);

            let finishTxt = document.createElement('h1');
            finishTxt.innerHTML = 'You lost!'
            finish.appendChild(finishTxt);
        }
    }

}, 1);