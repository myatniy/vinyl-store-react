import "./App.css";
import {Layout} from "antd";
import MainHeader from "./components/main-header/MainHeader";

function App() {
    const {Footer, Content} = Layout;

    return (
        <Layout>
            <MainHeader/>
            <Content>Content</Content>
            <Footer>Footer</Footer>
        </Layout>
    );
}

export default App;
