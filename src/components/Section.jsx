import React from 'react';

const Section = ({ text, children, id }) => {
    return (
        <section id={id} className='item'>
            <h3>
                {text}
            </h3>
            <div className='mt-3 font-weight-light section-content'>
                {children}
            </div>
        </section>
    );
};

export default Section;