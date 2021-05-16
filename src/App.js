import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import ContentArea from "./components/ContentArea/ContentArea";
import Login from "./components/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login/:token">
          <Login />
        </Route>
        <Route path="/:token">
          <ContentArea />
        </Route>
        <Route path="/">
          <GenerateToken />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
