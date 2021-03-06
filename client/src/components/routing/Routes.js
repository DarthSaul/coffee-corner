import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Alert from '../layout/Alert';
import Login from '../layout/Login';
import Register from '../layout/Register';
import NotFound from '../layout/NotFound';

import Dashboard from '../dashboard/Dashboard';

import CreateProfile from '../profile/CreateProfile';
import FileUpload from '../profile/FileUpload';
import ProfilePage from '../profile/ProfilePage';

import CoffeeList from '../coffee/CoffeeList';
import Coffee from '../coffee/Coffee';
import AddCoffee from '../coffee/AddCoffee';
import EditCoffee from '../coffee/EditCoffee';
import EditCoffeeImg from '../coffee/EditCoffeeImg';

import BrewList from '../brewMethods/BrewList';
import BrewMethod from '../brewMethods/BrewMethod';
import AddBrew from '../brewMethods/AddBrew';
import EditBrew from '../brewMethods/EditBrew';

import PostList from '../posts/PostList';
import Post from '../posts/Post';
import AddPost from '../posts/AddPost';
import EditPost from '../posts/EditPost';

import PrivateRoute from './PrivateRoute';

const Routes = () => {
    return (
        <div className='container px-3 px-sm-1 mt-5 mb-5 mb-extra'>
            <Alert />
            <Switch>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/register'>
                    <Register />
                </Route>

                <Route exact path='/coffee'>
                    <CoffeeList />
                </Route>
                <PrivateRoute exact path='/coffee/new'>
                    <AddCoffee />
                </PrivateRoute>
                <PrivateRoute exact path='/coffee/edit/:id'>
                    <EditCoffee />
                </PrivateRoute>
                <PrivateRoute exact path='/coffee/update_image/:id'>
                    <EditCoffeeImg />
                </PrivateRoute>
                <Route exact path='/coffee/:id'>
                    <Coffee />
                </Route>

                <Route exact path='/brews'>
                    <BrewList />
                </Route>
                <PrivateRoute exact path='/brews/new'>
                    <AddBrew />
                </PrivateRoute>
                <PrivateRoute exact path='/brew/edit/:id'>
                    <EditBrew />
                </PrivateRoute>
                <Route exact path='/brew/:id'>
                    <BrewMethod />
                </Route>

                <Route exact path='/posts'>
                    <PostList />
                </Route>
                <PrivateRoute exact path='/post/new'>
                    <AddPost />
                </PrivateRoute>
                <PrivateRoute exact path='/post/edit/:post_id'>
                    <EditPost />
                </PrivateRoute>
                <Route exact path='/post/:post_id'>
                    <Post />
                </Route>

                <PrivateRoute exact path='/dashboard'>
                    <Dashboard />
                </PrivateRoute>
                <PrivateRoute exact path='/profile/create'>
                    <CreateProfile />
                </PrivateRoute>

                <Route exact path='/profile/:profile_id'>
                    <ProfilePage />
                </Route>

                <PrivateRoute exact path='/upload'>
                    <FileUpload />
                </PrivateRoute>

                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </div>
    );
};

export default Routes;
