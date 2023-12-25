import { Home, Auth, Jobs, Job } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/jobs/:id">
          <Job />
        </Route>
        <Route path="/jobs">
          <Jobs />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
