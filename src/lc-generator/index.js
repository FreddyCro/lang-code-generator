import styles from './index.module.css';
import Selecto from 'react-selecto';
import React, { useState } from 'react';
import data from './data.json';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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

  const InputPanel = ({ classname, title, value, setValue }) => {
    return (
      <div className={styles.lcInputWrapper}>
        <div className={styles.lcInputTitle}>{title}</div>
        <textarea
          className={styles.lcInput}
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  };

  return (
    <div className='App'>
      <div className={styles.lcContainer}>
        <div className={styles.lcController}>
          <div className={styles.lcInputContainer}>
            {InputPanel({
              title: 'Divider:',
              value: divider,
              setValue: setDivider,
            })}

            {InputPanel({
              title: 'Prefix:',
              value: prefix,
              setValue: setPrefix,
            })}

            {InputPanel({
              title: 'Postfix:',
              value: postfix,
              setValue: setPostfix,
            })}
          </div>

          <div className={styles.lcCopyContainer}>
            <CopyToClipboard text={generateLangCode()} format='text/html'>
              <button className={styles.lcCopy}>Copy to clipboard</button>
            </CopyToClipboard>

            <div className={styles.lcHint}>
              (Press [shift] to select continuously.)
            </div>

            {/* <button className={styles.lcClear} onClick={handleClearSelected}>
              Clear
            </button> */}
          </div>

          <textarea
            id='output'
            className={styles.lcOutput}
            value={generateLangCode()}
            readOnly
          ></textarea>
        </div>

        <div className={styles.lcCubeContainer}>
          <Selecto
            dragContainer={'.elements'}
            selectableTargets={['.selecto-area .cube']}
            hitRate={20}
            selectByClick={true}
            selectFromInside={true}
            toggleContinueSelect={['shift']}
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
            <div className='cube-wrapper'>
              <p>America</p>
              {data.americaList.map((i) => (
                <div className='cube' key={i} data-lang={i}>
                  {i}
                </div>
              ))}
            </div>
            <div className='cube-wrapper'>
              <p>Asia</p>
              {data.asiaList.map((i) => (
                <div className='cube' key={i} data-lang={i}>
                  {i}
                </div>
              ))}
            </div>
            <div className='cube-wrapper'>
              <p>Europe</p>
              {data.europeList.map((i) => (
                <div className='cube' key={i} data-lang={i}>
                  {i}
                </div>
              ))}
            </div>
            <div className='cube-wrapper'>
              <p>Region</p>
              {data.regionList.map((i) => (
                <div className='cube' key={i} data-lang={i}>
                  {i}
                </div>
              ))}
            </div>
          </div>
          <div className='empty elements'></div>
        </div>
      </div>
    </div>
  );
};

export default App;
