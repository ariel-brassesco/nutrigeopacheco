import React from 'react';

export const Loader = (props) => {
    const {src, className} = props;
    const defaultClass = 'loader-generic';
    const image = (src)?<img src={src}/>:'';
    
    return (
        <div className={className || defaultClass}>
            {image}
        </div>
    )   
}