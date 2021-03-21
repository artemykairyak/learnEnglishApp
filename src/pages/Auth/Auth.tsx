import React from 'react'
import {Button, Form, Input, Typography} from 'antd'
import {useDispatch} from "react-redux";
import {actions} from "../../redux/auth/authReducer";

type authFormType = {username: string, password: string}

export const Auth: React.FC = () => {
    const dispatch = useDispatch()

    const onFinish = (values: authFormType) => {
        console.log('Success:', values);
        const {username, password} = values
        dispatch(actions.loginAC(username, password))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Typography.Title level={2}>Вход</Typography.Title>
            <Form
                name="auth"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Логин"
                    name="username"
                    rules={[{ required: true, message: 'Введите логин' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
