import React, { useState } from 'react';

const Experience = ({ title, subtitle, period, items }) => {


    return (
        <div className='section-item'>
            <div className='section-head'>
                <div className='section-main'>
                    <h4>{title}</h4>
                    <div className='section-subtitle'>
                        {subtitle}
                    </div>
                </div>
                <div className='section-period'>
                    [{period}]
                </div>
            </div>
            <div className='section-items'>
                <ul>
                    {items?.map((item, index) => (
                        <li key={index}>{item.text}
                        {item.items && item.items.length > 0 && item.items.map((subItem, subIndex) => (
                            <ul key={subIndex}>
                                <li>{subItem}</li>
                            </ul>
                        ))}
                        </li>
                    ))}
                </ul>
            </div>



        </div>
    );
};

export default Experience;