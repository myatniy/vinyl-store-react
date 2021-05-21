import {Layout, Row, Col, Button} from "antd";
import RecordEditor from "../record-editor";

export default function MainHeader() {
    const colContentStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <Layout.Header>
            <Row justify="space-between">
                <Col span={4} style={colContentStyle}>
                    <Button style={{margin: "auto"}} type="primary">Создать</Button>
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