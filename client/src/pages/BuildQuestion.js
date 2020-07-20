import React, {Component} from 'react';
import AddQuestion from "../components/AddQuestion";

class buildQuestion extends Component {
    state={question:[]};
    addNew=(question)=>{
       console.log(question);
       const params={question};
       fetch('/questions',{
           method:'POST',
           headers: {
               "Content-Type": "application/json"
           },
           body:JSON.stringify(params)
       }).then(response=>{
           console.log(response.status);
       })
    }

    render(){
        return (
            <>
                <AddQuestion
                addNew={this.addNew}
                />
            </>
        );
    }
}

export default buildQuestion;
