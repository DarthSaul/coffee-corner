import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import PostDataService from '../../services/posts';

import { UserContext } from '../../contexts/UserContext';

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

    const { userObj } = useContext(UserContext);

    const { post_id } = useParams();

    const history = useHistory();

    useEffect(() => {
        const getPost = async id => {
            try {
                const post = await PostDataService.getPostById(id);
                setPostState(post.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };
        getPost(post_id);
    }, [post_id]);

    const { _id, title, text, likes, comments, profile } = postState;

    return (
        <div>
            <div className='card col-lg-10 m-auto'>
                {!loading && (
                    <>
                        <div className='card-body p-5'>
                            <h2 className='card-title mb-2'>{title}</h2>
                            <h6 className='card-subtitle mb-4 text-muted'>
                                By {profile.firstName}
                            </h6>
                            <div className='card-text'>
                                <p>{text}</p>
                            </div>
                        </div>
                        {userObj.profile &&
                            profile._id === userObj.profile._id && (
                                <div className='card-footer px-5'>
                                    <Link to={`/post/edit/${_id}`}>
                                        <button className='btn btn-warning'>
                                            Edit
                                        </button>
                                    </Link>
                                </div>
                            )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Post;
