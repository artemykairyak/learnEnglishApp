import React from 'react'
import {Button, Form, Input, Typography} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../redux/auth/authReducer";
import {getAuthErrorText, getAuthLoading} from '../../redux/selectors';
import s from './Auth.module.scss'

type authFormType = {username: string, password: string}

export const Auth: React.FC = () => {
    const dispatch = useDispatch()
    const errorText = useSelector(getAuthErrorText)
    const loading = useSelector(getAuthLoading)

    const onFinish = (values: authFormType) => {
        console.log('Success:', values);
        const {username, password} = values
        dispatch(actions.loginAC(username, password))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={s.container}>
            <Typography.Title level={2} className={s.title}>Вход</Typography.Title>
            <Form
                className={s.form}
                name="auth"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    className={s.inputWrapper}
                    label="Логин"
                    name="username"
                    rules={[{ required: true, message: 'Введите логин' }]}
                >
                    <Input  className={s.input}/>
                </Form.Item>
                <Form.Item
                    className={s.inputWrapper}
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль' }]}
                >
                    <Input.Password className={s.input}/>
                </Form.Item>
                {errorText && <span className={s.error}>{errorText}</span>}
                <Form.Item className={s.btnWrapper}>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>

            </Form>
        </div>
    )
}
