import React from 'react';
import {Alert} from "antd";

export type NotificationType = {title: string, text: string, type: 'error' | 'success' }
export type NotificationAlertProps = { notification: {title: string, text: string, type: 'error' | 'success' }}

export const Notification: React.FC<NotificationAlertProps> = ({notification}) => {
    const {title, text, type} = notification
    return (
        <Alert
            message={title}
            description={text}
            type={type}
            showIcon
        />
    );
}
