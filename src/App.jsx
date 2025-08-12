import React, { useState } from 'react';
import cvESData from './data/cv.en.json';
import cvENData from './data/cv.en.json';
import './styles/tailwind.css';
import './styles/main.less';
import ProfilePicture from './components/ProfilePicture';
import ProfileAdditional from './components/ProfileAdditional';
import Section from './components/Section';
import Experience from './components/Experience';

function App() {
  const [lang, setLang] = useState('es');
  const [data,setData] = useState(cvESData);

    
  return (
    <div className="cv-container">
          <header>
              <ProfilePicture />
              <div className="profile-info">
        <h1>{data.name}</h1>
                  <div className='cv-profile-additional'>
                      {
                          data?.info?.map((item, index) => (
                              <ProfileAdditional key={index} icono={item.icon} texto={item.text} url={item.url} />
                          ))
                          
                      }
        </div>
                  </div>
          </header>
          
          <Section text={data.abstract?.title} >
              <div className="lighter-text">{data.abstract?.content} </div>
         </Section>

          <Section text={'Work Experience'}>
              {
                  data.experience.map((exp, index) => (
                      <Experience key={index} title={exp.company} subtitle={exp.role}
                          period={exp.period} items={exp.description} />
                  ))
              }
      </Section>

      <section>
        <h3>Educación</h3>
        {data.education.map((edu, index) => (
          <div key={index}>
            <strong>{edu.degree}</strong> - {edu.institution} ({edu.year})
          </div>
        ))}
      </section>

      <div className="lang-switch">
        <button onClick={() => setData(cvESData)}>ES</button>
        <button onClick={() => setData(cvENData)}>EN</button>
      </div>
    </div>
  )
}

export default App
