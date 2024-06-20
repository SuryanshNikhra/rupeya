const ExpenseSchema= require('../models/expenseModel.js');

exports.addExpense=async (req,res)=>{
    const {title,amount,category,description,date}=req.body;
    const Expense= ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    
    try {
        if(!title  || !category || !description || !date){
            return res.status(400).json({msg:"Please fill all the fields"});
        }
        if(amount<=0 || !amount==='number'){
            return res.status(400).json({msg:"Amount should be greater than 0"});
        }
        await Expense.save();
        res.status(200).json({msg:"Expense added successfully"})
    } catch (error) {
        res.status(400).json({msg:"Error",error:error})
    }
}
exports.getExpenses= async (req,res)=>{
    try {
        const Expenses= await ExpenseSchema.find().sort({createdAt:-1})
        res.status(200).json(Expenses)
    }catch(error){
      res.status(400).json({msg:"Error",error:error})
    }
}
exports.deleteExpense= async (req,res)=>{
    const {id}=req.params;
    ExpenseSchema.findByIdAndDelete(id).then((Expense)=>{
        res.status(200).json({message:'Expense deleted'})
    }).catch((err)=>{
        res.status(500).json({message:'server error',error:err});
    })
}