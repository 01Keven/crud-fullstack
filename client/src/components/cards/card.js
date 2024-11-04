import React from "react";
import FormDialog from "../dialog/dialog";

export default function Card(props) {
    const [open, setOpen] = React.useState(false);
    
    const handleClickCard = () => {
        setOpen(true)
    }

    return (
        <>
        <FormDialog open={open} setOpen={setOpen} id={props.id} name={props.name} cost={props.cost} category={props.category} lisCard={props.lisCard} setLisCard={props.setLisCard}/>
        <div className="card--container">
            <div className="card" onClick={() => {
                handleClickCard()
            }}>
            <h2 className="card--name">{props.name}</h2>
            <hr />
            <p>Id: {props.id}</p>
            <p>Preço: {props.cost}</p>
            <p>Preço: {props.category}</p>
            </div>
        </div>
        </>
    )
}