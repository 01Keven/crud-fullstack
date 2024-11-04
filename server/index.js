const express = require("express")
const app = express()
const mysql = require("mysql2")
const cors = require("cors")



const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Parede687$",
    database: "crudgames"
})

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("servidor funcionando")
})



app.post("/register", (req, res) => {
    const { name, cost, category } = req.body;
    console.log(name);
    

    let SQL = "INSERT INTO games ( name, cost, category ) VALUES ( ?,?,? )";

    db.query(SQL, [name, cost, category], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
        
    })
    
})

app.get("/getCards", (req, res) => {
    let SQL = "SELECT * from games"
    db.query(SQL, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

app.put("/edit", (req, res) => {
    const { id, name, cost, category } = req.body;
    let SQL = "UPDATE games SET name = ?, cost = ?, category = ? WHERE id = ?";
    db.query(SQL, [name, cost, category, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    let SQL = "DELETE FROM games WHERE id = ?";
    db.query(SQL, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

// app.get('/', (req, res) => {
//     let SQL = 
//     "INSERT INTO games ( name, cost, category ) VALUES ( 'Enigma do Medo', '80', 'Survival Horror')";

//     db.query(SQL, (err, result) => {
//         console.log(err);
        
//     })
// })

app.listen(3001, () => {
    
    console.log("servidor rodando");
    
})