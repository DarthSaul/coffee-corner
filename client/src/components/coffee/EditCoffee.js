import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import CoffeeDataService from '../../services/coffees';

import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';

const EditCoffee = () => {
    const [formData, setFormData] = useState({
        name: '',
        distributor: '',
        origin: '',
        roastType: '',
        tags: []
    });
    const [tagText, setTagText] = useState('');

    const {
        userObj: { token }
    } = useContext(UserContext);

    const { setAlert } = useContext(AlertContext);

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        const getCoffee = async id => {
            try {
                const coffee = await CoffeeDataService.get(id);
                setFormData(coffee.data);
            } catch (err) {
                console.error(err);
            }
        };
        getCoffee(id);
    }, [history, id]);

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
            const res = await CoffeeDataService.updateCoffee(
                id,
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
        setFormData(prevState => ({
            ...prevState,
            tags: prevState.tags.concat(tagText)
        }));
        setTagText('');
    };

    const handleTagRemove = el => {
        setFormData(prevState => ({
            ...prevState,
            tags: prevState.tags.filter(tag => tag !== el)
        }));
    };

    const { name, distributor, origin, roastType, tags } = formData;

    return (
        <div className='card col-10 col-xl-8 m-auto p-4'>
            <div className='card-body'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Coffee Name</label>
                        <input
                            type='text'
                            name='name'
                            value={name}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Distributor</label>
                        <input
                            type='text'
                            name='distributor'
                            value={distributor}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Origin</label>
                        <input
                            type='text'
                            name='origin'
                            value={origin}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Roast Type</label>
                        <input
                            type='text'
                            name='roastType'
                            value={roastType}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Tags</label>
                        <div className='input-group'>
                            <button
                                className='btn btn-outline-secondary'
                                type='button'
                                onClick={handleTagAdd}
                            >
                                Add
                            </button>
                            <input
                                type='text'
                                value={tagText}
                                onChange={handleTagChange}
                                className='form-control'
                            />
                        </div>
                        {tags.length > 0 ? (
                            tags.map((el, ind) => {
                                return (
                                    <div className='form-text my-2' key={ind}>
                                        <FontAwesomeIcon
                                            icon={faMinusCircle}
                                            className='text-danger me-2'
                                            onClick={e => handleTagRemove(el)}
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
                    <button type='submit' className='btn btn-lg btn-theme'>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditCoffee;
