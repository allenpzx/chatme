import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PersonalInfo from './personal-info.jsx';
import Index from './index.jsx';
import Settings from './settings.jsx';

class Me extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/me' component={Index} />
        <Route path='/me/info' component={PersonalInfo} />
        <Route path='/me/settings' component={Settings} />
      </Switch>
    );
  }
}
export default Me