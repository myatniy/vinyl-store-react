import {Button, Modal, Progress, Row} from "antd";
import {useState} from "react";
import {increasePercent} from "../../utils";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";

export default function NewAlbum({setLocalAlbums}) {
    const stepsAmount = 2;
    const [percent, setPercent] = useState(0);
    const [step, setStep] = useState(1);
    const [visible, setVisible] = useState(false);
    const [lastInsertedAlbum, setLastInsertedAlbum] = useState(null);

    const onNextClick = () => {
        setPercent(() => increasePercent(stepsAmount, step));
        setStep(prevState => prevState + 1);
    };

    const showModal = () => {
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
    };

    const afterClose = () => {
        setPercent(() => 0);
        setStep(() => 1);
    };

    return (<>
        <Button style={{margin: "auto"}} type="primary" onClick={showModal}>Создать</Button>
        <Modal
            centered
            visible={visible}
            width={1000}
            footer={null}
            onCancel={handleClose}
            destroyOnClose={true}
            afterClose={afterClose}
            title="Новый альбом"
        >
            <Progress percent={percent}/>

            <div style={{margin: "20px 100px"}}>
                {step === 1 && <FirstStep
                    setLastInsertedAlbum={setLastInsertedAlbum}
                    setLocalAlbums={setLocalAlbums}
                    onNextClick={onNextClick}
                />}
                {step === 2 && <SecondStep lastInsertedAlbum={lastInsertedAlbum} onNextClick={onNextClick}/>}
                {step === 3 && <div style={{margin: "auto"}}>Успех!</div>}
            </div>

            <Row style={{
                display: "flex",
                flexFlow: "row nowrap",
                justifyContent: "space-between",
                alignItems: "stretch"
            }}
            >

            </Row>
        </Modal>
    </>);
}