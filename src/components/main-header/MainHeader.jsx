import {Layout, Row, Col} from "antd";
import RecordEditor from "../record-editor";
import NewAlbum from "../new-album";

export default function MainHeader({setLocalAlbums}) {
    const colContentStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <Layout.Header>
            <Row justify="space-between">
                <Col span={4} style={colContentStyle}>
                    <NewAlbum setLocalAlbums={setLocalAlbums}/>
                </Col>
                <Col span={4} style={colContentStyle}>
                    <h2 style={{color: "white", margin: "auto"}}>Vinyl Store</h2>
                </Col>
                <Col span={4} style={colContentStyle}>
                    <RecordEditor/>
                </Col>
            </Row>
        </Layout.Header>
    );
}