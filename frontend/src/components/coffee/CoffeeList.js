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

    return (
        <div className='col-lg-10 m-auto'>
            <div className='row pb-1'>
                <div className='input-group col-lg-4 mb-4'>
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
            <div className='row'>
                {!loading &&
                    coffees.map((coffee, ind) => {
                        return (
                            <div className='col-lg-4 col-md-6 pb-1' key={ind}>
                                <div className='card my-2 coffee-list-card'>
                                    <div className='card-header d-flex align-items-center fs-3 ps-4 py-2'>
                                        <Link
                                            to={`/coffee/${coffee._id}`}
                                            className='text-decoration-none text-reset'
                                        >
                                            {capitalize.words(coffee.name)}
                                        </Link>
                                    </div>
                                    <div className='card-body d-flex flex-column justify-content-around p-4'>
                                        <div>
                                            <p className='card-text'>
                                                <strong>Origin: </strong>
                                                {capitalize.words(
                                                    coffee.origin
                                                )}
                                                <br />
                                                <strong>Distributor: </strong>
                                                {capitalize.words(
                                                    coffee.distributor
                                                )}
                                            </p>
                                        </div>
                                        <div className='text-center'>
                                            <Link
                                                to={`/coffee/${coffee._id}`}
                                                className='btn btn-theme reviews-btn'
                                                onClick={e => {
                                                    window.scrollTo(0, 0);
                                                }}
                                            >
                                                See Reviews
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            {showPagination && (
                <div className='text-center page-btns'>
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
