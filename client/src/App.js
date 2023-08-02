import "./App.css";
import { Route, useLocation } from "react-router-dom";
import { Home, Landing, Form, Detail } from "./Views";
import NavBar from "./Components/NavBar/navBar";
import axios from "axios";
axios.defaults.baseURL = "https://recipes-api-julianllop-back.onrender.com";

function App() {
    return (
        <div className="App">
            <Route
                path={["/home", "/recipes", "/about", "/addrecipes", "/create"]}
                component={NavBar}
            />
            <Route exact path="/" component={Landing} />

            <Route path="/home" render={() => <Home />} />

            <Route
                exact
                path="/recipes/:id"
                render={({ match }) => <Detail id={match.params.id} />}
            />
            <Route path="/create" render={() => <Form />} />
        </div>
    );
}

export default App;
