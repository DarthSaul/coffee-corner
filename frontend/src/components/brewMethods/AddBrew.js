import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import BrewDataService from '../../services/brewMethods';

import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';

import Spinner from '../layout/Spinner';

const AddBrew = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        coffeeWeight: '',
        ratioWater: 15,
        ratioCoffee: 1,
        grindType: '',
        items: []
    });

    const [itemText, setItemText] = useState('');

    const {
        userObj: { token, profile, loading },
        loadUser
    } = useContext(UserContext);

    const { setAlert } = useContext(AlertContext);

    const history = useHistory();

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(state => ({
            ...state,
            [name]: value
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const res = await BrewDataService.newBrew(
                profile._id,
                {
                    name,
                    description,
                    weights: {
                        coffee: coffeeWeight,
                        waterRatio: {
                            gramsWater: ratioWater,
                            gramsCoffee: ratioCoffee
                        }
                    },
                    grindType,
                    items
                },
                token
            );
            const { status } = res.data;
            if (status === 'success') {
                setAlert(`Brew method added!`, 'success');
                loadUser();
                history.push('/brews');
            }
        } catch (err) {
            setAlert(`Whoops, something went wrong.`, 'danger');
            console.error(err);
        }
    };

    const handleItemChange = event => {
        const { value } = event.target;
        setItemText(value);
    };

    const handleItemAdd = () => {
        setFormData(prevState => ({
            ...prevState,
            items: prevState.items.concat(itemText)
        }));
        setItemText('');
    };

    const handleItemRemove = el => {
        setFormData(prevState => ({
            ...prevState,
            items: prevState.items.filter(item => item !== el)
        }));
    };

    const {
        name,
        description,
        coffeeWeight,
        ratioWater,
        ratioCoffee,
        grindType,
        items
    } = formData;

    return (
        <div className='card col-10 col-xl-8 m-auto p-4'>
            <div className='card-body'>
                {loading ? (
                    <Spinner color='black' margin='auto' />
                ) : !loading && !profile ? (
                    <div className='card-text text-center'>
                        <span className='fs-4'>
                            To add a brew method, please first{' '}
                            <Link
                                to='/profile/create'
                                className='fs-2 text-success text-decoration-none'
                            >
                                create a profile
                            </Link>
                            .
                        </span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>
                                Brew Method Name
                            </label>
                            <input
                                type='text'
                                name='name'
                                value={name}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Description</label>
                            <input
                                type='text'
                                name='description'
                                value={description}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Coffee Weight</label>
                            <input
                                type='text'
                                name='coffeeWeight'
                                value={coffeeWeight}
                                onChange={handleChange}
                                className='form-control'
                            />
                            <div className='form-text'>Ex: "20-40 grams"</div>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Water Ratio</label>
                            <div className='row g-2 align-items-center'>
                                <div className='col-4 col-md-2'>
                                    <input
                                        type='number'
                                        name='ratioWater'
                                        value={ratioWater}
                                        onChange={handleChange}
                                        placeholder='15'
                                        min='1'
                                        className='form-control'
                                    />
                                </div>
                                <div className='col-8 col-md-auto'>
                                    grams water per
                                </div>
                                <div className='col-4 col-md-2 col-lg-1'>
                                    <input
                                        type='number'
                                        name='ratioCoffee'
                                        value={ratioCoffee}
                                        onChange={handleChange}
                                        min='1'
                                        className='form-control'
                                    />
                                </div>
                                <div className='col-8 col-md-4 col-lg-3'>
                                    grams coffee
                                </div>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Grind Type</label>
                            <input
                                type='text'
                                name='grindType'
                                value={grindType}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Items</label>
                            <div className='input-group'>
                                <button
                                    className='btn btn-outline-secondary'
                                    type='button'
                                    onClick={handleItemAdd}
                                >
                                    Add
                                </button>
                                <input
                                    type='text'
                                    value={itemText}
                                    onChange={handleItemChange}
                                    className='form-control'
                                />
                            </div>
                            {items.length > 0 ? (
                                items.map((el, ind) => {
                                    return (
                                        <div
                                            className='form-text my-2'
                                            key={ind}
                                        >
                                            <FontAwesomeIcon
                                                icon={faMinusCircle}
                                                className='text-danger me-2'
                                                onClick={e =>
                                                    handleItemRemove(el)
                                                }
                                            />
                                            {el}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className='form-text mb-3'>
                                    Items added will appear here.
                                </div>
                            )}
                        </div>

                        <button type='submit' className='btn btn-success'>
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddBrew;
