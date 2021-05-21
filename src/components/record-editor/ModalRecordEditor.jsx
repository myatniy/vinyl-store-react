import {Tabs} from "antd";
import BodyModal from "./BodyModal";
import {useStoreon} from "storeon/react";

const {TabPane} = Tabs;

export default function ModalRecordEditor() {
    const {dispatch, artists, countries, formats} = useStoreon("artists", "countries", "formats");

    return (
        <Tabs
            defaultActiveKey="1"
            centered
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
                <BodyModal
                    dispatch={dispatch}
                    records={countries}
                    postEvent={"countries/post"}
                    putEvent={"countries/put"}
                    deleteEvent={"countries/delete"}
                />
            </TabPane>
            <TabPane tab="Форматы" key="3">
                <BodyModal
                    dispatch={dispatch}
                    records={formats}
                    postEvent={"formats/post"}
                    putEvent={"formats/put"}
                    deleteEvent={"formats/delete"}
                />
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
