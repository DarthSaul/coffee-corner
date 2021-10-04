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

    let avatar =
        'https://res.cloudinary.com/darthsaul/image/upload/v1626367195/Coffee-Corner/no_image_wkgy3c.png';

    return (
        <>
            <div className='row'>
                <div className='col-10 col-xl-12 mx-auto text-center mt-3 mb-5'>
                    <Link to='/post/new'>
                        <button className='btn btn-new w-100'>
                            Start New Post
                        </button>
                    </Link>
                </div>
            </div>
            <div className='row justify-content-center justify-content-xl-start'>
                {!loading &&
                    posts.map((post, ind) => {
                        if (post.profile && post.profile.avatar) {
                            avatar = post.profile.avatar.medium;
                        }

                        return (
                            <div
                                className='col-10 col-xl-6 d-flex align-items-stretch'
                                key={ind}
                            >
                                <div className='card mb-4 w-100'>
                                    <div className='card-header p-4'>
                                        <h3 className='post-title'>
                                            {post.title}
                                        </h3>
                                    </div>
                                    <div className='card-body p-4 my-3'>
                                        <div className='row align-items-start ms-3'>
                                            <img
                                                src={avatar}
                                                alt='Profile'
                                                className='post-card-img col-3'
                                            />
                                            <div className='col-auto ms-4'>
                                                <p className='fs-3 text-muted'>
                                                    Posted by{' '}
                                                    {post.profile.firstName}
                                                </p>
                                                <Link
                                                    to={`/post/${post._id}`}
                                                    className='text-decoration-none'
                                                >
                                                    <button className='btn btn-lg btn-outline-success'>
                                                        View Post
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default PostList;
