import React, { Component } from 'react';

export const Product = ({picture, title, price}) => {
    //console.log(props);
    console.log(picture, title, price);
    return (
        <div>
            <img src={picture}/>
            <p>{title}</p>
            <span>{price}</span>
        </div>
    )
}
