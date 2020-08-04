import React, {useEffect, useState} from 'react';
import * as d3 from "d3";
import PieHooks from "./PieHooks";

function SingleResult(props) {
    const [data, setData] = useState([]);
    const [options,setOptions]=useState([]);
    const [loading,setLoading]=useState(true);
    console.log("title",props.title);

    useEffect(
        () => {
            fetch(`/questions?contain=${props.title}`)
                .then(response=>{
                    if(response.ok){
                        response.json()
                        .then(answers=>answers.map(answer=>(setOptions(answer.answers)))
                        )
                    }
                })
        },[]
    );


    useEffect(
        () => {
            console.log("borrow",options[0]);
            setData([{value:props.op1,content:options[0]},{value: props.op2,content:options[1]},{value:props.op3,content:options[2]}]);
            //no option content
            if(options[0]){
                setLoading(false);
            }
        },[options]
    )
    return (
            <div
                className="Pie"
            >

                    {   loading?<h3>no result yet...</h3>:
                        <div>
                            <h4
                            >

                                {props.title}
                                <button
                                name={props.title}
                                onClick={props.onDelete}
                            >X</button></h4>
                        <PieHooks
                            data={data}
                            content={options}
                            width={400}
                            height={300}
                            innerRadius={60}
                            outerRadius={100}
                        />
                        </div>
                    }

            </div>
    );
}

export default SingleResult;
