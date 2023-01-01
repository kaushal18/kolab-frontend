import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login/Login";
import GenerateToken from "./components/GenerateToken/GenerateToken";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login/:token" component={Login} />
        <ProtectedRoute exact path="/:token" component={Main} />
        <Route exact path="/" component={GenerateToken} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
