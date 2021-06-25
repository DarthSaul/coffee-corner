import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CoffeeDataService from '../services/coffees';
import capitalize from 'capitalize';

const CoffeeList = () => {
    const [coffees, setCoffees] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchOrigin, setSearchOrigin] = useState('');
    const [searchDist, setSearchDist] = useState('');
    const [distributors, setDistributors] = useState(['All Distributors']);
    const [loading, setLoading] = useState('true');

    useEffect(() => {
        async function initialize() {
            await getCoffees();
            await getDistributors();
            setLoading(false);
        }
        initialize();
    }, []);

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

    const getCoffees = async () => {
        try {
            const coffees = await CoffeeDataService.getAll();
            // console.log(coffees);
            setCoffees(coffees.data.coffees);
        } catch (err) {
            console.log(err);
        }
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

    const refreshList = () => {
        getCoffees();
    };

    const find = async (query, by) => {
        try {
            const searchResults = await CoffeeDataService.find(query, by);
            // console.log(searchResults.data);
            setCoffees(searchResults.data.coffees);
        } catch (err) {
            console.log(err);
        }
    };

    const findByName = () => {
        find(searchName, 'name');
    };

    const findByOrigin = () => {
        find(searchOrigin, 'origin');
    };

    const findByDist = () => {
        if (searchDist === 'All Distributors') {
            refreshList();
        } else {
            find(searchDist, 'distributor');
        }
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
                                    <div className='card-header fs-3 ps-4 py-3'>
                                        {capitalize.words(coffee.name)}
                                    </div>
                                    <div className='card-body d-flex flex-column justify-content-around p-4'>
                                        <p className='card-text'>
                                            <div>
                                                <strong>Origin: </strong>
                                                {capitalize.words(
                                                    coffee.origin
                                                )}
                                                <br />
                                                <strong>Distributor: </strong>
                                                {capitalize.words(
                                                    coffee.distributor
                                                )}
                                            </div>
                                        </p>
                                        <Link
                                            to={`/coffee/${coffee._id}`}
                                            className='btn btn-theme'
                                            onClick={e => {
                                                window.scrollTo(0, 0);
                                            }}
                                        >
                                            See Reviews
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default CoffeeList;
