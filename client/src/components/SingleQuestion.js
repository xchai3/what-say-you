import React from 'react';

function SingleQuestion(props) {
    const{description,answers,id}=props;
    console.log("ans",answers);
    console.log("des",description);
    return (
        <div className="singleQ">
            <button
            name={props.description}
            onClick={props.onDelte}
            >x</button>
            <h3>Question No{id+1}:</h3>
            <h4>{description}</h4>
            <ol>
                {answers.map((question,index)=>(
                    <li key={index}>{question}</li>
                ))
                }
            </ol>
        </div>
    );
}

export default SingleQuestion;
