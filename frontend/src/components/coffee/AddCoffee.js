import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import CoffeeDataService from '../../services/coffees';
import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';

import Spinner from '../layout/Spinner';

const AddCoffee = () => {
    const [formData, setFormData] = useState({
        name: '',
        distributor: '',
        origin: '',
        roastType: '',
        tags: []
    });
    const [tagText, setTagText] = useState('');
    const [warning, setWarning] = useState(null);

    const {
        userObj: { token, loading, profile }
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
            const res = await CoffeeDataService.createCoffee(
                profile._id,
                formData,
                token
            );
            const { status } = res.data;
            if (status === 'success') {
                setAlert('Coffee added!', 'success');
                history.push('/coffee');
            }
        } catch (err) {
            setAlert('Whoops, something went wrong.', 'danger');
            console.error(err);
        }
    };

    const handleTagChange = event => {
        const { value } = event.target;
        setTagText(value);
    };

    const handleTagAdd = () => {
        if (tagText === '') {
            const showWarning = () => {
                setWarning({
                    id: 1,
                    show: true,
                    text: `Can't add an empty item.`
                });
                setTimeout(() => {
                    setWarning(null);
                }, 3000);
            };
            showWarning();
        } else {
            setFormData(prevState => ({
                ...prevState,
                tags: prevState.tags.concat(tagText)
            }));
            setTagText('');
        }
    };

    const handleTagRemove = el => {
        setFormData(prevState => ({
            ...prevState,
            tags: prevState.tags.filter(tag => tag !== el)
        }));
    };

    const { name, distributor, origin, roastType, tags } = formData;

    return (
        <div className='card col-10 col-xl-8 mx-auto my-5 p-4'>
            <div className='card-body'>
                {loading ? (
                    <Spinner color='black' margin='auto' />
                ) : !loading && !profile ? (
                    <div className='card-text text-center'>
                        <span className='fs-4'>
                            To add a coffee, please{' '}
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
                            <label className='form-label fs-4'>
                                Coffee Name
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
                            <label className='form-label fs-4'>
                                Distributor
                            </label>
                            <input
                                type='text'
                                name='distributor'
                                value={distributor}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label fs-4'>Origin</label>
                            <input
                                type='text'
                                name='origin'
                                value={origin}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label fs-4'>
                                Roast Type
                            </label>
                            <input
                                type='text'
                                name='roastType'
                                value={roastType}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='form-label fs-4'>Tags</label>
                            {warning && (
                                <div
                                    key={warning.id}
                                    className={`text-danger fw-light mb-4`}
                                >
                                    {warning.text}
                                </div>
                            )}
                            <div className='input-group'>
                                <input
                                    type='text'
                                    value={tagText}
                                    onChange={handleTagChange}
                                    className='form-control'
                                />
                                <button
                                    className='btn btn-outline-secondary px-5'
                                    type='button'
                                    onClick={handleTagAdd}
                                >
                                    Add
                                </button>
                            </div>
                            {tags.length > 0 ? (
                                tags.map((el, ind) => {
                                    return (
                                        <div
                                            className='form-text my-2'
                                            key={ind}
                                        >
                                            <FontAwesomeIcon
                                                icon={faMinusCircle}
                                                className='text-danger me-2'
                                                onClick={e =>
                                                    handleTagRemove(el)
                                                }
                                            />
                                            {el}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className='form-text'>
                                    Items added will appear here.
                                </div>
                            )}
                        </div>
                        <button type='submit' className='btn btn-lg btn-theme'>
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddCoffee;
