import {Divider, Row, Col} from "antd";
import EditRecord from "./EditRecord";
import NewRecord from "./NewRecord";

export default function BodyModal({dispatch, records, postEvent, putEvent, deleteEvent, isDate}) {
    return (
        <Row justify="space-around" align="middle">
            <Col
                span={10}
                style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h2>Новая запись</h2>
                <NewRecord records={records} dispatch={dispatch} postEvent={postEvent} isDate={isDate}/>
            </Col>

            <Col
                span={1}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                }}
            >
                <Divider style={{height: "100%"}} type="vertical"/>
            </Col>

            <Col
                span={10}
                style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <EditRecord
                    dispatch={dispatch}
                    records={records}
                    putEvent={putEvent}
                    deleteEvent={deleteEvent}
                    isDate={isDate}
                />
            </Col>
        </Row>
    );
}
