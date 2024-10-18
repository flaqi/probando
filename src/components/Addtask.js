import React, { useState } from "react";
import {  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, 
    Card, CardContent, AppBar, Toolbar, Typography, Button,
Snackbar } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

export const Addtask = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false); // Controla si el diálogo está abierto
  const [taskIdToDelete, setTaskIdToDelete] = useState(null); // Estado para almacenar la tarea a eliminar
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarOpen = () => setOpenSnackbar(true);
  const handleSnackbarClose = () => setOpenSnackbar(false);

  const handleClickOpen = (id) => {
    setTaskIdToDelete(id); // Establece la tarea que deseas eliminar
    setOpen(true); // Abre el diálogo
  };

  const handleClose = () => setOpen(false); // Cierra el diálogo

  const addtask = (e) => {
    e.preventDefault();
    if (input !== "") {
      const newTask = { id: Date.now(), name: input };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const changetask = (e) => {
    let data = e.target.value;
    setInput(data);
  };

  const deletetask = (id) => {
    let newlist = tasks.filter((task) => task.id !== id);
    setTasks(newlist);
  };

  return (
    <div className="main">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        message="Task added successfully!"
        onClose={handleSnackbarClose}
      />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mati's To-Do List
          </Typography>
          <Button color="inherit">Home</Button>
        </Toolbar>
      </AppBar>
      <header className="header">
        <h1>Mati`s to do list</h1>
      </header>

      <section className="section1">
        <input
          type="text"
          name="addInput"
          placeholder="Add task here"
          className="addInput"
          value={input}
          onChange={changetask}
        />
        <Button
          onClick={(e) => {
            addtask(e);
            handleSnackbarOpen();
          }}
        >
          Add Task
        </Button>
      </section>

      <section className="section2">
        <h1>Do all this you lazy ass!!</h1>
        <ol className="tasks">
          {tasks.map((task) => (
            <Card
              key={task.id}
              sx={{
                marginBottom: 2, // Espacio entre tarjetas
                boxShadow: 3, // Sombra para darle más estilo de tarjeta
                padding: 2, // Padding interno
                backgroundColor: "#f5f5f5", // Color de fondo para hacerla más distintiva
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {task.name}
                </Typography>
                <Button size="small" onClick={() => handleClickOpen(task.id)}>
                  <DeleteIcon />
                </Button>
              </CardContent>
            </Card>
          ))}
        </ol>
      </section>

      {/* Dialog de confirmación para eliminar tarea */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button
            onClick={() => {
              deletetask(taskIdToDelete); // Elimina la tarea seleccionada
              handleClose(); // Cierra el diálogo
            }}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};