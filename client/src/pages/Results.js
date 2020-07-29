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
    const onDelete=(e)=>{
        console.log("delete ",e.target.name);
        const description=e.target.name;
        const params={description};
        fetch(`/results/${description}`,{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(params)
        }).then(response=>{
            if(response.status===200)
                setResults([...results.filter(result=>result.description!==description)]);
        });
    }
    /*************** End ************************/
    return (
        <React.Fragment>
        <div
        className="container3">
        <h2>Result from users</h2>
            {results.length===0? <h3> No result yet...</h3>:
                <>
                {results.map((result,index)=>{
                    return(
                        <SingleResult
                        key={index}
                        title={result.description}
                        op1={result.op1}
                        op2={result.op2}
                        op3={result.op3}
                        total={result.op1+result.op2+result.op3}
                        onDelete={onDelete}
                        />
                    )
                    }
                )
                }
                </>
                }
        </div>
        </React.Fragment>
    );
}

export default Results;
