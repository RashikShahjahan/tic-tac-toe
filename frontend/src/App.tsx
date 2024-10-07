import GameLobby from "./gamelobby";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import MultiPlayerGameScreen from "./multiplayergamescreen";
import { createRoot } from 'react-dom/client'


const router = createBrowserRouter([
  {
    path: "/",
    element: <GameLobby />,
    children: [
      {
        path: "/games/:gameId/",
        element: <MultiPlayerGameScreen />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);