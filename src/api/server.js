require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log('database connected')})
    .catch((err)=>{console.log(err.message)})

const ExpenseSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    category: String
})    

const Expense = mongoose.model('expenses', ExpenseSchema);


app.get('/', async (req,res)=>{
    const expenses = await Expense.find();
    res.send(expenses);
})

app.post('/', async (req,res)=>{
    const expense = new Expense({
        description:'expense2',
        amount:200,
        category:'misc'
    })

    try{
        const result = await expense.save();
        res.send(result);
    }
    catch(err){
        res.send(err.message)
    }
})

app.put('/:id', async(req,res)=>{

    const expense = await Expense.findById(req.params.id);
    if(!expense) return res.send('not found');

    expense.set({
        description:req.body.description
    })

    const save = await expense.save();
    res.send(save);
})

app.delete('/:id', async(req,res)=>{

    const expense = await Expense.findByIdAndRemove(req.params.id)
    if(!expense) return res.status(404).send("expense not found")


    res.send(expense);
})

app.listen('3000', ()=>{console.log('listening 3000')})