import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home, Auth, Jobs, Job } from "./pages";
import { AppNavbar } from "./components";

const App = () => {
  return (
    <Router>
      <AppNavbar />
      <div className="px-12">
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/jobs/:jobId">
            <Job />
          </Route>
          <Route path="/jobs">
            <Jobs />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
