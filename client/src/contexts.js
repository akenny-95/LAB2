import {createContext} from "react";

export const ThemeContext = createContext({
    primaryColor: "darkslategrey",
    secondaryColor: "darkseagreen",
})

export const StateContext = createContext({
    state: {},
    dispatch: () => {},
})