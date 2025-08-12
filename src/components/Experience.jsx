import React, { useState } from 'react';

const Experience = ({ title, subtitle, period, items }) => {


    return (
        <div className='experience-item'>
            <div className='experience-head'>
                <div className='experience-main'>
                    <h4>{title}</h4>
                    <div className='experience-subtitle'>
                        {subtitle}
                    </div>
                </div>
                <div className='experience-period'>
                    [{period}]
                </div>
            </div>
            <div className='experience-items'>
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