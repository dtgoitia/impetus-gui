export default interface IEntry {
  type: string;
  rounds?: number;
  time?: number;
  [x: string]: any
}
