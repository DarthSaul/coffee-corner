import React, { useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import UploadDataService from '../../services/upload';

import { UserContext } from '../../contexts/UserContext';

import Spinner from '../layout/Spinner';

const EditCoffeeImg = () => {
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Choose file');
    const [uploadedFile, setUploadedFile] = useState({
        fileName: null,
        imagePath: null,
        loading: false
    });

    const { id } = useParams();
    const {
        userObj: { token }
    } = useContext(UserContext);

    const handleChange = event => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setUploadedFile(prevState => ({
            ...prevState,
            loading: true
        }));
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await UploadDataService.uploadCoffeeImg(
                id,
                formData,
                token
            );
            const { fileName, path } = res.data;
            setUploadedFile({
                imagePath: path,
                fileName,
                loading: false
            });
        } catch (err) {
            setUploadedFile({
                imagePath: null,
                fileName: null,
                loading: false
            });
            if (err.response.status === 500) {
                console.log('There was a problem with the server');
            } else {
                console.error(err.response.data.msg);
            }
        }
    };

    return (
        <>
            <div className='card'>
                <div className='card-body'>
                    <Link to={`/coffee/${id}`}>
                        <button className='btn btn-outline-secondary my-3'>
                            Back to Coffee
                        </button>
                    </Link>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input
                                type='file'
                                id='customFile'
                                onChange={handleChange}
                                className='mb-3'
                            />
                            <div className='mb-3'>
                                <label htmlFor='customFile'>
                                    Selected: {fileName}
                                </label>
                            </div>
                        </div>
                        {file && (
                            <input
                                type='submit'
                                value='Upload'
                                className='btn btn-primary mb-3'
                            />
                        )}
                    </form>
                    {uploadedFile.loading ? (
                        <div className='mt-4'>
                            <Spinner color='black' />
                        </div>
                    ) : (
                        <div className='my-2'>
                            {uploadedFile.imagePath ? (
                                <>
                                    <h3 className='mb-2'>Just uploaded</h3>
                                    <img
                                        style={{
                                            width: '350px',
                                            height: 'auto'
                                        }}
                                        src={uploadedFile.imagePath}
                                        alt=''
                                    />
                                </>
                            ) : (
                                <h3 className='my-2'>No photo yet.</h3>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default EditCoffeeImg;
