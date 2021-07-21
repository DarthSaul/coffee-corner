import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import PostDataService from '../../services/posts';

import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';

import Spinner from '../layout/Spinner';

const AddPost = () => {
    const [formData, setFormData] = useState({
        title: '',
        text: ''
    });

    const {
        userObj: { token, loading, profile },
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
            const res = await PostDataService.createPost(
                profile._id,
                formData,
                token
            );
            const { status } = res.data;
            if (status === 'success') {
                setAlert(`Post created!`, 'success');
                loadUser();
                history.push('/posts');
            }
        } catch (err) {
            setAlert(`Whoops, something went wrong.`, 'danger');
            console.error(err);
        }
    };

    const { title, text } = formData;

    return (
        <div className='card col-lg-10 mx-auto mt-5'>
            <div className='card-body p-4'>
                {loading ? (
                    <Spinner margin='auto' />
                ) : !loading && !profile ? (
                    <div className='card-text text-center py-4'>
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
                            <label className='form-label fs-4'>Title</label>
                            <input
                                type='text'
                                name='title'
                                value={title}
                                onChange={handleChange}
                                className='form-control'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='form-label fs-4'>Post</label>
                            <textarea
                                name='text'
                                value={text}
                                onChange={handleChange}
                                placeholder='Write post here'
                                rows='6'
                                className='form-control'
                                required
                            />
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

export default AddPost;
