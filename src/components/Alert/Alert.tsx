import React from 'react';
import {Modal} from "antd";

export const Alert: React.FC<{ title: string, text: string, onOK: () => void}> = ({title, text, onOK}) => {
    return (
        <Modal title={title} visible={true} onOk={onOK}>
            <p>{text}</p>
        </Modal>
    );
};
