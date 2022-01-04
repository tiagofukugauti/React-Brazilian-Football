import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { apiGetChampionship } from '../api/api';
import Spinner from './Spinner';

export default function ChampionshipData() {
  const [loading, setLoading] = useState(true);
  const [ranking, setRanking] = useState([]);
  const { pathname } = useLocation();
  const year = pathname.substring(1);

  useEffect(() => {
    async function getRanking() {
      setLoading(true);
      const backendRanking = await apiGetChampionship(year);
      setRanking(backendRanking);
      setLoading(false);
    }

    getRanking();
  }, [year]);

  if (loading) {
    return (
      <div className="text-center mt-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="border p-2 m-5 mb-4">
      <h2 className="text-center font-semibold text-2xl mb-8">
        Campeonato Brasileiro de {year}
      </h2>
      <div className="flex justify-center">
        <table>
          <thead>
            <th className="w-10">&nbsp;</th>
            <th className="w-12">&nbsp;</th>
            <th className="w-48">Time</th>
            <th className="w-10">P</th>
            <th className="w-10">V</th>
            <th className="w-10">E</th>
            <th className="w-10">D</th>
            <th className="w-10">GP</th>
            <th className="w-10">GC</th>
            <th className="w-10">S</th>
          </thead>

          <tbody>
            {ranking.map((item, index) => {
              const { teamName, imageUrl, data } = item;

              const position = (index + 1).toString().padStart(2, '0');

              const backgroundColorClass =
                index % 2 === 0 ? 'bg-gray-100' : 'white';

              const {
                balance,
                defeats,
                draws,
                goalsScored,
                goalsTaken,
                points,
                victories,
              } = data;

              return (
                <tr
                  key={teamName}
                  className={`${backgroundColorClass} h-8 text-center`}
                >
                  <td>{position}</td>

                  <td>
                    <img
                      className="my-1"
                      src={`./img/${imageUrl}`}
                      alt={teamName}
                      width={25}
                      height={25}
                    />
                  </td>
                  <td className="text-left">{teamName}</td>
                  <td>{points}</td>
                  <td>{victories}</td>
                  <td>{draws}</td>
                  <td>{defeats}</td>
                  <td>{goalsScored}</td>
                  <td>{goalsTaken}</td>
                  <td>{balance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
