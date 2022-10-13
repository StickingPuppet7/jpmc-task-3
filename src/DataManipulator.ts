import { ServerRespond } from './DataStreamer';

export interface Row {
  // A faire...
  price_abc : number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,

}


export class DataManipulator {
  static generateRow(serverrespond: ServerRespond[]): Row {
    const priceABC = (serverrespond[0].top_ask.price + serverrespond[0].top_bid.price)/2;
    const priceDEF = (serverrespond[1].top_ask.price + serverrespond[1].top_bid.price)/2;
    const ratio = priceABC / priceDEF;
    const upperBound = 1+ 0.05;
    const lowerBound = 1 - 0.05;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: serverrespond[0].timestamp > serverrespond[1].timestamp ?
        serverrespond[0].timestamp : serverrespond[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio: undefined,

    };
  }
  
}
