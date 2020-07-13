import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import '../App.css';
import {useAlert} from "react-alert";

function AddQuestion(props) {
    const [description,setDescription]=useState("");
    const[answers1,setAnswers1]=useState("");
    const[answers2,setAnswers2]=useState("");
    const[answers3,setAnswers3]=useState("");
    const history=useHistory();
    const alert = useAlert();

    const onSubmit=(e)=>{
        e.preventDefault();
        if(!description||!answers1||!answers2||!answers3){
            alert.show("Fill all blanks,please");
        }
        else {
            const answers = [answers1, answers2, answers3];
            const question = {description, answers};
            props.addNew(question);
            alert.success("Created!");
            //reset the state
            setDescription("");
            setAnswers1("");
            setAnswers2("");
            setAnswers3("");
        }
    };

    const onChange=(e)=>{
        const { name, value } = e.target;
        switch (name) {
            case "description":
                setDescription(value);
                break;
            case "answers1":
                setAnswers1(value);
                break;
            case "answers2":
                setAnswers2(value);
                break;
            case "answers3":
                setAnswers3(value);
                break;
        }
    };

    return (
        <div className="container2">
            <h2>Build new polling question add to database!</h2>
        <form
        onSubmit={onSubmit}
        >
            <div className="row">
                <div className="col-25">
                    <label htmlFor="description">Question Description</label>
                </div>
                <div className="col-75">
                    <input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Add your question..."
                    value={description}
                    onChange={onChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label htmlFor="Option1">Option 1</label>
                </div>
                <div className="col-75">
                    <input
                        type="text"
                        name="answers1"
                        id="Option1"
                        placeholder="Add your option1..."
                        value={answers1}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label htmlFor="Option2">Option 2</label>
                </div>
                <div className="col-75">
                    <input
                        type="text"
                        name="answers2"
                        id="Option2"
                        placeholder="Add your option2..."
                        value={answers2}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label htmlFor="Option3">Option 3</label>
                </div>
                <div className="col-75">
                    <input
                        type="text"
                        name="answers3"
                        id="Option3"
                        placeholder="Add your option3..."
                        value={answers3}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="row">
                <button
                    onClick={()=>history.push('/')}
                    type="button"
                >Back
                </button>
                <input
                    type="submit"
                    value="Submit"
                />
            </div>
        </form>
        </div>
    );
}

export default AddQuestion;
