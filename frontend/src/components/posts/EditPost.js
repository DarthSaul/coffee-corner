import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import PostDataService from '../../services/posts';

import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';

const EditPost = ({ postTitle, postText }) => {
    const [formData, setFormData] = useState({
        title: postTitle,
        text: postText
    });
    const [loading, setLoading] = useState(true);

    const {
        userObj: { token },
        loadUser
    } = useContext(UserContext);

    const { setAlert } = useContext(AlertContext);

    const history = useHistory();
    const { post_id } = useParams();

    useEffect(() => {
        const getPost = async id => {
            try {
                const post = await PostDataService.getPostById(id);
                setFormData(post.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };
        getPost(post_id);
    }, [post_id]);

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
            const res = await PostDataService.updatePost(
                post_id,
                formData,
                token
            );
            const { status } = res.data;
            if (status === 'success') {
                setAlert(`Post updated!`, 'success');
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
            <div className='card-body'>
                {!loading && (
                    <>
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
                            <div className='mb-3'>
                                <label className='form-label fs-4'>Post</label>
                                <textarea
                                    name='text'
                                    value={text}
                                    onChange={handleChange}
                                    rows='6'
                                    className='form-control'
                                    required
                                />
                            </div>
                            <button type='submit' className='btn btn-success'>
                                Submit
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default EditPost;
