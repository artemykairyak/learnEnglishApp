import {Button, Form, Input, Typography} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import s from './Test.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getWordsForTest} from "../../redux/selectors";
import {getRandomNumberInRange} from "../../functions";
import {useHistory} from 'react-router-dom'
import clsx from "clsx";
import {testActions} from "../../redux/test/testReducer";
import {RoundBtn} from "../../components/RoundBtn/RoundBtn";
import {ArrowLeftOutlined} from "@ant-design/icons/lib";

type AnswerStatus = 'correct' | 'error' | null;
type Mode = 'rus' | 'eng' | null;
type Answer = { answer: string };
type TestStats = { correctAnswers: number, errorWords: Array<number> };

enum testStatuses {loading = 0, started = 1, completed = 2}

export const Test: React.FC = () => {
    const wordsForTest = useSelector(getWordsForTest)
    const [form] = Form.useForm()
    const history = useHistory()
    const dispatch = useDispatch()
    const nextBtnRef = useRef<HTMLButtonElement | null>(null)

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [currentWord, setCurrentWord] = useState('')
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [testStatus, setTestStatus] = useState<number>(testStatuses.loading)
    const [isQuestionAnswered, setIsQuestionAnswered] = useState(false)
    const [answerStatus, setAnswerStatus] = useState<AnswerStatus>(null)
    const [mode, setMode] = useState<Mode>(null)
    const [testStats, setTestStats] = useState<TestStats>({correctAnswers: 0, errorWords: []})

    useEffect(() => {
        dispatch(testActions.getWordsForTestAC())

        return () => {
            dispatch(testActions.setWordsForTestAC([]))
        }
    }, [])

    useEffect(() => {
        if (wordsForTest.length) {
            console.log('words here', wordsForTest)
            setTotalQuestions(wordsForTest.length)
            setCurrentQuestion(1)
            setTestStatus(testStatuses.started)

        }
    }, [wordsForTest])

    useEffect(() => {
        console.log(testStats)
    }, [testStats])

    useEffect(() => {
        if (testStatus === testStatuses.started  && form.getFieldInstance('answer')) {
            form.getFieldInstance('answer').focus()
        }
    }, [testStatus])

    useEffect(() => {

        if (currentQuestion) {
            console.log('CDCDSDC', currentQuestion)
            const mode = generateMode()
            generateWord(mode)
            if (testStatus === testStatuses.started  && form.getFieldInstance('answer')) {
                form.getFieldInstance('answer').focus()
            }
        }

    }, [currentQuestion])

    const updateStats = (status: ('success' | 'error'), wordId?: number) => {
        let newStats = {...testStats}

        if (status === "success") {
            newStats.correctAnswers = ++newStats.correctAnswers
        } else {
            newStats.errorWords.push(wordId!)
        }

        setTestStats(newStats)
    }

    const onAnswer = ({answer}: Answer) => {
        const currentWord = wordsForTest[currentQuestion - 1]
        const translates = currentWord.translate.split(',')

        if (mode === 'eng') {
            console.log('rus', translates)
            if (translates.includes(answer.toLowerCase())) {
                setAnswerStatus("correct")
                updateStats("success")
            } else {
                setAnswerStatus("error")
                updateStats("error", currentWord.id)
            }
        }

        if (mode === 'rus') {
            console.log('rus', answer, currentWord.word)
            if (wordsForTest[currentQuestion - 1].word === answer) {
                setAnswerStatus("correct")
                updateStats("success")
            } else {
                setAnswerStatus("error")
                updateStats("error", currentWord.id)
            }
        }

        setIsQuestionAnswered(true)
        nextBtnRef.current!.focus()
    }

    const generateMode = () => {
        const random = (Math.round(Math.random()))
        let mode: Mode
        if (random) {
            setMode('eng')
            mode = 'eng'
        } else {
            setMode('rus')
            mode = 'rus'
        }

        return mode;
    }


    const generateWord = (mode: Mode) => {
        let resWord = '';
        const translates = wordsForTest[currentQuestion - 1].translate.split(',')
        const randomTranslate = getRandomNumberInRange(0, translates.length - 1)
        console.log(mode, translates, translates.length, randomTranslate)

        if (mode === 'rus') {
            resWord = translates[randomTranslate]
        }

        if (mode === 'eng') {
            resWord = wordsForTest[currentQuestion - 1].word
        }

        console.log('res word', resWord)

        setCurrentWord(resWord)

    }

    const nextQuestion = () => {
        setIsQuestionAnswered(false)
        form.resetFields()
        if (currentQuestion < totalQuestions) {
            setCurrentQuestion(prev => prev + 1)

        } else {
            setTestStatus(testStatuses.completed)
        }
    }

    return (
        <>
            {testStatus === testStatuses.loading && <span>Загрузка</span>}
            {testStatus === testStatuses.started &&
            <div className={s.test}>
                <div className={s.progress}>{currentQuestion}/{totalQuestions}</div>
                <Typography.Title>{currentWord}</Typography.Title>
                {!isQuestionAnswered ? <Form
                    form={form}
                    name="test"
                    onFinish={onAnswer}
                >
                    <Form.Item
                        className={s.inputWrapper}
                        name="answer"
                        rules={[{required: true, message: 'Введите слово'}]}
                    >
                        <Input className={s.input} autoComplete="off"/>
                    </Form.Item>
                    <div className={s.btnWrapper}>
                        <Button type="primary" htmlType="submit" className={s.addBTn}>Ответить</Button>
                    </div>
                </Form> : <div className={s.answerResult}>
                    {answerStatus === 'correct' ?
                        <div className={s.answerRes}>
                            <Typography.Title className={clsx(s.answerResTitle, s.correctAnswerResTitle)}
                                              level={3}>Правильно!</Typography.Title>
                            <Button type="primary" onClick={nextQuestion} ref={nextBtnRef}
                                    className={s.addBTn}>Дальше</Button>
                        </div> :
                        <div className={s.answerRes}>
                            <Typography.Title className={clsx(s.answerResTitle, s.errorAnswerResTitle)}
                                              level={3}>Ошибка...</Typography.Title>
                            <div className={s.errorContent}>
                                <span className={s.errorTitle}>{currentWord} переводится как:&nbsp;</span>
                                <span className={s.errorVars}>
                                {mode === 'eng' ? wordsForTest[currentQuestion - 1].translate : wordsForTest[currentQuestion - 1].word}
                            </span>
                            </div>
                            <Button type="primary" onClick={nextQuestion} ref={nextBtnRef}
                                    className={s.addBTn}>Дальше</Button>
                        </div>
                    }
                </div>}
            </div>}
            {testStatus === testStatuses.completed &&
            <div className={s.test}>
                <Typography.Title level={2}>Результаты</Typography.Title>
                <div className={s.results}>
                    <div className={s.stats}>
                        {testStats.correctAnswers}/{totalQuestions}
                    </div>

                    <Button type="primary" onClick={() => history.goBack()} ref={nextBtnRef}
                            className={s.endBTn}>Закончить</Button>
                </div>
            </div>
            }
            <RoundBtn icon={<ArrowLeftOutlined />} link={'/'}/>
        </>
    );
};
