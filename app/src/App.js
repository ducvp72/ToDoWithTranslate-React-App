import { React, useState, useEffect, useContext, useRef } from "react";
import "./App.css";
import axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import Footer from "./component/footer";
import Header from "./component/header";
import { ThemeContext } from "./context/themeContext";
import { useStore, actions } from "./store";
import { deleteTodo, setTodoEdit } from "./store/Actions";

function App() {
  const [word, setWord] = useState("");
  const [data, setData] = useState("");
  const [notFound, setNotFound] = useState(false);
  const themeContext = useContext(ThemeContext);
  const [state, dispatch] = useStore();
  const { todos, todoInput, todoEdit, showEdit } = state;
  const inputRef = useRef();

  document.body.style.overflow = "hidden";
  // document.body.style.backgroundImage = "url('/assets/light.png')";
  document.body.style.backgroundImage = `url(${
    themeContext.theme === "#00c5f6"
      ? "https://img.powerpoint.com.vn/uploads/2019/06/09/hinh-nen-cho-powerpoint-bau-troi-va-khinh-khi-cau_092716851.jpg?auto=compress&cs=tinysrgb&h=350"
      : "https://i.pinimg.com/originals/a1/6a/70/a16a70a5078406165cf0d3b47b12b092.jpg?auto=compress&cs=tinysrgb&h=350"
  })`;

  // useEffect(() => {
  //   console.log("todo", state);
  // }, [state]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setWord(word);
    setNotFound(notFound);
  }, [word, notFound]);

  const callApi = () => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
      .then((rs) => {
        setData(rs.data[0]);
      })
      .catch((err) => {
        console.log(err);
        setData("");
        setNotFound(true);
      });
    setWord("");
  };

  const playAudio = () => {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  };

  const handlePress = (event) => {
    if (event.key === "Enter") {
      callApi();
    }
  };

  const handlePressTodo = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const handleAdd = () => {
    if (todoInput !== "") {
      dispatch(actions.addTodo(todoInput));
      dispatch(actions.setTodoInput(""));
      // dispatch(actions.resetTodoInput());
    } else {
      alert("nothing to do");
    }
    inputRef.current.focus();
  };

  const handleDelete = () => {
    dispatch(actions.deletALL());
    inputRef.current.focus();
  };

  const handdlePressEdit = (event, value, index) => {
    if (event.key === "Enter") {
      dispatch(actions.editTodo(value, index));
    }
    return;
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5rem",
          zIndex: "4",
        }}
      >
        <input
          style={{
            width: "30%",
            outline: "none",
          }}
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setWord(e.target.value);
          }}
          value={word}
          onKeyPress={(e) => handlePress(e)}
        />
        <button
          onClick={() => {
            callApi();
          }}
        >
          <FaSearch size="20px" />
        </button>
      </div>
      <div
        style={{
          color: "black",
          height: "100%",
          width: "100%",
          marginTop: "1rem",
          minHeight: "82vh",
          display: "flex",
          // alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "35%",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "8px",
              borderRadius: "20px",
              border: "1px solid grey",
              background: "white",
              boxShadow: "2px 2px 2px 1px grey",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "5px",
                position: "relative",
              }}
            >
              <input
                ref={inputRef}
                style={{
                  outline: "none",
                  width: "70%",
                  borderRadius: "10px",
                }}
                onKeyPress={(e) => handlePressTodo(e)}
                value={todoInput}
                placeholder="Enter something"
                onChange={(e) => {
                  dispatch(actions.setTodoInput(e.target.value));
                }}
              />
              <button
                style={{
                  background: "green",
                  color: "white",
                }}
                onClick={() => handleAdd()}
              >
                Add
              </button>
              <button
                style={{
                  background: "red",
                  color: "white",
                }}
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </div>
            {showEdit && (
              <div
                style={{
                  color: "black",
                  position: "absolute",
                  background: "white",
                  border: "2px solid black",
                  transform: "translate(0,20px)",
                  zIndex: 4,
                  width: "33%",
                  height: "10%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Edit your work:
                </p>

                <span>Stt: {todoEdit.index} </span>

                <input
                  onChange={(e) => {
                    dispatch(setTodoEdit(e.target.value, todoEdit.index));
                  }}
                  onKeyPress={(e) =>
                    handdlePressEdit(e, e.target.value, todoEdit.index)
                  }
                  value={todoEdit.value}
                  style={{
                    outline: "none",
                    width: "50%",
                  }}
                  type="text"
                />

                <i
                  onClick={() => {
                    dispatch(actions.editTodo(todoEdit.value, todoEdit.index));
                  }}
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  className="fas fa-check"
                />
                <i
                  onClick={() => {
                    dispatch(actions.closeTodoEdit());
                  }}
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  className="fas fa-times-circle"
                />
              </div>
            )}
            <div>
              <ul>
                {todos &&
                  todos.map((element, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <li
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          dispatch(actions.setTodoEdit(element, index));
                        }}
                      >
                        {element}
                      </li>
                      <i
                        onClick={() => {
                          dispatch(deleteTodo(index));
                        }}
                        style={{
                          color: "red",
                          cursor: "pointer",
                          marginTop: "5px",
                        }}
                        className="fas fa-times"
                      />
                    </div>
                  ))}
              </ul>
            </div>
          </div>

          {data ? (
            <div
              style={{
                borderRadius: "20px",
                border: "1px solid grey",
                marginTop: "1rem",
                background: "white",
                boxShadow: "5px 5px 2px 2px grey",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "8px",
                  gap: "0px",
                }}
              >
                <h2 style={{ textDecoration: "underline", color: "#04aa6d" }}>
                  {data?.word}
                  <button
                    style={{
                      marginLeft: "1rem",
                    }}
                    onClick={() => {
                      playAudio();
                    }}
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </h2>
                <h4
                  style={{
                    margin: "2px",
                  }}
                >
                  Parts of speech:
                </h4>
                <p
                  style={{
                    margin: "4px",
                  }}
                >
                  {data?.meanings[0].partOfSpeech}
                </p>
                <h4
                  style={{
                    margin: "2px",
                  }}
                >
                  Definition:
                </h4>
                <p
                  style={{
                    margin: "4px",
                  }}
                >
                  {data?.meanings[0].definitions[0].definition}
                </p>
                <h4
                  style={{
                    margin: "2px",
                  }}
                >
                  Example:
                </h4>
                <p
                  style={{
                    margin: "4px",
                  }}
                >
                  {data?.meanings[0].definitions[0].example}
                </p>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              {notFound && (
                <img
                  src="https://c.tenor.com/unvXyxtdn3oAAAAC/no-result.gif"
                  alt="Not"
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div className=" footer">
        <Footer />
      </div>
    </>
  );
}

export default App;
