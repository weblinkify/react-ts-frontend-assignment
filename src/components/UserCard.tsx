import React from "react";
import { User } from "../types/user";
import styles from "./UserList.module.scss";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className={styles.userCard}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>
        Website:{" "}
        <a
          href={`https://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {user.website}
        </a>
      </p>
      <p>Address: {`${user.address.street}, ${user.address.city}`}</p>
    </div>
  );
};

export default UserCard;
