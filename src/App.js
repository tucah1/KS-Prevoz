import { useEffect } from "react";
import Routes from "./components/routing/Routes";
//css
import "./style.css";

//redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import { LOGOUT } from "./actions/types";

function App() {
    useEffect(() => {
        // check for token in LS
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        store.dispatch(loadUser());

        // log user out from all tabs if they log out in one tab
        window.addEventListener("storage", () => {
            if (!localStorage.token) store.dispatch({ type: LOGOUT });
        });
    }, []);

    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
}

export default App;
