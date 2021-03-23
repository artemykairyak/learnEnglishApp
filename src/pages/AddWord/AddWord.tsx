import {Button, Form, Input} from 'antd';
import React, {useState} from 'react';
import WordsAPI from '../../api/wordsAPI'
import s from './AddWord.module.scss';
import {Notification, NotificationType} from "../../components/Notification";

export const AddWord: React.FC = () => {
    const [notification, setNotification] = useState<NotificationType>({title: '', text: '', type: "success"})
    const [isNotificationVisible, setIsNotificationVisible] = useState(false)

    const [form] = Form.useForm();

    const addWord = (values: any) => {
        const {word, translate} = values
        const transformedTranslate = translate.replaceAll(', ', ',')
        WordsAPI.addWord({word, translate: transformedTranslate}).then(res => {
            if (res.statusCode === 200) {
                setNotification({title: 'Готово', text: res.message, type: "success"})
                resetForm()
            } else {
                setNotification({title: 'Ошибка', text: res.message, type: "error"})
            }
            setIsNotificationVisible(true)
        })
    }

    const resetForm = () => {
        form.resetFields()
    }

    const onFinishFailed = (err: any) => {
        console.log(err)
    }

    return (
        <div>
            <div className={s.form}>
                <Form
                    form={form}
                    name="addWord"
                    onFinish={addWord}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Слово"
                        name="word"
                        rules={[{required: true, message: 'Введите слово'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Переводы"
                        name="translate"
                        rules={[{required: true, message: 'Введите переводы (через запятую)'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Добавить</Button>
                </Form>
            </div>
            {isNotificationVisible&& <Notification notification={notification}/>}

        </div>
    );
};
