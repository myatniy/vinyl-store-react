import {Button, Modal, Progress, Row} from "antd";
import {useState} from "react";
import {increasePercent} from "../../utils";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";

export default function NewAlbum({setLocalAlbums, loggedUser}) {
    const stepsAmount = 4;
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
                    loggedUser={loggedUser}
                />}
                {step === 2 && <SecondStep lastInsertedAlbum={lastInsertedAlbum} onNextClick={onNextClick}/>}
                {step === 3 && <ThirdStep lastInsertedAlbum={lastInsertedAlbum} onNextClick={onNextClick}/>}
                {step === 4 && <FourthStep lastInsertedAlbum={lastInsertedAlbum} onNextClick={onNextClick}/>}
                {step === 5 && <h2 style={{display: "flex", alignItems: "center", justifyContent: "center"}}>Успех!</h2>}
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