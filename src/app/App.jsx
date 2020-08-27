import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "../home";
function App() {
  return (
    <BrowserRouter>
      <div className="jumbotron p-4">
        <div className="container text-center">
          <Route exact path="/" component={Home} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export { App };
