import {Button, Col, Modal, Progress, Row} from "antd";
import {useState} from "react";
import {decreasePercent, increasePercent} from "../../utils";
import FirstStep from "./FirstStep";

export default function NewAlbum() {
    const stepsAmount = 4;
    const [percent, setPercent] = useState(0);
    const [data, setData] = useState({});
    const [step, setStep] = useState(1);
    const [visible, setVisible] = useState(false);

    const onNextClick = () => {
        setPercent(() => increasePercent(stepsAmount, step));
        setStep(prevState => prevState + 1);
    };

    const onPreviousClick = () => {
        const prevStep = step - 1;
        setPercent(() => decreasePercent(stepsAmount, prevStep));
        setStep(() => prevStep);
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
        setData({});
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
                {step === 1 && <FirstStep onNextClick={onNextClick}/>}
            </div>
            {/*{step === 2 && <SecondStep data={data} dispatchData={dispatchData}/>}*/}
            {/*{step === 3 && <ThirdStep data={data} dispatchData={dispatchData}/>}*/}
            {/*{step === 4 && <FourthStep data={data} dispatchData={dispatchData}/>}*/}
            {/*{step === 5 && <SuccessStep/>}*/}

            <Row style={{
                display: "flex",
                flexFlow: "row nowrap",
                justifyContent: "space-between",
                alignItems: "stretch"
            }}
            >
                <Col>
                    {step !== 1 && step !== (stepsAmount + 1) &&
                    <Button onClick={onPreviousClick}>Previous</Button>}
                </Col>
                <Col>
                    {step !== (stepsAmount + 1)
                    && <Button type="primary" onClick={onNextClick}>Next</Button>}
                </Col>
            </Row>
        </Modal>
    </>);
}