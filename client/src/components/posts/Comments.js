import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';
import PostDataService from '../../services/posts';

const Comments = ({ comments, post_id, getPost }) => {
    const [text, setText] = useState('');

    const {
        userObj: { token, loading, profile }
    } = useContext(UserContext);

    const { setAlert } = useContext(AlertContext);

    const handleChange = event => {
        const { value } = event.target;
        setText(value);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await PostDataService.postComment(
                { text },
                post_id,
                profile._id,
                token
            );
            window.scrollTo(0, 0);
            setAlert('Comment posted!', 'success');
            setText('');
            getPost(post_id);
        } catch (err) {
            setAlert('Whoops, something went wrong', 'danger');
            console.error(err);
        }
    };

    const handleDelete = async commentId => {
        try {
            await PostDataService.deleteComment(post_id, commentId, token);
            window.scrollTo(0, 0);
            setAlert('Comment deleted.', 'secondary');
            getPost(post_id);
        } catch (err) {
            setAlert('Whoops, something went wrong.', 'danger');
            console.error(err);
        }
    };

    return (
        <div className='mb-5'>
            <div className='card mb-5'>
                <div className='card-body'>
                    <p className='card-title fs-3 mb-3'>Leave a Comment:</p>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <textarea
                                type='text'
                                name='text'
                                value={text}
                                onChange={handleChange}
                                className='form-control'
                                rows='4'
                            />
                        </div>
                        <button type='submit' className='btn btn-success'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <div className='card'>
                <p className='card-title fs-3 p-3'>Comments</p>
                <ul className='list-group list-group-flush px-3 pt-1'>
                    {comments.length > 0 ? (
                        comments.map((comment, ind) => {
                            return (
                                <li
                                    className='list-group-item mt-3'
                                    key={comment._id}
                                >
                                    <h5 className='mb-4'>{comment.text}</h5>
                                    <p className='mb-4 text-muted'>
                                        - <i>By @{comment.profile.firstName}</i>
                                    </p>
                                    {!loading &&
                                        profile &&
                                        profile._id === comment.profile._id && (
                                            <>
                                                <button
                                                    className='btn btn-sm btn-danger mb-3 me-2'
                                                    onClick={e =>
                                                        handleDelete(
                                                            comment._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                </li>
                            );
                        })
                    ) : (
                        <p className='fs-3 p-3'>No reviews yet.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Comments;
