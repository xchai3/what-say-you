import React, {Component} from 'react';
import SingleQuestion from "./SingleQuestion";
import {Link} from "react-router-dom";

class  CurrentQuestion extends Component{
    state={questions:[]};
    componentDidMount() {
        //load all questions
    //     fetch('/questions').then(res=>res.json())
    //         .then(
    //             questions=>this.setState({questions},()=>console.log('questions fetch',questions))
    // );
        fetch('/questions')
            .then(response=>{
                console.log(response);
                console.log("yeah");
                console.log(response.result);
                if(response.status===200){
                    response.json().then(questions=>this.setState({questions},()=>console.log('questions fetch',questions)));
                }
            });
    }
    onDelete=(e)=>{
    console.log("delete ",e.target.name);

    //call API to remove this question
        const description=e.target.name;
        const params={description};
        fetch(`/questions/${description}`,{
            method:"DELETE",
            headers: {
            "Content-Type": "application/json"
        },
            body:JSON.stringify(params)
        }).then(response=>{
            if(response.status===200)
                this.setState({questions:[...this.state.questions.filter(question=>question.description!==description)]});
        });
    };
    render() {
    return (
        // <div>
            <div className="container">
            <h2> Questions in the database</h2>
                <button
                    onClick={()=>this.props.history.push("/users")}
                >Check & Send to users
                </button>
                {this.state.questions.length===0 ? <>
                         <br/>
                        <h3>No question yet,
                            <Link style={linkStyle} to="/newQuestion">
                            create
                            </Link>
                                  some and send!
                        </h3>
                    </>:
               <>
            {
                this.state.questions.map((question,index)=>{
                    return(
                    <SingleQuestion
                    key={index}
                    id={index}
                    name={question.description}
                    description={question.description}
                    answers={question.answers}
                    onDelete={this.onDelete}
                    />
                    )
            })

            }
            </>
                }
        </div>
    );
    }
}
const linkStyle={
    fontStyle:'italic',
    color:'black',

    margin:'5px'
}

export default CurrentQuestion;
