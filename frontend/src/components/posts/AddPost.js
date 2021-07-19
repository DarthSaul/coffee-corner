import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import PostDataService from '../../services/posts';

import { UserContext } from '../../contexts/UserContext';

const AddPost = () => {
    const [formData, setFormData] = useState({
        title: '',
        text: ''
    });

    const {
        userObj: { token, loading, profile }
    } = useContext(UserContext);

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
            const res = await PostDataService.createPost(
                profile._id,
                formData,
                token
            );
            console.log(res.data);
            const { status } = res.data;
        } catch (err) {
            console.error(err);
        }
    };

    const { title, text } = formData;

    return (
        <div className='card'>
            <div className='card-body'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Title</label>
                        <input
                            type='text'
                            name='title'
                            value={title}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Post</label>
                        <textarea
                            name='text'
                            value={text}
                            onChange={handleChange}
                            placeholder='Write post here'
                            rows='6'
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

export default AddPost;
