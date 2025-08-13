import React, { useMemo, useRef, useState } from 'react';
import cvESData from './data/cv.es.json';
import cvENData from './data/cv.en.json';


import ProfilePicture from './components/ProfilePicture';
import ProfileAdditional from './components/ProfileAdditional';
import Section from './components/Section';
import ItemDescription from './components/ItemDescription';

import CircleRating from './components/CircleRating';
import IndiceFlotante from './components/IndiceFlotante';
import ScrollToTop from './components/ScrollToTop';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

import { FaDownload } from 'react-icons/fa';
import downloadPDF from './util/download';

const cvData = {
    es: cvESData,
    en: cvENData,
};

function App() {
    const { i18n, t } = useTranslation();
    const lang = i18n.language || 'es'; // Default to Spanish if no language is set
    const cvRef = useRef(null);

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
    ;

    return (
        <div>

            <IndiceFlotante secciones={secciones} />
            <ScrollToTop />
            <div className="cv-container" ref={cvRef}>
                <div className='row no-print'>
                    <LanguageSwitcher />
                    <button
                        onClick={() => downloadPDF(data, lang)}
                        className="download-button"
                    ><FaDownload />
                    </button>
                </div>
                <div className='row item-section'>
                    <div className='col-12 col-md-4 d-flex justify-content-center'>
                        <ProfilePicture />
                    </div>
                    <div className='col-12 col-md-8'>
                        <div className="profile-info d-flex justify-content-center font-weight-light" id="introduccion">
                            <h1 className='text-center'>{data.name}</h1>
                            <div className='cv-profile-additional d-flex justify-content-center flex-column align-items-left mx-auto ml-md-4 mb-'>
                                {
                                    data?.info?.map((item, index) => (
                                        <ProfileAdditional key={index} icono={item.icon} texto={item.text} url={item.url} />
                                    ))

                                }
                            </div>
                        </div>
                    </div>

                </div>

                <Section text={data.abstract?.title} >
                    <div className="font-weight-lighter">{data.abstract?.content} </div>
                </Section>

                <Section text={t('Work Experience')} id="experience">
                    {
                        data.experience.map((exp, index) => (
                            <ItemDescription key={index} title={exp.company} subtitle={exp.role}
                                period={exp.period} items={exp.description} />
                        ))
                    }
                </Section>

                <Section text={t('Education')} id='education'>
                    {
                        data.education.map((edu, index) => (
                            <ItemDescription key={index} title={edu.degree} subtitle={edu.institution} subsubtitle={edu.location}
                                period={edu.period} />
                            // <Education key={index} title={edu.degree} subtitle={edu.institution}
                            //     period={edu.period} location={edu.location} />
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
                        
                            <ul className='section-items pl-3 pl-md-5'>
                                <li className='font-weight-normal'>{t('Development Technologies and Frameworks')}
                                    <ul className='section-subsubitems font-weight-light pl-3 pl-md-5'>
                                        {data.technologies?.map((tech, index) => (
                                            <li key={index}>{tech}</li>
                                        ))}
                                    </ul>
                                </li>
                                <li className='font-weight-normal'>{t('Programming Languages (Estimated Level)')}

                                    <ul className='plain-ul section-subsubitems row font-weight-light pl-3 pl-md-5'>
                                        {data.programming_languages?.map((pl, index) => (
                                            
                                                <li key={index} className="col-12 col-md-6 same-line whitespace-nowrap">{pl.text} <CircleRating value={pl.value} max={3} /></li>
                                            
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
