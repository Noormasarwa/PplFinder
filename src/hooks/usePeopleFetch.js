import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=1`);
    setIsLoading(false);
    setUsers(response.data.results);
  }

  async function fetchMoreUsers() { 
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=1`);
    setUsers([...response.data.results, ...users]);
  }

  return { users, isLoading, fetchUsers, fetchMoreUsers };
};
