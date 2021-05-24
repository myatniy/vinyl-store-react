import "./App.css";
import {Layout} from "antd";
import MainHeader from "./components/main-header/MainHeader";
import Albums from "./components/albums";
import {Route, BrowserRouter} from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <Route path="/" exact>
                <Layout>
                    <MainHeader/>
                    <Layout.Content>
                        <Albums/>
                    </Layout.Content>
                </Layout>
            </Route>
        </BrowserRouter>
    );
}

export default App;
