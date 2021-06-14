import React, { useState, useEffect } from 'react';
import CoffeeDataService from '../services/coffees';

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
            console.log(distributors);
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
                            className='btn btn-outline-secondary'
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
                            className='btn btn-outline-secondary'
                            type='button'
                            onClick={findByOrigin}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className='input-group col-lg-4 mb-4'>
                    <select onChange={onChangeSearchDist}>
                        {distributors.map((dist, ind) => {
                            return (
                                <option value={dist} key={ind}>
                                    {' '}
                                    {dist.substr(0, 20)}{' '}
                                </option>
                            );
                        })}
                    </select>
                    <div className='input-group-append'>
                        <button
                            className='btn btn-outline-secondary'
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
                            <div className='col-lg-4 pb-1' key={ind}>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h5 className='card-title'>
                                            {coffee.name}
                                        </h5>
                                        <p className='card-text'>
                                            <strong>Origin: </strong>
                                            {coffee.origin}
                                            <br />
                                            <strong>Distributor: </strong>
                                            {coffee.distributor}
                                        </p>
                                        <div className='row'></div>
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
