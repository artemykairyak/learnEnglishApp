import {Button, Input} from 'antd';
import React, {useState} from 'react';
import s from './AddWord.module.scss';

export const AddWord: React.FC = () => {
    const [word, setWord] = useState('')
    const [translate, setTranslate] = useState('')

    const addWord = () => {
        // translateAPI.addWord(word, translate.split(', '))
    }

    return (
        <div>
            <div className={s.form}>
                <Input placeholder="Введите слово" onChange={e => setWord(e.target.value)}/>
                <Input placeholder="Введите переводы (через запятую)" onChange={e => setTranslate(e.target.value)}/>
                <div className={s.translate}></div>
                <Button type="primary" onClick={addWord}>Добавить</Button>
            </div>

        </div>
    );
};
