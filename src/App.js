import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import './App.css';
import Home from './pages/feed/home';
import Navigation from './components/navigation';
import MyPosts from './pages/feed/myPosts';
import Post from './pages/feed/post';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import ResetPassword from './pages/auth/resetPassword';
import ProtectedRoute from './utils/utils';
import EditPost from './pages/feed/editPost';
import Users from './pages/feed/users';
import User from './pages/feed/user';
import EditProfile from './pages/feed/editProfile';
import ChatRoom from './pages/feed/chatRoom/index';

class App extends Component { 
  state = {

  }

  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/auth/reset-password" render={() => 
            <ResetPassword />}
          />
          <Route exact path="/auth/register" render={() => 
            <Register />}
          />
          <Route exact path="/auth/login" render={() => 
            <Login />}
          />
          <ProtectedRoute path="/feed/post" component={Post}/>
          <ProtectedRoute path="/feed/create-post" component={EditPost} createPost={true}/>
          <ProtectedRoute path="/feed/edit-post/:postId" component={EditPost} createPost={false}/>
          <ProtectedRoute path="/feed/my-profile" component={User} owner={true}/>
          <ProtectedRoute path="/feed/my-posts" component={MyPosts}/>
          <ProtectedRoute path="/feed/users" component={Users}/>
          <ProtectedRoute path="/feed/user/:userId" component={User} owner={false}/>
          <ProtectedRoute path="/feed/edit-profile/:userId" component={EditProfile}/>
          <ProtectedRoute path="/feed/chat" component={ChatRoom}/>
          <Route path="/home" render={() => 
            <Home />}
          />
          <Redirect to="/home" />
        </Switch>
      </div>
    )
  }
}

export default App;