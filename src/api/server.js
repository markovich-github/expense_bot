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

const CategorySchema = new mongoose.Schema({
    name: String
})    

const Category = mongoose.model('categories', CategorySchema);


app.get('/expenses', async (req,res)=>{
    const expenses = await Expense.find();
    res.send(expenses);
})

app.get('/categories', async (req,res)=>{
    const categories = await Category.find();
    res.send(categories);
})

app.post('/expenses', async (req,res)=>{
    const expense = new Expense({
        description:req.body.description,
        amount:req.body.amount,
        category:req.body.category
    })

    try{
        const result = await expense.save();
        res.send(result);
    }
    catch(err){
        res.send(err.message)
    }
})

app.post('/categories', async (req,res)=>{
    const category = new Category({
        name:req.body.name,
    })
    
        const result = await category.save();
        res.send(result);
})

app.put('/expenses/:id', async(req,res)=>{

    const expense = await Expense.findById(req.params.id);
    if(!expense) return res.send('not found');

    expense.set({
        description:req.body.description,
        amount:req.body.amount,
        category:req.body.category
    })

    const save = await expense.save();
    res.send(save);
})

app.delete('/expenses/:id', async(req,res)=>{

    const expense = await Expense.findByIdAndRemove(req.params.id)
    if(!expense) return res.status(404).send("expense not found")


    res.send(expense);
})

app.listen('3000', ()=>{console.log('listening 3000')})