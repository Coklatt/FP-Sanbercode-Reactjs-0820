import Movies from "./movies";
import Login from "./login";
import Games from "./games";
import Logout from "./logout";
import { TableMovie, TableGame } from "./table";
import { DetailMovie, DetailGame } from "./detail";
import { EditGame, EditMovie } from "./edit";
import { DeleteGame, DeleteMovie } from "./delete";
import { AddGame, AddMovie } from "./add";
import { ChangePass } from "./user";

export const NavDataLogout = [
  { comp: Login, text: "Login", to: "/login" },
  { comp: Games, text: "Games", to: "/games" },
  { comp: Movies, text: "Movies", to: "/" },
];

export const NavDataLogin = [
  { comp: Logout, text: "Logout", to: "/logout" },
  { comp: TableMovie, text: "Editor", to: "/editor/movie" },
  { comp: Games, text: "Games", to: "/games" },
  { comp: Movies, text: "Movies", to: "/" },
];

export const SwitchDataLogout = [
  { comp: Login, text: "Login", to: "/login" },
  { comp: Games, text: "Games", to: "/games" },
  { comp: Movies, text: "Movies", to: "/" },
];

export const SwitchDataLogin = [
  ...NavDataLogin,
  { comp: TableGame, text: "Editor", to: "/editor/game" },
  { comp: DetailGame, text: "Detail Game", to: "/detail/game/:id" },
  { comp: DetailMovie, text: "Detail Movie", to: "/detail/movie/:id" },
  { comp: EditGame, text: "Edit Game", to: "/edit/game/:id" },
  { comp: EditMovie, text: "Edit Movie", to: "/edit/movie/:no" },
  { comp: DeleteGame, text: "Delete Game", to: "/delete/game/:id" },
  { comp: DeleteMovie, text: "Delete Movie", to: "/delete/movie/:id" },
  { comp: AddGame, text: "Add Game", to: "/add/game" },
  { comp: AddMovie, text: "Add Movie", to: "/add/movie" },
  {
    comp: ChangePass,
    text: "Change Password",
    to: "/editor/change-password",
  },
];
