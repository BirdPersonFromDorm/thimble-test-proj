// src/components/TodoList.js
import React, {useState} from 'react';
import {Form, Input, Checkbox, Button, Table, Switch, Select, Dropdown, Modal} from 'antd';
import {TodoProvider, useTodo} from '../context';
import CustomCheckbox from "../components/CustomCheckbox";
import Icon, {MoreOutlined} from "@ant-design/icons";
import EditTodos from "../modals/EditTodos";

const styles = {
    dark: {
        wrapper: {
            backgroundColor: '#323234'
        },
        todoForm: {
            border: '1px solid #d2d2d2'
        },
        formTitle: {
            color: '#ffffff',
            backgroundColor: '#323234',
        },
        input: {
            color: '#ffffff',
            backgroundColor: '#323234',
        },
        inputList: {
            color: '#ffffff',
            backgroundColor: '#323234',
        },
        checkBox: {
            mark: '#323234',
            color: '#ffffff',
        },
        button: {
            backgroundColor: '#a0a0a0',
            color: '#ffffff',
        },
        line: {
            backgroundColor: '#a0a0a0',
            color: '#ffffff',
        },
        switcher: {
            color: '#ffffff',
        }
    },
    light: {
        wrapper: {
            backgroundColor: '#ffffff'
        },
        todoForm: {
            border: '1px solid #535353'
        },
        formTitle: {
            color: '#323234',
            backgroundColor: '#ffffff',
        },
        input: {
            color: '#323234',
            backgroundColor: '#ffffff',
        },
        inputList: {
            color: '#323234',
            backgroundColor: '#ffffff',
        },
        checkBox: {
            mark: '#ffffff',
            color: '#323234',
        },
        button: {
            backgroundColor: '#999999',
            color: '#404040',
        },
        line: {
            backgroundColor: '#999999',
            color: '#404040',
        },
        switcher: {
            color: '#323234',
        }
    },
}
const menuItems = [
    {
        label: (
            <span style={{display: "flex", gap: "10px"}}>
                Редактировать
            </span>
        ),
        key: "EDIT",
    },
    {
        label: (
            <span style={{display: "flex", gap: "10px"}}>
                Удалить
            </span>
        ),
        key: "DELETE",
    },
];


const TodoList = () => {

    const {todos, dispatch} = useTodo();
    const [form] = Form.useForm();

    const [darkMode, setDarkMode] = useState('light');
    const [isChecked, setIsChecked] = useState(false);

    const [editModal, setEditModal] = useState({
        isOpen: false,
        id: null
    });


    console.log(editModal)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: "25%",
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: "25%",
        },
        {
            title: 'Subscribed',
            dataIndex: 'subscribed',
            key: 'subscribed',
            width: "25%",
        },
        {
            title: 'Employed',
            dataIndex: 'employed',
            key: 'employed',
            width: "25%",
            render: (subscribed) => (subscribed ? 'Yes' : 'No'),
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            width: "5%",
            render: (text, record) => (
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <Dropdown
                        trigger={["click"]}
                        placement={"bottomRight"}
                        menu={getActions(record)}
                        overlayClassName={"dropdown-border"}
                    >
                        <MoreOutlined style={{cursor: "pointer", fontSize: "20px"}}/>
                    </Dropdown>
                </div>
            ),
        },
    ];

    const getActions = (record) => {
        const actions = {
            items: menuItems,
            onClick: ({item, key, keyPath, domEvent}) => {
                switch (key) {
                    case "EDIT":
                        setEditModal({
                            isOpen: true,
                            id: record?.id
                        })
                        break;
                    case "DELETE":
                        handleDelete(record?.id)
                        break;
                }
            },
            className: "dropdown-border",
        };
        return actions;
    };


    const handleAdd = (values) => {
        const newTodo = {
            ...values,
            employed: isChecked,
            id: Date.now(),
        };
        dispatch({type: 'ADD_TODO', payload: newTodo});
        form.resetFields();
        setIsChecked(false)
    };

    const handleDelete = (id) => {
        dispatch({type: 'DELETE_TODO', payload: id});
    };


    return (
        <div className="wrapper" style={styles[darkMode].wrapper}>
            <div className='todo-wrapper'>
                <div className="todo-form" style={styles[darkMode].todoForm}>
                    <Form form={form} onFinish={handleAdd} layout="vertical">
                        <div className="form-title" style={styles[darkMode].formTitle}>
                            Insert Row
                        </div>

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
                            Insert
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

                <div className="todo-table">
                    <Table
                        className={darkMode}
                        dataSource={todos}
                        columns={columns}
                        rowKey="id"
                        pagination={false}
                        scroll={{x: 'max-content', y: 335}}
                    />
                </div>
            </div>

            <Modal
                open={editModal.isOpen}
                closable={false}
                footer={null}
                width={500}
                className={darkMode}
            >
                <EditTodos
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    styles={styles}
                    handleAdd={handleAdd}
                    id={editModal.id}
                    onClose={() => {
                        setEditModal({
                            isOpen: false,
                            id: null
                        })
                    }}
                />
            </Modal>
        </div>
    );
};

export default TodoList;
