import React, { Component } from "react";
import {
  Row,
  ListGroup,
  InputGroup,
  Button,
  Col,
  Container,
  Form,
} from "react-bootstrap";
import "./Todo.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdOutlineAdd } from 'react-icons/md'

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputToDo: "",
      toDoList: [],
      isEditing: false,
      editingIndex: "",
    };
  }

  deleteToDo(inputIndex) {
    this.setState((prevState) => ({
      toDoList: prevState.toDoList.filter(
        (toDo, index) => index !== inputIndex
      ),
    }));
  }

  editToDo(inputIndex) {
    this.setState((prevState) => ({
      inputToDo: prevState.toDoList[inputIndex].text,
      isEditing: true,
      editingIndex: inputIndex,
    }));
  }

  addOrUpdateToDo() {
    const { inputToDo, isEditing, editingIndex } = this.state;
    if (inputToDo) {
      if (!isEditing) {
        this.setState((prevState) => ({
          toDoList: [...prevState.toDoList, {text: inputToDo, completed: false}],
          inputToDo: "",
        }));
      } else {
        this.setState((prevState) => ({
          toDoList: prevState.toDoList.map((toDo, index) => {
            if (index === editingIndex) {
              toDo.text = inputToDo;
            }
            return toDo;
          }),
          inputToDo: "",
        }));
        this.setState({
          isEditing: false,
          editingIndex: "",
        });
      }
    }
  }

  completeToDo(inputIndex){
    this.setState((prevState) => ({
      toDoList: prevState.toDoList.map((toDo, index) => {
        if (index === inputIndex) {
          toDo.completed = true;
        }
        return toDo;
    })
  }))
};

  render() {
    const { inputToDo, toDoList, isEditing } = this.state;
    return (
      <div>
        <Container style={{ margin: "20px auto" }}>
          <Col md={{ span: 4, offset: 4 }}>
            <InputGroup className="mb-3">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Enter To-Do"
                value={inputToDo}
                className="todo-input"
                onChange={(event) =>
                  this.setState({ inputToDo: event.target.value })
                }                
              />
              <Button
                variant="dark"
                id="button-addon2"
                onClick={() => this.addOrUpdateToDo()}
              >
                {isEditing ? <AiOutlineCheckCircle /> : <MdOutlineAdd />}
              </Button>
            </InputGroup>
            <ListGroup className="to-do-list">
              {toDoList.map((toDo, index) => (
                <ListGroup.Item className="list-item" key={index}>
                  <Row>
                    <Col xs={9} className={toDo.completed && 'completed'}>{toDo.text}</Col>
                    <Col xs={3} className="action-buttons">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => this.editToDo(index)}
                        disabled={toDo.completed}
                      >
                        <FaRegEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => this.deleteToDo(index)}
                      >
                        <RiDeleteBinLine />
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => this.completeToDo(index)}
                        disabled={toDo.completed}
                      >
                        <IoCheckmarkDoneOutline />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Container>
      </div>
    );
  }
}
