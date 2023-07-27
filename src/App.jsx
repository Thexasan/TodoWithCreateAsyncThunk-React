import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import {
  deleteTodo,
  editTodo,
  getTodos,
  patchTodo,
  postTodo,
} from "./api/todos";
import { handleChange } from "./reducer/todos";
import { Button, Input } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const App = () => {
  const list = useSelector(({ todos }) => todos.list);
  const title = useSelector(({ todos }) => todos.title);
  const loading = useSelector(({ todos }) => todos.loading);

  const [open, setOpen] = React.useState(false);
  const [edited, setEdited] = React.useState("");
  const [idx,setIdx] = React.useState(null)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = (todo) => {
    setEdited(todo.title)
    setOpen(true);
    setIdx(todo.id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <form
        onSubmit={() => {
          if (title.trim().length == 0) return alert("Please enter a title");
          dispatch(postTodo());
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => dispatch(handleChange(e.target.value))}
        />
        <button
          type="submit"
          onClick={() => {
            if (title.trim().length == 0) return alert("Please enter a title");
            dispatch(postTodo());
          }}
        >
          Add
        </button>
      </form>

      <div className="flex flex-col gap-[30px] items-center ">
        {list.map((todo) => (
          <div key={todo.id} className="flex items-center gap-[20px]">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) =>
                dispatch(patchTodo({ id: todo.id, value: e.target.checked }))
              }
            />
            {todo.completed ? (
              <s>
                <h1>{todo.title}</h1>
              </s>
            ) : (
              <h1>{todo.title}</h1>
            )}
            <Button
              variant="contained"
              color="error"
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              <Delete /> delete{" "}
            </Button>

            <Button
              variant="outlined"
              onClick={()=>handleClickOpen(todo)}
              color="secondary"
            >
              <Edit /> edit{" "}
            </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"edit todo"}</DialogTitle>
        <DialogContent>
          <Input
            placeholder="title.."
            value={edited}
            onChange={(e) =>{
              setEdited(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button
            onClick={() => {
              dispatch(editTodo({ id: idx, title: edited }));
              handleClose();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
          </div>
        ))}
      </div>

      <div>
        <input type="search" className="border border-black" placeholder="search" />
      </div>

    </div>
  );
};

export default App;
