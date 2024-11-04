import React, { useState } from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import Axios from "axios";

export default function FormDialog(props) {

    const [editValues, setEditValues] = useState({
        id: props.id,
        name: props.title,
        cost: props.cost,
        category: props.category,
    });


    const handleChangeValues = (values) => {
        setEditValues((prevValues) => ({
            ...prevValues,
            [values.target.id]: values.target.value,
        }));
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleEditGame = () => {
        Axios.put("http://localhost:3001/edit", {
            id: editValues.id,
            name: editValues.name,
            cost: editValues.cost,
            category: editValues.category,
        }).then(() => {
            document.location.reload()
        });
        handleClose();
    };

    const handleDeleteGame = () => {
        Axios.delete(`http://localhost:3001/delete/${editValues.id}`)        
        handleClose();
        document.location.reload()
    };

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Editar</DialogTitle>
                <DialogContent>
                    <TextField
                        disabled
                        margin="dense"
                        id="id"
                        label="ID"
                        defaultValue={props.id}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome do jogo"
                        defaultValue={props.name}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="cost"
                        label="Preço"
                        defaultValue={props.cost}
                        type="number"
                        onChange={handleChangeValues}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="category"
                        label="Categoria"
                        defaultValue={props.category}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button color="error" onClick={handleDeleteGame}>
                        Excluir
                    </Button>
                    <Button color="primary" onClick={handleEditGame}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
