import { useState, useEffect } from 'react';

const IndiceFlotante = ({ secciones }) => {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            secciones.forEach(sec => {
                const element = document.getElementById(sec.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(sec.id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [secciones]);

    const scrollToSection = (id) => {
        console.log(`Scrolling to section: ${id}`);
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="floating-index">
            <div className="foating-index-content">
                <ul>
                    {secciones.map((sec, index) => (
                        <li className='index-item' key={index}><a
                            onClick={() => scrollToSection(sec.id)}


                        >
                            <span>
                                {sec.nombre}
                            </span>
                        </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default IndiceFlotante;