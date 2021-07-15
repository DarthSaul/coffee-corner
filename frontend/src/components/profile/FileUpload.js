import React, { useState, useContext } from 'react';
import UploadDataService from '../../services/upload';

import { UserContext } from '../../contexts/UserContext';

import Spinner from '../layout/Spinner';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Choose file');
    const [uploadedFile, setUploadedFile] = useState({
        fileName: null,
        imagePath: null,
        loading: false
    });
    const {
        userObj: { user, token },
        loading
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
            const res = await UploadDataService.uploadFile(formData, token);
            const { fileName, path } = res.data;
            setUploadedFile({
                imagePath: path,
                fileName,
                loading: false
            });
        } catch (err) {
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
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input
                                type='file'
                                id='customFile'
                                onChange={handleChange}
                            />
                            <div className='mt'>
                                <label htmlFor='customFile'>
                                    Selected: {fileName}
                                </label>
                            </div>
                        </div>
                        {file && (
                            <input
                                type='submit'
                                value={
                                    user.avatar && user.avatar.filename
                                        ? 'Replace'
                                        : 'Upload'
                                }
                                className='btn btn-primary'
                            />
                        )}
                    </form>
                    {user === null || loading ? (
                        <div>
                            <Spinner />
                        </div>
                    ) : (
                        <div className='my-2'>
                            {user.avatar || uploadedFile.imagePath ? (
                                <>
                                    <h3 className='mt'>
                                        {uploadedFile.imagePath
                                            ? 'Just uploaded'
                                            : 'Current'}
                                    </h3>
                                    <img
                                        style={{
                                            width: '350px',
                                            height: 'auto'
                                        }}
                                        src={
                                            uploadedFile.imagePath
                                                ? uploadedFile.imagePath
                                                : user.avatar.url
                                        }
                                        alt=''
                                    />
                                </>
                            ) : (
                                <h3 className='my-2'>
                                    User has not added a profile picture yet.
                                </h3>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default FileUpload;
