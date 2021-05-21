import React from "react";
import {Modal, Button} from "antd";
import ModalRecordEditor from "./ModalRecordEditor";

export default function RecordEditor() {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
    };

    return (
        <>
            <Button style={{margin: "auto"}} onClick={showModal}>
                Редактировать
            </Button>
            <Modal
                centered
                visible={visible}
                width={1000}
                footer={null}
                onCancel={handleClose}
            >
                <ModalRecordEditor/>
            </Modal>
        </>
    );
}