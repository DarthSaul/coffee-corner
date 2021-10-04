import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight,
    faChevronLeft
} from '@fortawesome/free-solid-svg-icons';

import CoffeeDataService from '../../services/coffees';
import capitalize from 'capitalize';

const CoffeeList = () => {
    const [coffees, setCoffees] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchOrigin, setSearchOrigin] = useState('');
    const [searchDist, setSearchDist] = useState('');
    const [distributors, setDistributors] = useState(['All Distributors']);
    const [loading, setLoading] = useState('true');

    const [pageNum, setPageNum] = useState(0);
    const [perPage] = useState(6);
    const [totalCount, setTotalCount] = useState(0);
    const [showPagination, setShowPagination] = useState(true);

    const getCoffees = useCallback(
        async page => {
            try {
                const coffees = await CoffeeDataService.getAll(page, perPage);
                setCoffees(coffees.data.coffees);
                setTotalCount(coffees.data.total_results);
                setShowPagination(true);
            } catch (err) {
                console.log(err);
            }
        },
        [perPage]
    );

    useEffect(() => {
        async function initialize() {
            await getCoffees(0);
            await getDistributors();
            setLoading(false);
        }
        initialize();
    }, [getCoffees]);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };
    const onChangeSearchOrigin = e => {
        const searchOrigin = e.target.value;
        setSearchOrigin(searchOrigin);
    };
    const onChangeSearchDist = e => {
        const searchDist = e.target.value;
        setSearchDist(searchDist);
    };

    const getDistributors = async () => {
        try {
            const distributors = await CoffeeDataService.getDist();
            // console.log(distributors);
            setDistributors(['All Distributors'].concat(distributors.data));
        } catch (err) {
            console.log(err);
        }
    };

    const find = async (query, by, perPage, page) => {
        try {
            const searchResults = await CoffeeDataService.find(
                query,
                by,
                perPage,
                page
            );
            // console.log(searchResults.data);
            setCoffees(searchResults.data.coffees);
        } catch (err) {
            console.log(err);
        }
    };

    const findByName = () => {
        find(searchName, 'name');
        setShowPagination(false);
    };

    const findByOrigin = () => {
        find(searchOrigin, 'origin');
        setShowPagination(false);
    };

    const findByDist = () => {
        if (searchDist === 'All Distributors') {
            getCoffees(0);
            setPageNum(0);
            setShowPagination(true);
        } else {
            find(searchDist, 'distributor');
            setShowPagination(false);
        }
    };

    const handlePrevClick = async e => {
        await getCoffees(pageNum - 1);
        setPageNum(pageNum - 1);
    };

    const handleNextClick = async e => {
        await getCoffees(pageNum + 1);
        setPageNum(pageNum + 1);
    };

    let avatar =
        'https://res.cloudinary.com/darthsaul/image/upload/v1626367195/Coffee-Corner/no_image_wkgy3c.png';

    return (
        <div className='col-lg-11 m-auto'>
            <div className='row'>
                <div className='col-10 col-xl-12 mx-auto text-center mt-3 mb-3'>
                    <Link to='/coffee/new'>
                        <button className='btn btn-new w-100'>
                            Add a New Coffee
                        </button>
                    </Link>
                </div>
            </div>
            <div className='row pb-1 mb-4'>
                <div className='input-group col-lg-4 mb-4 mt-3'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Search by name'
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className='input-group-append'>
                        <button
                            className='btn btn-theme ms-3'
                            type='button'
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className='input-group col-lg-4 mb-4'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Search by origin'
                        value={searchOrigin}
                        onChange={onChangeSearchOrigin}
                    />
                    <div className='input-group-append'>
                        <button
                            className='btn btn-theme ms-3'
                            type='button'
                            onClick={findByOrigin}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className='input-group col-lg-4 mb-4'>
                    <select
                        className='form-select'
                        onChange={onChangeSearchDist}
                    >
                        {distributors.map((dist, ind) => {
                            return (
                                <option value={dist} key={ind}>
                                    {' '}
                                    {capitalize.words(dist.substr(0, 40))}{' '}
                                </option>
                            );
                        })}
                    </select>
                    <div className='input-group-append'>
                        <button
                            className='btn btn-theme ms-3'
                            type='button'
                            onClick={findByDist}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className='row mb-3'>
                {!loading &&
                    coffees.map((coffee, ind) => {
                        if (coffee.user.profile.avatar) {
                            avatar = coffee.user.profile.avatar.medium;
                        }
                        return (
                            <div className='col-xl-4 col-md-6 pb-1' key={ind}>
                                <div className='card my-2 coffee-list-card mb-3'>
                                    <div className='card-header d-flex align-items-center p-4'>
                                        <Link
                                            to={`/coffee/${coffee._id}`}
                                            className='text-decoration-none text-reset'
                                        >
                                            <h2>
                                                {capitalize.words(coffee.name)}
                                            </h2>
                                        </Link>
                                    </div>
                                    <div className='card-body d-flex flex-column justify-content-center p-4'>
                                        <p className='card-text fs-3 fw-light text-muted'>
                                            {capitalize.words(coffee.origin)}
                                        </p>
                                        <p className='fs-5'>
                                            {capitalize.words(
                                                coffee.distributor
                                            )}
                                        </p>
                                        <p className='fw-light fst-italic'>
                                            Added by {coffee.user.username}{' '}
                                            <img
                                                src={avatar}
                                                alt=''
                                                className='coffee-card-img'
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div className='text-center mb-5'>
                                    <Link
                                        to={`/coffee/${coffee._id}`}
                                        className='btn btn-theme reviews-btn px-3'
                                        onClick={e => {
                                            window.scrollTo(0, 0);
                                        }}
                                    >
                                        See Reviews
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
            </div>
            {showPagination && (
                <div className='text-center page-btns mb-5'>
                    <button
                        className={`btn btn-secondary mx-1 ${
                            pageNum === 0 ? 'disabled' : ''
                        }`}
                        onClick={handlePrevClick}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        className={`btn btn-secondary mx-1 ${
                            (pageNum + 1) * perPage >= totalCount
                                ? 'disabled'
                                : ''
                        }`}
                        onClick={handleNextClick}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default CoffeeList;
