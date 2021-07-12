import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BrewDataService from '../../services/brewMethods';
import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';

const AddBrew = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        coffeeWeight: '',
        waterRatio: '',
        grindType: '',
        items: []
    });

    const [itemText, setItemText] = useState('');

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
            const res = await BrewDataService.newBrew(
                {
                    name,
                    description,
                    weight: {
                        coffee: coffeeWeight,
                        waterRatio
                    },
                    grindType,
                    items
                },
                token
            );
            const { status } = res.data;
            if (status === 'success') {
                setAlert(`Brew method added!`, 'success');
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

    const { name, description, coffeeWeight, waterRatio, grindType, items } =
        formData;

    return (
        <div className='card col-md-8 col-lg-6 m-auto p-4'>
            <div className='card-body'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Method Name</label>
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
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Water Ratio</label>
                        <input
                            type='text'
                            name='waterRatio'
                            value={waterRatio}
                            onChange={handleChange}
                            className='form-control'
                        />
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
                        <div className='form-text mb-3'>
                            {formData.items.length > 0
                                ? formData.items.map(el => `${el}, `)
                                : 'Items added will appear here.'}
                        </div>
                    </div>

                    <button type='submit' className='btn btn-success'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBrew;
