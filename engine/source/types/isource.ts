export type SourceId = string;

export type OhlcCollection = IOhlcPoint[];

export interface IOhlcPoint extends IPoint {
  close: number;
  open: number;
  high: number;
  low: number;
}

export interface IPoint {
  timestamp: number;
}
