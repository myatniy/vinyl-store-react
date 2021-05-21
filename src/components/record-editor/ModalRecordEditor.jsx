import {Tabs} from "antd";
import BodyModal from "./BodyModal";
import {useStoreon} from "storeon/react";

const {TabPane} = Tabs;

export default function ModalRecordEditor() {
    const {
        dispatch, artists, countries, formats, genres, labels, styles
    } = useStoreon(
        "artists", "countries", "formats", "genres", "labels", "styles"
    );

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
                <BodyModal
                    dispatch={dispatch}
                    records={genres}
                    postEvent={"genres/post"}
                    putEvent={"genres/put"}
                    deleteEvent={"genres/delete"}
                />
            </TabPane>
            <TabPane tab="Лейблы" key="5">
                <BodyModal
                    dispatch={dispatch}
                    records={labels}
                    postEvent={"labels/post"}
                    putEvent={"labels/put"}
                    deleteEvent={"labels/delete"}
                />
            </TabPane>
            <TabPane tab="Даты выхода" key="6">
                Content of Tab Pane 6
            </TabPane>
            <TabPane tab="Стили" key="7">
                <BodyModal
                    dispatch={dispatch}
                    records={styles}
                    postEvent={"styles/post"}
                    putEvent={"styles/put"}
                    deleteEvent={"styles/delete"}
                />
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
