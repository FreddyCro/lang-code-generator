import styles from './index.module.css';
import Selecto from 'react-selecto';
import React, { useState } from 'react';
import data from './data.json';

const App = () => {
  const allList = [
    ...data.americaList,
    ...data.asiaList,
    ...data.europeList,
    ...data.regionList,
  ];

  let selectedLanguages = allList.reduce((accumulator, value) => {
    return { ...accumulator, [value]: false };
  }, {});

  // state
  const [selectedLanguagesList, setSelectedLanguagesList] = useState([]);
  const [prefix, setPrefix] = useState('');
  const [postfix, setPostfix] = useState('');
  const [divider, setDivider] = useState(',');

  const generateLangCode = () => {
    return selectedLanguagesList
      .map((e) => `${prefix}${e}${postfix}`)
      .join(divider);
  };

  return (
    <div className='App'>
      <div className={styles.lcContainer}>
        <div className={styles.lcController}>
          <div className={styles.lcInputContainer}>
            <p className={styles.test}>Divider:</p>
            <input
              type='text'
              value={divider}
              onChange={(e) => setDivider(e.target.value)}
            />

            <p>Prefix:</p>
            <input
              type='text'
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            />

            <p>Postfix:</p>
            <input
              type='text'
              value={postfix}
              onChange={(e) => setPostfix(e.target.value)}
            />
          </div>

          <div className={styles.lcOutput}>
            <p>{generateLangCode()}</p>

            <button>Copy</button>
          </div>
        </div>

        <div className={styles.lcCubeContainer}>
          <Selecto
            dragContainer={'.elements'}
            selectableTargets={['.selecto-area .cube']}
            hitRate={50}
            selectByClick={true}
            selectFromInside={true}
            continueSelect={true}
            ratio={0}
            onSelect={(e) => {
              e.selected.forEach((el) => {
                selectedLanguages[el.dataset.lang] = true;
              });

              e.added.forEach((el) => {
                el.classList.add('selected');
              });

              e.removed.forEach((el) => {
                selectedLanguages[el.dataset.lang] = false;
                el.classList.remove('selected');
              });

              setSelectedLanguagesList(
                allList.filter((code) => {
                  return selectedLanguages[code] === true;
                })
              );
            }}
          ></Selecto>

          <div className='elements selecto-area' id='selecto1'>
            <p>America</p>
            {data.americaList.map((i) => (
              <div className='cube' key={i} data-lang={i}>
                {i}
              </div>
            ))}

            <p>Asia</p>
            {data.asiaList.map((i) => (
              <div className='cube' key={i} data-lang={i}>
                {i}
              </div>
            ))}

            <p>Europe</p>
            {data.europeList.map((i) => (
              <div className='cube' key={i} data-lang={i}>
                {i}
              </div>
            ))}

            <p>Region</p>
            {data.regionList.map((i) => (
              <div className='cube' key={i} data-lang={i}>
                {i}
              </div>
            ))}
          </div>
          <div className='empty elements'></div>
        </div>
      </div>
    </div>
  );
};

export default App;
