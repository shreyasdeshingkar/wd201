/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { connect } = require("./connectDB.js");
const Todo = require("./TodoModel.js");

// const createTodo = async () => {
//     try{
//         await connect();
//         const todo = await Todo.create({
//             title:"First item",
//             dueDate: new Date(),
//             completed : false,
//         });
//         console.log('Created todo with ID : ${todo.id}');
//     }   catch(error) {
//         console.error(error);
//     }
// };

// (async () =>{
//     await createTodo();
// })();


const createTodo = async () => {
    try{
        await connect();
        const todo = await Todo.addTask({
            title:"Second item",
            dueDate: new Date(),
            completed : false,
        });
        console.log('Created todo with ID : ${todo.id}');
    }   catch(error) {
        console.error(error);
    }
};




const countItems = async () => {
    try{
        const totalCount = await Todo.count();
        console.log('Found ${totalCount} items in the table');
    }   catch(error){
        console.error(error);
    }
}

const getAlltodos = async () => {
    try {
        const todos = await Todo.findAll();({
            where: {
                completed:false
            },
            order: [
                ['id','DESC']
            ]
        });
        
        const todoList = todos.map(todo => todo.displayableString()).join ("\n");
        console.log(todoList);
    
    }   catch(error){
        console.error(error);
    }
}

const getSingleTodo = async () => {
    try {
        const todos = await Todo.findOne();({
            where: {
                completed:false
            },
            order: [
                ['id','DESC']
            ]
        });
        
        console.log(todo.displyableString());
    
    }   catch(error){
        console.error(error);
    }
}

(async () =>{
    //await createTodo();
    //await countItems();
    await getAlltodos();
    await getSingleTodo()
})();