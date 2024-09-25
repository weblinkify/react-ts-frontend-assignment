import React, { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { User } from "../types/user";
import styles from "./UserList.module.scss";
import UserFilter from "./UserFilter";
import UserSorter from "./UserSorter";
import UserCard from "./UserCard";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [sortField, setSortField] = useState<"name" | "email">("name");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (err) {
        setError("Failed to load users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase()) ||
      user.phone.toLowerCase().includes(filter.toLowerCase()) ||
      user.website.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    const fieldA = sortField === "name" ? a.name : a.email;
    const fieldB = sortField === "name" ? b.name : b.email;

    return sortAsc
      ? fieldA.localeCompare(fieldB)
      : fieldB.localeCompare(fieldA);
  });

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.userListContainer}>
      <UserFilter filter={filter} setFilter={setFilter} />
      <UserSorter
        sortField={sortField}
        setSortField={setSortField}
        sortAsc={sortAsc}
        setSortAsc={setSortAsc}
      />
      <div className={styles.userCards}>
        {sortedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
