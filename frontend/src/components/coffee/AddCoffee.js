import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CoffeeDataService from '../../services/coffees';
import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';

const AddCoffee = () => {
    const [formData, setFormData] = useState({
        name: '',
        distributor: '',
        origin: '',
        roastType: '',
        tags: []
    });

    const {
        userObj: { token }
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
            const res = await CoffeeDataService.createCoffee(formData, token);
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
                    <button type='submit' className='btn btn-success'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCoffee;
