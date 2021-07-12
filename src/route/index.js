import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../page/Home';
import ViewDetails from '../component/ViewDetails';
import NotFound from '../page/NotFound';
const Routers = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/:id" component={ViewDetails} />

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routers;
