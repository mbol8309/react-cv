import React, { useMemo, useState } from 'react';
import cvESData from './data/cv.es.json';
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
import ScrollToTop from './components/ScrollToTop';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';


const cvData = {
    es: cvESData,
    en: cvENData,
};

function App() {
    const { i18n, t } = useTranslation();
    const lang =  i18n.language || 'es'; // Default to Spanish if no language is set

    const data = useMemo(() => {
        return cvData[lang] || cvData.es;
    }, [lang]);

    const secciones = useMemo(() => {
        return [
        { id: 'introduccion', nombre: t('Introduction') },
        { id: 'experience', nombre: t('Work Experience') },
        { id: 'skills', nombre: t('Skills') },
        { id: 'languages', nombre: t('Languages') },
        { id: 'technical-knowledge', nombre: t('Technical Knowledge') },

    ]
    }, [t, lang]);


    return (
        <div>
            
            <IndiceFlotante secciones={secciones} />
            <ScrollToTop />
            <div className="cv-container">
                <LanguageSwitcher />
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

                <Section text={t('Work Experience')} id="experience">
                    {
                        data.experience.map((exp, index) => (
                            <Experience key={index} title={exp.company} subtitle={exp.role}
                                period={exp.period} items={exp.description} />
                        ))
                    }
                </Section>

                <Section text={t('Education')} id='education'>
                    {
                        data.education.map((edu, index) => (
                            <Education key={index} title={edu.degree} subtitle={edu.institution}
                                period={edu.period} location={edu.location} />
                        ))
                    }
                </Section>

                <Section text={t('Skills')} id='skills'>
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
                <Section text={t('Languages')} id='languages'>
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

                <Section text={t('Technical Knowledge')} id='technical-knowledge'>
                    <div className='section-item'>
                        <ul className='section-items'>
                            <li>{t('Development Technologies and Frameworks')}
                                <ul className='section-subsubitems'>
                                    {data.technologies?.map((tech, index) => (
                                        <li key={index}>{tech}</li>
                                    ))}
                                </ul>
                            </li>
                            <li>{t('Programming Languages (Estimated Level)')}
                                <ul className='plain-ul section-subsubitems grid grid-cols-2'>
                                    {data.programming_languages?.map((pl, index) => (
                                        <li key={index} className="same-line whitespace-nowrap">{pl.text} <CircleRating value={pl.value} max={3} /></li>
                                    ))}
                                </ul>

                            </li>
                        </ul>
                    </div>
                </Section>


            
            </div>
        </div>
    )
}

export default App
