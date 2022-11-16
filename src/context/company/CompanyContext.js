import { createContext, useReducer } from "react";
import companyReducer from "./CompanyReducers";

const CompanyContext = createContext();

const URL = "https://api.github.com";

export const CompanyProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(companyReducer, initialState)

  const fetchUsers = async () => {
    setLoading()
    const res = await fetch(`${URL}/users`);

    const data = await res.json();

    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  };

  //set loading
  const setLoading = () => dispatch({ type: 'SET_LOADING'})

  return (
    <CompanyContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyContext;
