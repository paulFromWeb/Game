import React from 'react';
import magicBlock from '../../assets/img/magicBlock.png';
import magicShot from '../../assets/img/magicShot.png';
import shot from '../../assets/img/shot.jpg';
import shotBlock from '../../assets/img/shotBlock.jpg';
const Monster = ({ monsterHealth, punch, monsterMoves }) => {
  const choosePunch = () => {
    if (punch === 'Огненное дыхание') {
      return <p className="replica">Я тебе щаc сделаю {punch.toLowerCase()}!</p>;
    } else if (punch === 'Удар хвостом') {
      return <p className="replica">Получай {punch.toLowerCase()}!</p>;
    } else {
      return <p className="replica">A что насчет такого?! {punch}! Ха-ха!</p>;
    }
  };
  return (
    <div className="mainBlock ">
      <div className="shots">
        {monsterMoves.map((elem, i) => {
          return (
            <>
              {i === 2 ? (
                <div className="monsterBlock">
                  <img
                    className="monster"
                    src="https://monsterhunter.tools/img/projects/monsterhunter.tools/assets/img/images/mhr-monster-rajang/render.png?buildId=tCzETvJPLdjzZERW3E9ddX"
                    alt=""
                  />
                  <div className="info">
                    <div className="healthBlock" style={{ width: `${10 * 1.5}%` }}>
                      <p
                        className="health"
                        style={{
                          width: `${(monsterHealth / 10) * 100}%`,
                          backgroundColor: `${
                            (monsterHealth / 10) * 100 < 60 && (monsterHealth / 10) * 100 > 40 ? 'yellow' : (monsterHealth / 10) * 100 < 40 ? 'red' : 'green'
                          }`,
                        }}
                      >
                        {monsterHealth}HP
                      </p>
                    </div>
                    <p>Лютый,монстр</p>
                  </div>
                  {choosePunch()}
                </div>
              ) : (
                ''
              )}

              <div key={i} className={punch === elem.name ? 'active' : elem.isFree === false ? 'blocked' : ''}>
                <p className="punchTitle">{elem.name} </p>
                <div className="punches">
                  <p>
                    <img src={shot} alt="" /> {elem.physicalDmg}hp
                  </p>
                  <p>
                    <img src={magicShot} alt="" /> {elem.magicDmg}hp
                  </p>
                  <p>
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

export default Monster;
