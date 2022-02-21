import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import memoryUtils from "./utils/memoryUtils";
import storageUtil from "./utils/storageUtil";

//read local storage 
const user = storageUtil.getUser()
memoryUtils.user = user
console.log('user', memoryUtils.user);

ReactDOM.render(<App />, document.getElementById('root'))