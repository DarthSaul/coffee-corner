import React from 'react';
import coffee from '../img/coffee_beans_ground.jpg';

const CoffeeItem = () => {
    return (
        <div className='card col-md-10 col-lg-8 col-xl-6 m-auto'>
            <img src={coffee} className='card-img-top' alt='...' />
            <div className='card-body'>
                <h5 className='card-title'>Card title</h5>
                <p className='card-text'>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                </p>

                <a href='/coffee/1234/review' className='btn btn-primary'>
                    Button
                </a>
            </div>
        </div>
    );
};

export default CoffeeItem;
