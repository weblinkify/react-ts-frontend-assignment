import React from "react";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import styles from "./UserList.module.scss";

interface UserSorterProps {
  sortField: "name" | "email";
  setSortField: (field: "name" | "email") => void;
  sortAsc: boolean;
  setSortAsc: (asc: boolean) => void;
}

const UserSorter: React.FC<UserSorterProps> = ({
  sortField,
  setSortField,
  sortAsc,
  setSortAsc,
}) => {
  return (
    <div className={styles.sortButtons}>
      <ToggleButtonGroup
        value={sortField}
        exclusive
        onChange={(event, newSortField) => {
          if (newSortField) {
            setSortField(newSortField);
          }
        }}
        aria-label="text alignment"
      >
        <ToggleButton value="name" aria-label="sort by name">
          Sort by Name
        </ToggleButton>
        <ToggleButton value="email" aria-label="sort by email">
          Sort by Email
        </ToggleButton>
      </ToggleButtonGroup>

      <Button
        variant="text"
        onClick={() => setSortAsc(!sortAsc)}
        style={{ marginLeft: "16px", display: "flex", alignItems: "center" }}
      >
        {sortAsc ? (
          <>
            <ArrowUpward style={{ marginRight: "4px" }} />
            Sort Ascending
          </>
        ) : (
          <>
            <ArrowDownward style={{ marginRight: "4px" }} />
            Sort Descending
          </>
        )}
      </Button>
    </div>
  );
};

export default UserSorter;
