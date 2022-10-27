import './App.css';
import Selecto from 'react-selecto';
import React, { useState } from 'react';

const App = () => {
  const [selectedLanguagesList, setSelectedLanguagesList] = useState([]);
  const [divider, setDivider] = useState(',');
  const americaList = ['en-ca', 'en-us', 'es-mx', 'en-br'];
  const asiaList = [
    'zh-tw',
    'zh-cn',
    'zh-hk',
    'ja-jp',
    'ko-kr',
    'th-th',
    'en-ae',
    'en-au',
    'en-id',
    'en-in',
    'en-my',
    'en-nz',
    'en-ph',
    'en-sg',
    'en-vn',
  ];
  const europeList = [
    'fr-fr',
    'cs-cz',
    'da-dk',
    'de-de',
    'hu-hu',
    'it-it',
    'nl-nl',
    'pl-pl',
    'ru-ru',
    'sv-se',
    'tr-tr',
    'en-eu',
    'en-ro',
    'en-uk',
    'es-es',
  ];

  const regionList = ['en-global', 'en-af', 'en-me'];
  const allList = [...americaList, ...asiaList, ...europeList, ...regionList];

  let selectedLanguages = allList.reduce((accumulator, value) => {
    return { ...accumulator, [value]: false };
  }, {});

  return (
    <div className='App'>
      <div className='container'>
        <p>Divider:</p>
        <input
          type='text'
          value={divider}
          onChange={(e) => setDivider(e.target.value)}
        />

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
          {americaList.map((i) => (
            <div className='cube' key={i} data-lang={i}>
              {i}
            </div>
          ))}

          <p>Asia</p>
          {asiaList.map((i) => (
            <div className='cube' key={i} data-lang={i}>
              {i}
            </div>
          ))}

          <p>Europe</p>
          {europeList.map((i) => (
            <div className='cube' key={i} data-lang={i}>
              {i}
            </div>
          ))}

          <p>Region</p>
          {regionList.map((i) => (
            <div className='cube' key={i} data-lang={i}>
              {i}
            </div>
          ))}
        </div>
        <div className='empty elements'></div>

        <p>{selectedLanguagesList.join(divider)}</p>
      </div>
    </div>
  );
};

export default App;
