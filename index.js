import express from 'express';
import cors from 'cors';


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const todos = [
    {
        id: '1',
        task: 'Learn Node.js',
        completed: false,
    },
    {
        id: '2',
        task: 'Learn React',
        completed: false,
    },
    {
        id: '3',
        task: 'Learn Express',
        completed: false,
    },
];

app.get('/todos', (req, res) => {
    res.json(todos);
}
);

app.post('/todos/add', (req, res) => {
    const { task } = req.body;
    const todo = {
        id: Math.random().toString(),
        task,
        completed: false,
    };
    todos.push(todo);
    res.json({ todo });
}
);

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todos.splice(index, 1);
    res.json({ id });
}
);

app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:' + process.env.PORT);
}
);