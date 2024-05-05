import Movies from './movies';
import Login from './login';
import Games from './games';
import Logout from './logout';
import { TableMovie, TableGame } from './table';
import { DetailMovie, DetailGame } from './detail';
import { EditGame, EditMovie } from './edit';
import { DeleteGame, DeleteMovie } from './delete';
import { AddGame, AddMovie } from './add';
import { ChangePass } from './user';

export const NavDataLogout = [
    { comp: Login, text: 'Sign In', to: '/login' },
    { comp: Games, text: 'Games', to: '/games' },
    { comp: Movies, text: 'Movies', to: '/' },
];

export const NavDataLogin = [
    { comp: Logout, text: 'Sign Out', to: '/logout' },
    { comp: TableMovie, text: 'Editor', to: '/editor/movie' },
    { comp: Games, text: 'Games', to: '/games' },
    { comp: Movies, text: 'Movies', to: '/' },
];

export const SwitchDataLogout = [
    { comp: Login, text: 'Sign In', to: '/login' },
    { comp: Games, text: 'Games', to: '/games' },
    { comp: Movies, text: 'Movies', to: '/' },
    { comp: DetailGame, text: 'Game Detal', to: '/detail/game/:id' },
    { comp: DetailMovie, text: 'Movie Detail', to: '/detail/movie/:id' },
];

export const SwitchDataLogin = [
    ...NavDataLogin,
    { comp: TableGame, text: 'Editor', to: '/editor/game' },
    { comp: EditGame, text: 'Game Editor', to: '/edit/game/:id' },
    { comp: EditMovie, text: 'Movie Editor', to: '/edit/movie/:id' },
    { comp: DetailGame, text: 'Game Detail', to: '/detail/game/:id' },
    { comp: DetailMovie, text: 'Movie Detail', to: '/detail/movie/:id' },
    { comp: DeleteGame, text: 'Delete Game', to: '/delete/game/:id' },
    { comp: DeleteMovie, text: 'Delete Movie', to: '/delete/movie/:id' },
    { comp: AddGame, text: 'Add Game', to: '/add/game' },
    { comp: AddMovie, text: 'Add Movie', to: '/add/movie' },
    {
        comp: ChangePass,
        text: 'Change Password',
        to: '/editor/change-password',
    },
];
