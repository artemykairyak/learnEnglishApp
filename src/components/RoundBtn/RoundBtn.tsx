import React from 'react';
import s from "./RoundBtn.module.scss";
import {Button} from "antd";
import {NavLink} from "react-router-dom";
import {AntdIconProps} from "@ant-design/icons/lib/components/AntdIcon";

type RoundBtnPropsType = { icon: AntdIconProps, link: string }

export const RoundBtn: React.FC<RoundBtnPropsType> = ({icon, link}) => {
    return (
        <div className={s.testBtnWrapper}>
            <Button className={s.testBtn} type='dashed' shape={"circle"}> <NavLink className={s.btnText} to={link}>{icon}</NavLink></Button>
        </div>
    );
};
