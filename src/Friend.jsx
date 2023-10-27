import Button from "./Button";

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

export default Friend;
