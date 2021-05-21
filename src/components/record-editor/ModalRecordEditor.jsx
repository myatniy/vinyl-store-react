import {Tabs} from "antd";
import {useState} from "react";
import BodyModal from "./BodyModal";
import {useStoreon} from "storeon/react";

const {TabPane} = Tabs;

export default function ModalRecordEditor() {
    const {dispatch, artists} = useStoreon("artists");
    const [tabKey, setTabKey] = useState("1");

    return (
        <Tabs
            defaultActiveKey="1"
            centered
            onChange={(activeKey) => setTabKey(activeKey)}
        >
            <TabPane tab="Исполнители" key="1">
                <BodyModal
                    dispatch={dispatch}
                    records={artists}
                    postEvent={"artists/post"}
                    putEvent={"artists/put"}
                    deleteEvent={"artists/delete"}
                />
            </TabPane>
            <TabPane tab="Страны" key="2">
                <BodyModal type={tabKey}/>
            </TabPane>
            <TabPane tab="Форматы" key="3">
                Content of Tab Pane 3
            </TabPane>
            <TabPane tab="Жанры" key="4">
                Content of Tab Pane 4
            </TabPane>
            <TabPane tab="Лейблы" key="5">
                Content of Tab Pane 5
            </TabPane>
            <TabPane tab="Даты выхода" key="6">
                Content of Tab Pane 6
            </TabPane>
            <TabPane tab="Стили" key="7">
                Content of Tab Pane 7
            </TabPane>
            <TabPane tab="Композиции" key="8">
                Content of Tab Pane 8
            </TabPane>
            <TabPane tab="Типы релизов" key="9">
                Content of Tab Pane 9
            </TabPane>
        </Tabs>
    );
}
