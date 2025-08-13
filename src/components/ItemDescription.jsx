import React, { useState } from 'react';

const ItemDescription = ({ title, subtitle,subsubtitle, period, items }) => {


    return (
        <div className='section-item border-bottom mt-3'>
            <div className='section-head d-flex flex-column flex-md-row'>
                <div className='section-main flex-grow-1 flex-column'>
                    <h4 className='font-weight-normal text-justify'>{title}</h4>
                    {subtitle && <div className=' font-weight-light font-italic'>
                        {subtitle}
                    </div>
                    }
                    {subsubtitle && <div className=' font-weight-lighter font-italic'>
                        {subsubtitle}
                    </div>
                    }
                </div>
                <div className='section-period font-weight-normal'>
                    [{period}]
                </div>
            </div>
            {items && <div className='section-items'>
                <ul className='pl-1 pl-md-5 font-weight-lighter'>
                    {items?.map((item, index) => (
                        <li key={index}>{item.text}
                            {item.items && item.items.length > 0 && item.items.map((subItem, subIndex) => (
                                <ul key={subIndex} className='pl-3 pl-md-5'>
                                    <li>{subItem}</li>
                                </ul>
                            ))}
                        </li>
                    ))}
                </ul>
            </div>
            }



        </div>
    );
};

export default ItemDescription;