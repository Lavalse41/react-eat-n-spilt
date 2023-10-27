import Friend from "./Friend";

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

export default FriendList;
