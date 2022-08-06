import React from 'react'
import SelectDropDown from './SelectDropDown'
const TextBox = ({selectedLanguage,text,setShowModal,setTranslatedText,TextToTranslate,setTextToTranslate,TranslatedText}) => {

  const handleClick = () => {
    setTranslatedText('');
    setTextToTranslate('');
  }

  return (
    <div className={text}>
        <SelectDropDown 
            selectedLanguage={selectedLanguage}
            text={text}
            setShowModal={setShowModal}
        />
        <textarea 
            placeholder={text==='input'?"Enter the text":"Translation"}
            disabled={text==='output'}
            onChange={(e) => setTextToTranslate(e.target.value)}
            value={text==="input" ? TextToTranslate : TranslatedText}
        />
        {text === "input" && (
          <div className="delete" onClick={handleClick}>⨯</div>
        )}
    </div>
  )
}

export default TextBox