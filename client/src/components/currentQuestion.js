import React, {Component} from 'react';
import SingleQuestion from "./SingleQuestion";

class  CurrentQuestion extends Component{
    state={questions:[]};

    componentDidMount() {
        //load all questions
        console.log("2333");
        fetch('/questions').then(res=>res.json())
            .then(questions=>this.setState({questions},()=>console.log('questions fetch',questions)));
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
            {
                this.state.questions.map((question,index)=>{
                    return(
                    <SingleQuestion
                    key={index}
                    id={index}
                    name={question.description}
                    description={question.description}
                    answers={question.answers}
                    onDelte={this.onDelete}
                    />
                    )
            })

            }
            {/*</div>*/}
        </div>
    );
    }
}

export default CurrentQuestion;
