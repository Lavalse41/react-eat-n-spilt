import Button from "./Button";
import { useState } from "react";

function FormSplitBill({ selectedFrd, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByFriend);
  }

  return (
    <form className="form-split-bill" onClick={handleSubmit}>
      <h2>Split a bill with {selectedFrd.name}</h2>

      <label>
        <span className="icon">💰</span> Bill value
      </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>

      <label>
        <span className="icon">👩</span> Your expense
      </label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      ></input>

      <label>
        <span className="icon">💸</span> {selectedFrd.name}'s expense
      </label>
      <input type="text" disabled value={paidByFriend}></input>

      <label>
        <span className="icon">😭</span> Who is paying the bill
      </label>
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

export default FormSplitBill;
