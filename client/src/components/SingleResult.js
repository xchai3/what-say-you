import React, {useEffect, useState} from 'react';
import * as d3 from "d3";
import PieHooks from "./PieHooks";

function SingleResult(props) {
    // const generateData = (value, length = 5) =>
    //     d3.range(length).map((item, index) => ({
    //         value: value === null || value === undefined ? Math.random() * 100 : value
    //     }));
    // const temp=generateData();
    // console.log("temp",temp);
    const [data, setData] = useState([]);
    const [options,setOptions]=useState([]);
    const [loading,setLoading]=useState(true);
    console.log("title",props.title);
    // console.log("type",typeof(data));
    // const [result,setResult]=useState([]);
    // const changeData = () => {
    //     setData(generateData());
    // };
    useEffect(
        () => {
            fetch(`/questions?contain=${props.title}`).then(res=>res.json())
            .then(answers=>answers.map(answer=>(setOptions(answer.answers)))
            )
        },[]
    );


    useEffect(
        () => {
            console.log("borrow",options[0]);
            setData([{value:props.op1,content:options[0]},{value: props.op2,content:options[1]},{value:props.op3,content:options[2]}]);
            if(options[0]){
                setLoading(false);
            }
        },[options]
    )
    // useEffect(
    //     ()=>{
    //         setLoading(!loading);}
    //    ,[loading]
    // )

    return (
        <>
            {/*<div></div>*/}
            {/*<div>*/}
            {/*    <button onClick={changeData}>Transform</button>*/}
            {/*</div>*/}
            <div>
                <h4 className="label">{props.title}</h4>
                {/*<ol>*/}
                {/*    {*/}
                {/*        options.map((option,index)=>(*/}
                {/*            <li*/}
                {/*                key={index}*/}
                {/*            >{option.answers[2]}*/}
                {/*            </li>*/}
                {/*        ))*/}
                {/*    }*/}
                {/*</ol>*/}
                <div>
                    {   loading?<h2>loadding</h2>:
                        <PieHooks
                            data={data}
                            content={options}
                            width={1000}
                            height={1000}
                            innerRadius={60}
                            outerRadius={100}
                        />
                    }
                </div>
            </div>
        </>
    );
}

export default SingleResult;
