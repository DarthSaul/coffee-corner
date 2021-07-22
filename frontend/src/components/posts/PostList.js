import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PostDataService from '../../services/posts';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await PostDataService.getAll();
                setPosts(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        getPosts();
        setLoading(false);
    }, []);

    return (
        <div className='row'>
            <div className='col-10 mx-auto text-center mt-3 mb-5'>
                <Link to='/post/new'>
                    <button className='btn btn-new'>Start New Post</button>
                </Link>
            </div>
            {!loading &&
                posts.map((post, ind) => {
                    const postImg =
                        post.profile && post.profile.avatar
                            ? post.profile.avatar.medium
                            : 'https://res.cloudinary.com/darthsaul/image/upload/v1626367195/Coffee-Corner/no_image_wkgy3c.png';
                    return (
                        <div className='col-xl-10 mx-auto' key={ind}>
                            <div className='card mb-4'>
                                <div className='card-header p-4'>
                                    <Link
                                        to={`/post/${post._id}`}
                                        className='text-decoration-none'
                                    >
                                        <h3 className='post-title'>
                                            {post.title}
                                        </h3>
                                    </Link>
                                </div>
                                <div className='card-body p-4 my-3'>
                                    <div className='row'>
                                        <div className='col-sm-3 d-flex align-items-center'>
                                            <img
                                                src={postImg}
                                                alt='Profile'
                                                className='rounded-start mw-100'
                                            />
                                        </div>
                                        <div className='col-sm-8 ms-3 mt-4 mt-sm-0 d-flex flex-column justify-content-between'>
                                            <p className='fs-3'>
                                                By {post.profile.firstName}
                                            </p>
                                            <p className='fs-5 fw-normal'>
                                                {post.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default PostList;
