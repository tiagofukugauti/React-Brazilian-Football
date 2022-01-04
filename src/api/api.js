import axios from 'axios';
import { helperGetImageNameFrom } from '../helpers/helpers';

function getStatistics(data) {
  const {
    total_derrotas,
    total_empates,
    total_vitorias,
    total_pontos,
    total_gols_marcados,
    total_gols_sofridos,
  } = data;

  const balance = total_gols_marcados - total_gols_sofridos;

  return {
    points: total_pontos,
    victories: total_vitorias,
    draws: total_empates,
    defeats: total_derrotas,
    goalsScored: total_gols_marcados,
    goalsTaken: total_gols_sofridos,
    balance,
  };
}

function getRanking(rawData) {
  const lastRound = rawData.length - 1;

  const ranking = rawData[lastRound].partidas
    .map(
      ({
        mandante,
        visitante,
        pontuacao_geral_mandante,
        pontuacao_geral_visitante,
      }) => {
        const hostData = getStatistics(pontuacao_geral_mandante);
        const visitorData = getStatistics(pontuacao_geral_visitante);

        return [
          {
            teamName: mandante,
            imageUrl: helperGetImageNameFrom(mandante),
            data: hostData,
          },
          {
            teamName: visitante,
            imageUrl: helperGetImageNameFrom(visitante),
            data: visitorData,
          },
        ];
      }
    )
    .flat()
    .sort((a, b) => b.data.points - a.data.points);

  console.log(ranking);
  return ranking;
}

export async function apiGetChampionship(year) {
  const { data } = await axios.get(`http://localhost:3001/${year}`);
  const ranking = getRanking(data);

  return ranking;
}
