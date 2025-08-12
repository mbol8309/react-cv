import React from 'react';

const Section = ({ text, children, id }) => {
    return (
        <section id={id}>
            <h3>
                {text}
            </h3>
            <div className='section-content'>
                {children}
            </div>
        </section>
    );
};

export default Section;