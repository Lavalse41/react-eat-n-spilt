import { useState } from "react";
import { initialFriends } from "./initialFriends.js";
import "./index.css";

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFrd, setShowAddFrd] = useState(false);
  const [selectedFrd, setSelectedFrd] = useState(null);

  function handleShowAddFrd() {
    setShowAddFrd(!showAddFrd);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFrd(false);
  }

  function handleSelection(friend) {
    //เมื่อกด ทำให้เวลาเลือกเพื่อน จะเปิดหน้า splitform และสีกล่องตามไป
    // setSelectedFrd(friend);
    //เวลากดอีกครั้ง สีกล่องจะหาย และปิดหน้า splitform
    setSelectedFrd((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFrd(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFrd={selectedFrd}
          onSelection={handleSelection}
        />
        {showAddFrd && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFrd}>
          {showAddFrd ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFrd && <FormSplitBill selectedFrd={selectedFrd} />}
    </div>
  );
}

function FriendList({ friends, onSelection, selectedFrd }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFrd={selectedFrd}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFrd }) {
  const isSelected = selectedFrd?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}></img>
      <div>
        <h3>{friend.name}</h3>

        {friend.balance < 0 && (
          <p className="red">
            You own {friend.name} {friend.balance}€
          </p>
        )}

        {friend.balance === 0 && <p>You and {friend.name} are even</p>}

        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you {friend.balance}€
          </p>
        )}
      </div>
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("http://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);
    setName("");
    setImage("http://i.pravatar.cc/48");
  }

  return (
    <div>
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>🙌 Friend name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label>🌆 Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        ></input>

        <Button>Add</Button>
      </form>
    </div>
  );
}

function FormSplitBill({ selectedFrd }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   if (!bill || !paidByUser) return;
  // }

  return (
    <form className="form-split-bill" onClick={handleSubmit}>
      <h2>Split a bill with {selectedFrd.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>

      <label>👩 Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      ></input>

      <label>💸 {selectedFrd.name}'s expense</label>
      <input type="text" disabled value={paidByFriend}></input>

      <label>😭 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFrd.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
export default App;
