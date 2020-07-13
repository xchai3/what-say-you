import React from 'react' ;
import {Link} from 'react-router-dom'
function Header(){
    return (
        <header style={headerStyle}>
            <h1 style={{color:'palevioletred'}}>What say you</h1>
            <Link style={linkStyle} to="/"> Current Question</Link> |
            <Link style={linkStyle} to="/newQuestion"> New Question</Link> |
            <Link style={linkStyle} to="/about"> About</Link>
        </header>
    )
}
const headerStyle={
    background:'#333',
    fontSize:'1.5em',
    color:'#fff',
    textAlign:'center',
    padding:'10px'
}

const linkStyle={
    color:'#fff',
    textDecoration:'none',
    marginRight:'5px'
}

export default Header
