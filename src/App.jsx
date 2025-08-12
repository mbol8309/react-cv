import React, { useState } from 'react';
import cvESData from './data/cv.en.json';
import cvENData from './data/cv.en.json';
import './styles/main.less';
import './styles/tailwind.css';
import ProfilePicture from './components/ProfilePicture';
import ProfileAdditional from './components/ProfileAdditional';
import Section from './components/Section';
import Experience from './components/Experience';
import Education from './components/Education';
import CircleRating from './components/CircleRating';
import IndiceFlotante from './components/IndiceFlotante';

function App() {
    const [lang, setLang] = useState('es');
    const [data, setData] = useState(cvESData);
    const secciones = [
        { id: 'introduccion', nombre: 'Introduction' },
        { id: 'experience', nombre: 'Work Experience' },
        { id: 'skills', nombre: 'Skills' },
        { id: 'languages', nombre: 'Languages' },
        { id: 'technical-knowledge', nombre: 'Technical Knowledge' },

    ];


    return (
        <div><IndiceFlotante secciones={secciones} />
            <div className="cv-container">
                <header>
                    <ProfilePicture />
                    <div className="profile-info" id="introduccion">
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

                <Section text={'Work Experience'} id="experience">
                    {
                        data.experience.map((exp, index) => (
                            <Experience key={index} title={exp.company} subtitle={exp.role}
                                period={exp.period} items={exp.description} />
                        ))
                    }
                </Section>

                <Section text={'Education'} id='education'>
                    {
                        data.education.map((edu, index) => (
                            <Education key={index} title={edu.degree} subtitle={edu.institution}
                                period={edu.period} location={edu.location} />
                        ))
                    }
                </Section>

                <Section text={'Skills'} id='skills'>
                    <div className='section-item'>
                        <ul className='section-items'>
                            {
                                data.skills?.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))
                            }
                        </ul>
                    </div>
                </Section>
                <Section text={'Languages'} id='languages'>
                    <div className='section-item'>
                        <ul className='section-items'>
                            {
                                data.languages?.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))
                            }
                        </ul>
                    </div>
                </Section>

                <Section text={'Technical Knowledge'} id='technical-knowledge'>
                    <div className='section-item'>
                        <ul className='section-items'>
                            <li>Development Technologies and Frameworks
                                <ul className='section-subsubitems'>
                                    {data.technologies?.map((tech, index) => (
                                        <li key={index}>{tech}</li>
                                    ))}
                                </ul>
                            </li>
                            <li>Programming Languages (Estimated Level)
                                <ul className='plain-ul section-subsubitems grid grid-cols-2'>
                                    {data.programming_languages?.map((pl, index) => (
                                        <li key={index} className="same-line whitespace-nowrap">{pl.text} <CircleRating value={pl.value} max={3} /></li>
                                    ))}
                                </ul>

                            </li>
                        </ul>
                    </div>
                </Section>


                <div className="lang-switch">
                    <button onClick={() => setData(cvESData)}>ES</button>
                    <button onClick={() => setData(cvENData)}>EN</button>
                </div>
            </div>
        </div>
    )
}

export default App
