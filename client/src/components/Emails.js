import React, {useEffect, useState} from 'react';
import {useAlert} from "react-alert";
function Emails(props) {
    const [email,setEmail]=useState("");
    const [emails,setEmails]=useState([]);
    const alert = useAlert();
    useEffect(
        //load all emails
        () => {
            fetch('/emails')
                .then(response=>{
                    console.log(response);
                    console.log("yeah");
                    console.log(response.status);
                    if(response.status===200){
                        response.json().then(
                            emailAddress=>{
                                setEmails(emailAddress);
                                console.log("Emails",emails);
                            }
                            )
                    }
                });
        },
        []
    );
    const addNew=(e)=>{
        const params={emailAddress:e};
        fetch('/emails',{
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(params)
        }).then(response=>{
            if(response.ok){
                console.log("added from server");
                const newEmail={emailAddress:e}
                setEmails([...emails,newEmail]);
                console.log(emails);
                setEmail("");
            }
            else{
                alert.show("Failed,try it later")
                setEmail("");
            }
        })
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        //check the email format
        const pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        const strEmail = pattern.test(email);
        if(strEmail){
            alert.success("Added!");
            addNew(email);

        }
        else {
            alert.error("not valid email address");
            setEmail("");
        }
    };
    const onChange=(e)=>{
        const {value} = e.target;
        setEmail(value);
        // console.log("client email",email);
    };
    const handleEmail=()=>{
        if(emails.length===0){
            alert.error("please add recipients ");
        }
        else {
            fetch('/emails/sending')
                .then(response => {
                    // console.log(response);
                    // console.log("yeah");
                    if (response.ok) {
                        alert.success("Sent to all recipients ");
                    } else {
                        alert.error("failed,try it later");
                    }
                });
        }
    }

    return (
        <div
        className="container">
            <form
            onSubmit={onSubmit}
            >
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Add user's email here..."
                    value={email}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value="Add"
                />
            </form>
            <h3>Subscribed Users</h3>
            <button
                onClick={handleEmail}
            >Send to All
            </button>
            <ul>
            {
                emails.map((email,index)=> (
                        <li
                            key={index}
                        >{email.emailAddress}
                        </li>

                ))
            }
            </ul>
        </div>
    );
}

export default Emails;
