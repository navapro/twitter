import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Navigate, Outlet } from "react-router-dom";

const IS_LOGGED_IN = gql`
  {
    me {
      id
    }
  }
`;

interface Props {
  children?: React.ReactNode;
}

const IsAuthenticated = ({ children }: Props) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <p>loading ...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data.me) {
    return <Navigate to="/landing" />;
  }
  return <Outlet />;
};
export default IsAuthenticated;
