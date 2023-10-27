import { useState } from "react";
import { initialFriends } from "./initialFriends.js";
import FriendList from "./FriendList.jsx";
import Button from "./Button.jsx";
import FormAddFriend from "./FormAddFriend.jsx";
import FormSplitBill from "./FormSplitBill.jsx";
import "./index.css";
import "./responsive.css";

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

  function handleSplitBill(value) {
    console.log(value);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFrd.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFrd(null);
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
      {selectedFrd && (
        <FormSplitBill
          selectedFrd={selectedFrd}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

export default App;
