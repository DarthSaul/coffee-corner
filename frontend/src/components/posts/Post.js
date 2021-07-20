import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import PostDataService from '../../services/posts';

import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';

import Comments from './Comments';

const Post = () => {
    const [postState, setPostState] = useState({
        _id: null,
        title: '',
        text: '',
        likes: [],
        comments: [],
        profile: null
    });
    const [loading, setLoading] = useState(true);

    const { userObj, loadUser } = useContext(UserContext);
    const { setAlert } = useContext(AlertContext);

    const { post_id } = useParams();

    const history = useHistory();

    useEffect(() => {
        getPost(post_id);
    }, [post_id]);

    const getPost = async id => {
        try {
            const post = await PostDataService.getPostById(id);
            setPostState(post.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const deletePost = async () => {
        try {
            await PostDataService.deletePost(
                post_id,
                userObj.profile._id,
                userObj.token
            );
            setAlert('Post removed.', 'secondary');
            loadUser();
            history.push('/posts');
        } catch (err) {
            setAlert(`Whoops, something went wrong.`, 'danger');
            console.error(err);
        }
    };

    const likePost = async () => {
        try {
            await PostDataService.likePost(
                post_id,
                userObj.profile._id,
                userObj.token
            );
            getPost(post_id);
            setAlert('Liked post!', 'success');
        } catch (err) {
            setAlert(err.response.data.msg, 'danger');
            console.error(err);
        }
    };
    const unlikePost = async () => {
        try {
            await PostDataService.unlikePost(
                post_id,
                userObj.profile._id,
                userObj.token
            );
            getPost(post_id);
            setAlert('Unliked post.', 'secondary');
        } catch (err) {
            setAlert(err.response.data.msg, 'danger');
            console.error(err);
        }
    };

    const { _id, title, text, likes, comments, profile } = postState;

    return (
        <div className='col-lg-10 m-auto mt-5'>
            <div className='card my-5'>
                {!loading && (
                    <>
                        <div className='card-body p-5'>
                            <h2 className='card-title mb-2'>{title}</h2>
                            <h6 className='card-subtitle mb-4 text-muted'>
                                By {profile.firstName}
                            </h6>
                            <div className='div mb-4'>
                                <button
                                    className='btn btn-success me-2'
                                    onClick={likePost}
                                >
                                    <FontAwesomeIcon
                                        icon={faThumbsUp}
                                        className='me-2'
                                    />{' '}
                                    {likes.length}
                                </button>
                                <button
                                    className='btn btn-warning'
                                    onClick={unlikePost}
                                >
                                    <FontAwesomeIcon icon={faThumbsDown} />
                                </button>
                            </div>

                            <div className='card-text'>
                                <p>{text}</p>
                            </div>
                        </div>
                        {userObj.profile &&
                            profile._id === userObj.profile._id && (
                                <div className='card-footer px-5'>
                                    <Link to={`/post/edit/${_id}`}>
                                        <button className='btn btn-warning me-3'>
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        className='btn btn-danger'
                                        onClick={deletePost}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                    </>
                )}
            </div>

            <Comments comments={comments} post_id={post_id} getPost={getPost} />
        </div>
    );
};

export default Post;
