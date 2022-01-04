import { Redirect, Route } from 'react-router-dom';
import { NavLink, Switch } from 'react-router-dom';
import { apiGetChampionship } from './api/api';

import Championship from './components/Championship';

export default function App() {
  return (
    <div>
      <header>
        <div className="bg-green-500 mx-auto p-4">
          <h1 className="text-center font-semibold text-xl">
            REACT CAMPEONATO BRASILEIRO
          </h1>
        </div>
      </header>

      <main>
        <div>
          <h2 className="mt-4 text-center">
            <strong>Selecione a temporada</strong>
          </h2>
        </div>

        <div className="container mx-auto p-4">
          <ul
            className={`flex flex-row items-center justify-center
                        flex-wrap space-x-4`}
          >
            {ROUTES.map(({ id, description, path }) => {
              return (
                <li key={id}>
                  <NavLink activeClassName="active-route" to={path}>
                    {description}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <Switch>
            {ROUTES.map(({ id, path, component }) => {
              return (
                <Route key={id} path={path} exact>
                  {component}
                </Route>
              );
            })}

            <Route key="home-route" path="/" exact>
              <Redirect to="/2003" />
            </Route>
          </Switch>
        </div>
      </main>
    </div>
  );
}

const firstYear = 2003;
const lastYear = 2015;

const years = Array.from({ length: lastYear - firstYear + 1 }).map(
  (_, index) => firstYear + index
);

const ROUTES = [];

years.forEach(year => {
  const yearString = year.toString();

  ROUTES.push({
    id: yearString,
    description: yearString,
    path: `/${yearString}`,
    component: <Championship />,
  });
});
