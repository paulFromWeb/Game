import React, { useRef, useState } from 'react';
import magicBlock from '../../assets/img/magicBlock.png';
import magicShot from '../../assets/img/magicShot.png';
import shot from '../../assets/img/shot.jpg';
import shotBlock from '../../assets/img/shotBlock.jpg';

const Heroes = ({ heroesHealth, heroesPunch, firstHeroesHealth, chooseHeroesPunch, moves }) => {
  const [render, setRender] = useState(false);
  const chooseKindOfPunch = () => {
    if (heroesPunch.current.name === 'Удар боевым кадилом') {
      return <p className="replica">Попробую так, {heroesPunch.current.name.toLowerCase()}!</p>;
    } else if (heroesPunch.current.name === 'Вертушка левой пяткой') {
      return <p className="replica">Малыш,ты не знаешь с кем связался! {heroesPunch.current.name}! </p>;
    } else if (heroesPunch.current.name === 'Каноничный фаербол') {
      return <p className="replica">Сейчас я тебя поджарю! {heroesPunch.current.name}!</p>;
    } else {
      return <p className="replica">Попробуй пробей мой {heroesPunch.current.name.toLowerCase()},не выйдет!</p>;
    }
  };
  const helpFunction = (i, isFree) => {
    if (isFree) {
      chooseHeroesPunch(i);
      setRender(!render);
    }
  };
  const getClassName = (elem) => {
    if (heroesPunch.current.name && heroesPunch.current.name === elem.name) {
      return 'magShotActive';
    } else if (elem.isFree === false) {
      return 'blocked';
    } else {
      return '';
    }
  };
  return (
    <div className="mainBlock ">
      <div className="shots">
        {moves.map((elem, i) => {
          return (
            <>
              {i === 2 ? (
                <div className="heroesBlock">
                  <img className="heroes" src={'https://gamepedia.cursecdn.com/gauntlet_gamepedia/c/c7/Wizard.png'} alt="" />
                  <div className="info">
                    <p>Евстафий,боевой маг</p>
                    <div className="healthBlock" style={{ width: `${firstHeroesHealth * 1.5}%` }}>
                      <p
                        style={{
                          width: `${(heroesHealth / firstHeroesHealth) * 100}%`,
                          backgroundColor: `${
                            (heroesHealth / firstHeroesHealth) * 100 < 60 && (heroesHealth / firstHeroesHealth) * 100 > 40
                              ? 'yellow'
                              : (heroesHealth / firstHeroesHealth) * 100 < 40
                              ? 'red'
                              : 'green'
                          }`,
                        }}
                        className="health"
                      >
                        {heroesHealth}HP
                      </p>
                    </div>
                  </div>
                  {heroesPunch.current ? chooseKindOfPunch() : ''}
                </div>
              ) : (
                ''
              )}
              <div
                key={i}
                onClick={() => helpFunction(i, elem.isFree)}
                className={heroesPunch.current ? getClassName(elem) : elem.isFree === false ? 'blocked' : ''}
              >
                <p className="punchTitle">{elem.name}</p>
                <div className="punches">
                  <p>
                    <img src={shot} alt="" /> {elem.physicalDmg}hp
                  </p>
                  <p>
                    <img src={magicShot} alt="" /> {elem.magicDmg}hp
                  </p>
                  <p>
                    {' '}
                    <img src="https://avatars.mds.yandex.net/i?id=6c010ce59889acce61836d6b5ea95a62-5884225-images-thumbs&n=13" alt="" />
                    {elem.cooldown}
                  </p>
                  <p>
                    <img src={shotBlock} alt="" />
                    {elem.physicArmorPercents}%
                  </p>
                  <p>
                    <img src={magicBlock} alt="" />
                    {elem.magicArmorPercents}%
                  </p>

                  <p>
                    {elem.isFree ? (
                      <img src="https://free-png.ru/wp-content/uploads/2021/06/free-png.ru-39.png" alt="" />
                    ) : (
                      <img src="https://www.on-fun.ru/images/forbidden-icon-3.jpg" alt="" />
                    )}
                  </p>
                </div>

                {elem.isFreeShot ? <p>Будет доступен через:{elem.isFreeShot}</p> : ''}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Heroes;
