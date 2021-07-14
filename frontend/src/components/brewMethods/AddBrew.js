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
        ratioWater: 15,
        ratioCoffee: 1,
        grindType: '',
        items: []
    });

    const [itemText, setItemText] = useState('');

    const {
        userObj: { token },
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
                {
                    name,
                    description,
                    weight: {
                        coffee: coffeeWeight,
                        waterRatio: `${ratioWater} grams water per ${ratioCoffee} grams coffee`
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
                        <div className='form-text mb-3'>
                            {formData.items.length > 0
                                ? formData.items.map(
                                      (el, ind) =>
                                          `${el}${
                                              ind + 1 === items.length
                                                  ? ''
                                                  : ', '
                                          } `
                                  )
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
