import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { IReservation } from "../../interfaces/IReservation";
import { IGraphData } from "../../interfaces/IGraphData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IBarGraph {
  list: Array<IReservation>;
  type: "status" | "location" | "place";
}

function HorizontalBarGraph({ list, type }: IBarGraph) {
  const [data, setData] = useState<IGraphData | null>(null);

  const countByStatus = (): IGraphData => {
    const statusCount: any = {
      open: 0,
      used: 0,
      expired: 0,
    };

    list.forEach((reservation: IReservation) => {
      statusCount[reservation.status] += 1;
    });

    return {
      labels: ["Em aberto", "Utilizadas", "Expiradas"],
      datasets: [
        {
          label: "Número de Reservas",
          data: [statusCount.open, statusCount.used, statusCount.expired],
          backgroundColor: ["#2c2c2c", "#606C38", "#DDA15E"],
        },
      ],
    };
  };

  const countByLocation = (): IGraphData => {
    const locationCount: any = {
      "Rio de Janeiro": 0,
      "São Paulo": 0,
      "Minas Gerais": 0,
    };

    list.forEach((reservation: IReservation) => {
      locationCount[reservation.location] += 1;
    });

    return {
      labels: ["Rio de Janeiro", "São Paulo", "Minas Gerais"],
      datasets: [
        {
          label: "Número de Reservas",
          data: [
            locationCount["Rio de Janeiro"],
            locationCount["São Paulo"],
            locationCount["Minas Gerais"],
          ],
          backgroundColor: ["#2c2c2c", "#606C38", "#DDA15E"],
        },
      ],
    };
  };

  const countByPlace = (): IGraphData => {
    const placeCount: any = {
      Térreo: 0,
      Superior: 0,
    };

    list.forEach((reservation: IReservation) => {
      placeCount[`${reservation.place}`] += 1;
    });

    return {
      labels: ["Térreo", "Superior"],
      datasets: [
        {
          label: "Número de Reservas",
          data: [placeCount["Térreo"], placeCount["Superior"]],
          backgroundColor: ["#2c2c2c", "#606C38", "#DDA15E"],
        },
      ],
    };
  };

  useEffect(() => {
    type GraphInfo = {
      name: string;
      action: () => IGraphData;
    };

    const types: Array<GraphInfo> = [
      { name: "status", action: countByStatus },
      { name: "location", action: countByLocation },
      { name: "place", action: countByPlace },
    ];

    types.forEach((currentType: GraphInfo) => {
      if (currentType.name === type) {
        setData(currentType.action());
      }
    });
  }, [list, type]);

  return (
    <>
      {data ? (
        <div className={`graph-horizontal-bar ${type}`}>
          <Bar
            data={data}
            options={{
              responsive: true,
              indexAxis: "y",
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text:
                    type === "status"
                      ? "Reservas por Status"
                      : type === "location"
                      ? "Reservas por Localização"
                      : "Reservas por Andar",
                },
              },
            }}
          />
        </div>
      ) : (
        <p>Carregando gráfico...</p>
      )}
    </>
  );
}

export default HorizontalBarGraph;
