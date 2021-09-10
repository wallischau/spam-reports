import React, { Component } from 'react';
import SpamReport from "./components/SpamReport";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router>
      <div overflow='hidden'>
        <Switch>        
          <Route exact path="/" component={SpamReport} />
        </Switch>
      </div>
      </Router>
    );
  }
}


export default App;
