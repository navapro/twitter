import React from "react";
import { gql, useQuery } from "@apollo/client";

const USERS_QUERY = gql`
  query USERS_QUERY {
    users {
      id
      name
    }
  }
`;
interface User {
  name: string;
}
const Users = () => {
  const { loading, error, data } = useQuery(USERS_QUERY);
  if (loading) return <p>loading ...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {data.users.map((user: User) => (
        <p>{user.name}</p>
      ))}
    </div>
  );
};
export default Users;
