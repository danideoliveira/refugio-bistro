export interface IGraphData {
  labels: string[];
  datasets: {
    label: string;
    data: any[];
    backgroundColor: string[];
  }[];
}
