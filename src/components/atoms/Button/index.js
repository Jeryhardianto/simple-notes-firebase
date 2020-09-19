import React from 'react';
const Button = ({ title, onClick, loading }) => {
    //ketika user mengirimkan loading
    if (loading) {
        return <button className="btn disable"> Loading...</button>
    }
    return (
        <button className="btn" onClick={onClick}> {title} </button>
    )
}
export default Button;