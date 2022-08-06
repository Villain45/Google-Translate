import React, { useState } from 'react'

const Modal = ({languages,setShowModal,chosenLanguage,setchosenLanguage}) => {
  //chosenLanguage is just to pass the previously selected language and setchosenLanguage changes the langauage which is selected from the modal
  
  const [SearchedLanguage, setSearchedLanguage] = useState('')

  const filteredLanguages = languages.filter((eachLanguage) => eachLanguage.toLowerCase().startsWith(SearchedLanguage.toLowerCase()))

  const handleChange = (e) => {
    setSearchedLanguage(e.target.value)
  }

  const handleClick = (e) => {
    setchosenLanguage(e.target.textContent)  //selectedlanguage from the popped modal is set to the choosen Language
    setShowModal(null)
  }

  return (
    <div className="langOptions">
      <div className="searchBar">
      {/* For selecting the language */}
        <input onChange={handleChange} value={SearchedLanguage}/>
        {/* for closing the modal */}
        <div className="closeModal" onClick={()=>setShowModal(null)}> 
          <svg
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 25"
          >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </div>
      </div>
      {/* listing all the languages */}
      <div className="allOptions">
        <ul>
          {filteredLanguages?.map((selectedLanguage,_idx) =>(
            <div className="listItem">
              <div className="icon">
                {chosenLanguage === selectedLanguage ? '🗸' : ''}
              </div>
              <li 
                key={_idx} 
                onClick={handleClick} 
                style={{color:chosenLanguage===selectedLanguage ? '#8ab4f8' : null}}
              >
                {selectedLanguage}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Modal