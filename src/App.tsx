import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home, Auth, Jobs, Job, Applications, Notfound } from "./pages";

import { AppFooter, AppNavbar, PrivateRoute } from "./components";

const App = () => {
  return (
    <Router>
      <AppNavbar />
      <div className="px-12">
        <Switch>
          <PrivateRoute path="/applications">
            <Applications />
          </PrivateRoute>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/jobs/:jobId">
            <Job />
          </Route>
          <Route path="/jobs">
            <Jobs />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="*">
            <Notfound />
          </Route>
        </Switch>
      </div>
      <AppFooter />
    </Router>
  );
};

export default App;
