import "./App.css";
import {Button, Layout, Row} from "antd";
import MainHeader from "./components/main-header/MainHeader";
import Albums from "./components/albums";
import {Route, BrowserRouter, Link} from "react-router-dom";
import {useState} from "react";
import Login from "./components/login/Login";
import Registration from "./components/login/Registration";
import { CSVLink } from "react-csv";

function App() {
    const [localAlbums, setLocalAlbums] = useState([]);
    const [loggedUser, setLoggedUser] = useState({
        id: null,
        isAdmin: false,
    });

    return (
        <BrowserRouter>
            <Route path="/login">
                <Login setLoggedUser={setLoggedUser}/>
            </Route>
            <Route path="/registration">
                <Registration/>
            </Route>
            <Route path="/" exact>
                <Layout>
                    {loggedUser.isAdmin && <MainHeader setLocalAlbums={setLocalAlbums}/>}
                    <Layout.Content>
                        <Row style={{margin: "20px"}}>
                            <Link to="/login">
                                <Button onClick={() => setLoggedUser({isAdmin: false})}>
                                    {loggedUser.id ? "Выйти" : "Войти"}
                                </Button>
                            </Link>
                            <Button style={{marginLeft: "10px"}}>
                                <CSVLink filename={"отчет.csv"} data={localAlbums} headers={[
                                    { label: "id", key: "id"},
                                    { label: "identifyingNumber", key: "identifyingNumber"},
                                    { label: "Artist", key: "artist"},
                                    { label: "Название альбома", key: "name"},
                                    { label: "Country", key: "country"},
                                    { label: "createdOn", key: "createdOn"},
                                    { label: "label", key: "label"},
                                    { label: "releaseDate", key: "releaseDate"},
                                    { label: "style", key: "style"},
                                    { label: "typeOfAlbum", key: "typeOfAlbum"},
                                ]}>Получить Excel файл с данным об альбомах</CSVLink>
                            </Button>
                        </Row>
                    </Layout.Content>
                    <Layout.Content>
                        <Albums localAlbums={localAlbums} setLocalAlbums={setLocalAlbums}/>
                    </Layout.Content>
                </Layout>
            </Route>
        </BrowserRouter>
    );
}

export default App;
