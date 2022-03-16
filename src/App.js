import "./App.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [newName, setNewName] = useState("");
  // const [newTime, setNewTime] = useState(0);
  // const t = useRef(users);

  // const refreshUI = useCallback(async () => {
  //   const data = await getDocs(usersCollectionRef);
  //   setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   console.log("Refreshed");
  // }, []);
  const uRef = useRef(null);

  useEffect(() => {
    // let sortedUsers;
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(
        data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .sort((a, b) => {
            return a.time - b.time;
          })
      );
      // sortedUsers = [...uRef.current].sort((a, b) => {
      //   return a.time - b.time;
      // });
    };

    getUsers();
    uRef.current = users;
    console.log(uRef.current);
  }, []);

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, time: +time });
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(
        data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .sort((a, b) => {
            return a.time - b.time;
          })
      );
    };
    await getUsers();
  };

  // const updateUser = async (id, age) => {
  //   const userDoc = doc(db, "users", id);
  //   const newFields = { age: age + 1 };

  //   await updateDoc(userDoc, newFields);
  //   await refreshUI();
  // };

  // const deleteUser = async (id) => {
  //   const userDoc = doc(db, "users", id);
  //   await deleteDoc(userDoc);
  //   await refreshUI();
  // };

  // useEffect(() => {
  //   refreshUI();
  // }, [refreshUI]);

  const [selectedArea, setSelectedArea] = useState([]);

  const activeButton1 = useRef(null);
  const activeButton2 = useRef(null);
  const activeButton3 = useRef(null);
  const activeButton4 = useRef(null);

  const [found, setFound] = useState([false, false, false, false]);
  const [time, setTime] = useState(0);
  const [solved, setSolved] = useState(false);
  const handleClick = () => {
    activeButton1.current.disabled = found[0];
    activeButton2.current.disabled = found[1];
    activeButton3.current.disabled = found[2];
    activeButton4.current.disabled = found[3];

    console.log("hClick", activeButton1, found);
  };

  const checkWin = () => {
    if (found.every((item) => item === true)) {
      console.log("You win!");
      setSolved(true);
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    checkWin();
  }, [found]);

  useEffect(() => {
    activeButton1.current.disabled = true;
    activeButton2.current.disabled = true;
    activeButton3.current.disabled = true;
    activeButton4.current.disabled = true;
  }, []);

  const handleChange = (index) => {
    console.log("Choice button pressed");
    // If correct guess, disable correct button permanently
    if (
      index === 0 &&
      selectedArea[0] <= 688 &&
      selectedArea[0] >= 678 &&
      selectedArea[1] <= 620 &&
      selectedArea[1] >= 565
    ) {
      inputChecker(index);
    } else if (
      index === 1 &&
      selectedArea[0] <= 695 &&
      selectedArea[0] >= 684 &&
      selectedArea[1] <= 499 &&
      selectedArea[1] >= 473
    ) {
      inputChecker(index);
    } else if (
      index === 2 &&
      selectedArea[0] <= 932 &&
      selectedArea[0] >= 930 &&
      selectedArea[1] <= 614 &&
      selectedArea[1] >= 593
    ) {
      inputChecker(index);
    } else if (
      index === 3 &&
      selectedArea[0] <= 858 &&
      selectedArea[0] >= 857 &&
      selectedArea[1] <= 736 &&
      selectedArea[1] >= 713
    ) {
      inputChecker(index);
    } else {
      // Disable all button if wrong guess
      disableButtons();
    }
  };

  const inputChecker = (index) => {
    const newArray = [...found];
    newArray[index] = true;
    setFound(newArray);
    console.log("Correct!");
    // Disable all button again
    activeButton1.current.disabled = true;
    activeButton2.current.disabled = true;
    activeButton3.current.disabled = true;
    activeButton4.current.disabled = true;

    // If all complete
  };

  const logMousePosition = (e) => {
    console.log(e.pageX, e.pageY);
    setSelectedArea([e.pageX, e.pageY]);
  };

  const disableButtons = () => {
    activeButton1.current.disabled = !found[0];
    activeButton2.current.disabled = !found[1];
    activeButton3.current.disabled = !found[2];
    activeButton4.current.disabled = !found[3];
  };
  const timerRef = useRef(null);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((ti) => ti + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="App">
      <div>
        {`Time elapsed: ${time} seconds`}{" "}
        <button
          style={{ backgroundColor: `${found[0] ? "lightgreen" : ""}` }}
          ref={activeButton1}
          onClick={() => handleChange(0)}
        >
          Waldo{" "}
          <img
            disabled
            src={`${process.env.PUBLIC_URL}/assets/waldo.png`}
            alt=""
          />
        </button>{" "}
        <button
          style={{ backgroundColor: `${found[1] ? "lightgreen" : ""}` }}
          ref={activeButton2}
          onClick={() => handleChange(1)}
        >
          Wenda{" "}
          <img src={`${process.env.PUBLIC_URL}/assets/wenda.png`} alt="" />
        </button>{" "}
        <button
          style={{ backgroundColor: `${found[2] ? "lightgreen" : ""}` }}
          ref={activeButton3}
          onClick={() => handleChange(2)}
        >
          Wizard{" "}
          <img src={`${process.env.PUBLIC_URL}/assets/wizard.png`} alt="" />
        </button>
        <button
          style={{ backgroundColor: `${found[3] ? "lightgreen" : ""}` }}
          ref={activeButton4}
          onClick={() => handleChange(3)}
        >
          Odlaw{" "}
          <img src={`${process.env.PUBLIC_URL}/assets/odlaw.png`} alt="" />
        </button>
      </div>
      <div className="main">
        <img
          onClick={(e) => {
            logMousePosition(e);
            handleClick();
          }}
          src="https://i.imgur.com/LnzE1JH.jpeg"
          alt=""
        />
        <div className={solved ? "leaderboard-active" : "leaderboard-inactive"}>
          <h1>You found all the characters!</h1>
          {""}
          <h2>Leaderboards</h2>
          <h3>Enter your name:</h3>
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={createUser}>Submit</button>
          {users.map((user, i) => (
            <div key={i}>
              <h3>Name: {user.name}</h3>
              <h3>Time finished: {user.time} seconds</h3>
            </div>
          ))}
        </div>
      </div>

      {/* <div style={{ color: "white" }}>By Jan Kenette Dagal</div> */}
    </div>
  );
}

export default App;
