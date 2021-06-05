import {Button, Form, Input} from 'antd';
import React, {useState} from 'react';
import WordsAPI from '../../api/wordsAPI'
import s from './AddWord.module.scss';
import {Notification, NotificationType} from "../../components/Notification";
import {RoundBtn} from "../../components/RoundBtn/RoundBtn";
import {TrophyOutlined} from "@ant-design/icons/lib";
import {log} from "util";

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
        <>
            <div className={s.addWord}>
                <Form
                    form={form}
                    name="addWord"
                    onFinish={addWord}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        className={s.inputWrapper}
                        label="Слово"
                        name="word"
                        rules={[{required: true, message: 'Введите слово'}]}
                    >
                        <Input className={s.input}/>
                    </Form.Item>
                    <Form.Item
                        className={s.inputWrapper}
                        label="Переводы"
                        name="translate"
                        rules={[{required: true, message: 'Введите переводы (через запятую)'}]}
                    >
                        <Input className={s.input}/>
                    </Form.Item>
                    <div className={s.btnWrapper}>
                        <Button type="primary" htmlType="submit" className={s.addBTn}>Добавить</Button>
                    </div>
                </Form>
                {isNotificationVisible && <Notification notification={notification}/>}
            </div>
            <RoundBtn icon={<TrophyOutlined/>} link={'/test'}/>
        </>
    );
};
