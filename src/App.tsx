import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Login from "./components/Login/Login";
import GenerateToken from "./components/GenerateToken/GenerateToken";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login/:token">
          <Login />
        </Route>
        <Route path="/:token">
          <Main />
        </Route>
        <Route path="/">
          <GenerateToken />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
