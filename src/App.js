import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Arrow from "./components/Arrow";
import TextBox from "./components/TextBox";
import Modal from "./components/Modal";
import axios from 'axios';
import Button from "./components/Button";
const App = () => {
  const [InputLanguage, setInputLanguage] = useState('Dutch')
  const [OutputLanguage, setOutputLanguage] = useState('English')
  const [ShowModal, setShowModal] = useState(null)
  const [Languages, setLanguages] = useState(null)
  const [TextToTranslate, setTextToTranslate] = useState('')
  const [TranslatedText, setTranslatedText] = useState('')

  const getLanguages = async() => {
   const response = await axios('http://localhost:8000/languages')
   setLanguages(response.data)
}

  const translate = async() => {
    const data = {
      TextToTranslate, OutputLanguage, InputLanguage
    }
    const response = await axios('http://localhost:8000/translation',{
      params:data
    })
    setTranslatedText(response.data)
  }

  useEffect(()=>{
    getLanguages();
  },[])

  const handleClick = () => {
    setInputLanguage(OutputLanguage);
    setOutputLanguage(InputLanguage);
  }


  return (
    <div className="App">
      <Helmet>
        <title>Translate Me</title>
      </Helmet>
      {!ShowModal && 
      <>
        <TextBox 
          text='input' 
          selectedLanguage={InputLanguage} 
          setShowModal={setShowModal} 
          TextToTranslate={TextToTranslate}
          setTextToTranslate={setTextToTranslate}
          setTranslatedText={setTranslatedText}
        />
        <div className="arrows" onClick={handleClick}>
          <Arrow/>
        </div>
        <TextBox 
          text='output' 
          selectedLanguage={OutputLanguage} 
          setShowModal={setShowModal}
          TranslatedText={TranslatedText}
        />

        <div className="button" onClick={translate}>
          <Button/>
        </div>

      </>}

      {ShowModal && <Modal 
      setShowModal={setShowModal} 
      languages={Languages} 
      //we are chosing language from modal so, write if modal is input then chose the inputLanguage present in it else chose the outputLanguage
      chosenLanguage={ShowModal === 'input' ? InputLanguage : OutputLanguage} 
      //same thing is gonna happen for setting the Language if it is input or output just it is dependent on the modal[input or output]
      setchosenLanguage={ShowModal === 'input' ? setInputLanguage : setOutputLanguage} 
      />}
    </div>
  );
}

export default App;
