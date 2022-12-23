import IOrders from "../models/IOrders";

const conversionFactor:number = 333; //factor de conversion usado a nivel terrestre
const baseCost: number = 13000;
const aditionalKGCost: number = 3300;

export default class utilsClass{
    public static calculateCost(Order:IOrders): Promise<number>{
        return new Promise(async (resolve, reject) => {
            try {
                const height: number = Order.height;
                const width: number = Order.width;
                const depth: number = Order.depth;
                const weight: number = Order.weight;
                const VolumetricVolume: number = ((height * width * depth) * conversionFactor)/1000000;
                let formulaWeight: number = ( weight < VolumetricVolume ) ?  VolumetricVolume : weight;
                let cost:number = 0;
                if(formulaWeight > 1){
                    const aditionalKG: number = Math.ceil(formulaWeight-1);
                    cost =  baseCost + (aditionalKG * aditionalKGCost)
                } else if (formulaWeight <= 1){
                    cost = baseCost;
                }
                resolve(cost);
            } catch (error: any) {
              reject(error);
            }
          });
    }
}