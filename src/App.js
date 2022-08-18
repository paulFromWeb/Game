import { useRef } from 'react';
import { useState } from 'react';
import './App.css';

import Heroes from './components/Heroes';
import Monster from './components/Monster';
import HeroesParametrs from './utils/HeroesParametrs';
import MonsterParametrs from './utils/MonsterParametrs';

const App = () => {
  const heroesHealth = useRef();
  const firstHeroesHealth = useRef();
  const monsterHealth = useRef(10);
  const [battle, setBattle] = useState(1);

  if (battle === 1) {
    const setHealth = () => {
      const result = window.prompt('Введите начальное здоровье героя,от 5 до 15');
      if (result < 5 || result > 15) {
        setHealth();
      } else {
        heroesHealth.current = result;
      }
    };
    setHealth();
    firstHeroesHealth.current = heroesHealth.current;
    monsterHealth.current = 10;
  }

  const isFreeShotFire = useRef();
  const isFreeShotTail = useRef();
  if (battle === 1) {
    isFreeShotFire.current = 0;
    isFreeShotTail.current = 0;
  }
  const monsterMoves = useRef(MonsterParametrs);
  monsterMoves.current[0].isFree = true;
  monsterMoves.current[0].isFreeShot = 0;
  monsterMoves.current[1].isFree = !isFreeShotFire.current ? true : false;
  monsterMoves.current[1].isFreeShot = isFreeShotFire.current;
  monsterMoves.current[2].isFree = !isFreeShotTail.current ? true : false;
  monsterMoves.current[2].isFreeShot = isFreeShotTail.current;

  let myArr = [0, 1, 2];
  const generatePunch = () => {
    let i = Math.floor(Math.random() * myArr.length);
    if (monsterMoves.current[i].isFree === true) {
      let result = monsterMoves.current[i];
      return result;
    } else {
      let newArr = myArr.filter((elem, ind) => elem !== i);
      let b = Math.floor(Math.random() * newArr.length);
      if (monsterMoves.current[b].isFree === true) {
        let result = monsterMoves.current[b];
        return result;
      } else {
        let result = myArr.filter((elem, ind) => {
          if (elem !== b) {
            return true;
          }
        });
        return monsterMoves.current[result[0]];
      }
    }
  };
  const punch = generatePunch();
  const moves = useRef(HeroesParametrs);
  const isFreeShotLeg = useRef();
  const isFreeShotFireball = useRef();
  const isFreeBlock = useRef();
  if (battle === 1) {
    isFreeShotLeg.current = 0;
    isFreeShotFireball.current = 0;
    isFreeBlock.current = 0;
  }
  moves.current[0].isFree = true;
  moves.current[0].isFreeShot = 0;
  moves.current[1].isFree = !isFreeShotLeg.current ? true : false;
  moves.current[1].isFreeShot = isFreeShotLeg.current;
  moves.current[2].isFree = !isFreeShotFireball.current ? true : false;
  moves.current[2].isFreeShot = isFreeShotFireball.current;
  moves.current[3].isFree = !isFreeBlock.current ? true : false;
  moves.current[3].isFreeShot = isFreeBlock.current;

  if (isFreeShotFire.current) {
    isFreeShotFire.current--;
  }
  if (isFreeShotTail.current) {
    isFreeShotTail.current--;
  }
  if (isFreeShotLeg.current) {
    isFreeShotLeg.current--;
  }
  if (isFreeShotFireball.current) {
    isFreeShotFireball.current--;
  }
  if (isFreeBlock.current) {
    isFreeBlock.current--;
  }

  if (punch && punch.name === 'Огненное дыхание') {
    isFreeShotFire.current = punch.cooldown;
  } else if (punch && punch.name === 'Удар хвостом') {
    isFreeShotTail.current = punch.cooldown;
  }
  const heroesPunch = useRef();
  heroesPunch.current = null;
  const chooseHeroesPunch = (i) => {
    heroesPunch.current = moves.current[i];
    if (heroesPunch.current && heroesPunch.current.name === 'Вертушка левой пяткой') {
      isFreeShotLeg.current = heroesPunch.current.cooldown;
    } else if (heroesPunch.current && heroesPunch.current.name === 'Каноничный фаербол') {
      isFreeShotFireball.current = heroesPunch.current.cooldown;
    } else if (heroesPunch.current && heroesPunch.current.name === 'Магический блок') {
      isFreeBlock.current = heroesPunch.current.cooldown;
    }
  };
  const joinToBattle = () => {
    const heroesDamage = {
      physical: heroesPunch.current.physicalDmg - heroesPunch.current.physicalDmg * (punch.physicArmorPercents / 100),
      magic: heroesPunch.current.magicDmg - heroesPunch.current.magicDmg * (punch.magicArmorPercents / 100),
    };
    const monsterDamage = {
      physical: punch.physicalDmg - punch.physicalDmg * (heroesPunch.current.physicArmorPercents / 100),
      magic: punch.magicDmg - punch.magicDmg * (heroesPunch.current.magicArmorPercents / 100),
    };
    const heroes = monsterHealth.current - (heroesDamage.physical + heroesDamage.magic);
    const monster = heroesHealth.current - (monsterDamage.physical + monsterDamage.magic);
    return {
      heroes,
      monster,
    };
  };
  const helpFunction = async () => {
    let health = joinToBattle();
    heroesHealth.current = health.monster.toFixed(1);
    monsterHealth.current = health.heroes.toFixed(1);
    if (heroesHealth.current < 0 || heroesHealth.current === 0) {
      alert('Вы проиграли!');
      setBattle(1);
    } else if (monsterHealth.current < 0 || monsterHealth.current === 0) {
      monsterHealth.current = 0;
      alert('Вы выиграли!');
      setBattle(1);
    } else {
      setBattle(battle + 1);
    }
  };

  return (
    <div className="App">
      <Heroes
        moves={moves.current}
        heroesHealth={heroesHealth.current}
        heroesPunch={heroesPunch}
        chooseHeroesPunch={chooseHeroesPunch}
        punch={punch}
        monsterHealth={monsterHealth.current}
        firstHeroesHealth={firstHeroesHealth.current}
      />
      <div className="centerBlock">
        <p>Бой №{battle}</p>
        <button onClick={() => helpFunction()}>{battle === 1 ? 'Вступить в бой!' : 'Продолжить атаку!'}</button>
      </div>

      <Monster monsterHealth={monsterHealth.current} punch={punch ? punch.name : ''} monsterMoves={monsterMoves.current} />
    </div>
  );
};

export default App;
