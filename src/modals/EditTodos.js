import React, {useEffect, useState} from "react";
import ModalHeader from "../components/ModalHeader";
import {Button, Form, Input, Select, Switch} from "antd";
import CustomCheckbox from "../components/CustomCheckbox";
import {useTodo} from "../context";

export default function EditTodos({
                                      onClose,
                                      id,
                                      styles,
                                      darkMode,
                                      setDarkMode
}) {

    const [form] = Form.useForm();
    const {todos, dispatch} = useTodo();

    const [isChecked, setIsChecked] = useState(false);

    const handleEdit = (values) => {
        const data = {
            id,
            ...values,
            employed: isChecked,
        }
        dispatch({type: 'EDIT_TODO', payload: data});
        onClose()
    };

    useEffect(() =>{
        const todoToEdit = todos.find((todo) => todo.id === id);
        form.setFieldsValue(todoToEdit);
        setIsChecked(todoToEdit?.employed);
    }, [id])

    return (
        <div style={{
            padding: "30px",
            borderRadius: 10,
            backgroundColor: darkMode === 'dark' ? '#323234' : '#ffffff'
        }}>
            <ModalHeader title={"Редактирование todos"} onClose={onClose}/>
            <Form form={form} onFinish={handleEdit} layout="vertical">
                <Form.Item
                    name="name"
                    rules={[{required: true}]}
                >
                    <Input
                        style={styles[darkMode].input}
                        className="custom-input"
                        placeholder="Name"
                    />
                </Form.Item>

                <Form.Item
                    name="age"
                    rules={[{required: true}]}
                >
                    <Input
                        placeholder="Age"
                        type="number"
                        style={styles[darkMode].input}
                        className="custom-input"
                    />
                </Form.Item>

                <Form.Item
                    name="subscribed"
                >
                    <Select
                        placeholder="Subscribed"
                        className={darkMode}
                        options={[
                            {value: "subscribed", label: "Subscribed"},
                            {value: "notSubscribed", label: "Not Subscribed"},
                            {value: "other", label: "Other"},
                        ]}
                    />
                </Form.Item>

                <Form.Item name="employed">
                    <CustomCheckbox
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                        style={styles[darkMode].checkBox}
                    />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                        width: '100%',
                        ...styles[darkMode].button
                    }}
                >
                    Save
                </Button>

                <div
                    style={{
                        width: '80%',
                        margin: '20px auto',
                        height: 1,
                        ...styles[darkMode].line
                    }}
                />

                <div className="todo-mode">
                    <Switch
                        style={{
                            backgroundColor: '#11de33',
                        }}
                        checked={darkMode === 'dark'}
                        onChange={(e) => setDarkMode(e ? 'dark' : 'light')}
                    />
                    <p style={styles[darkMode].switcher}>Mode</p>
                </div>
            </Form>
        </div>
    );
}
