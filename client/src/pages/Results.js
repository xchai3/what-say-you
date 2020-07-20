import React, {useEffect, useState} from 'react';
import PieHooks from "../components/PieHooks";
import * as d3 from "d3";
import SingleResult from "../components/SingleResult";
function Results(props) {
    const [results,setResults]=useState([]);
    useEffect(
        () => {
            fetch('/results').then(res=>res.json())
                        .then(result=>setResults(result));
        },
        []
    );
    /***********run it when visit this page ******/

    useEffect(()=>{
            fetch('/results').then(res=>res.json())
                .then(result=>{
                    setResults(result);
                    console.log("results",result);
                })

    },[])
    /*************** End ************************/
    return (
        <React.Fragment>
        <div
        className="container3">
        <h2>Result from users</h2>
                {results.map((result,index)=>{
                    return(
                        <SingleResult
                        key={index}
                        title={result.description}
                        op1={result.op1}
                        op2={result.op2}
                        op3={result.op3}
                        total={result.op1+result.op2+result.op3}
                        />
                    )
                    }
                )
                }
        </div>
        </React.Fragment>
    );
}

export default Results;
