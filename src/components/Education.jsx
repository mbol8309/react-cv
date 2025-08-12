import React, { useState } from 'react';

const Education = ({ title, subtitle, period, location }) => {


    return (
        <div className='section-item'>
            <div className='section-head'>
                <div className='section-main'>
                    <h4>{title}</h4>
                    <div className='section-subtitle'>
                        {subtitle}
                    </div>
                    <div className='section-subsubtitle'>
                        {location}
                    </div>
                </div>
                <div className='section-period'>
                    [{period}]
                </div>
            </div>
        </div>
    );
};

export default Education;