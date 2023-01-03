import Company from "../database/company";
import ICompany from "../models/ICompany";



export default class UserService {
    public static getCompany(): Promise<ICompany[]>{
      return new Promise(async (resolve, reject) => {
        try {
          const listCompanies: ICompany[] = await Company.find({ isDeleted: false });
          resolve(listCompanies);
        } catch (error: any) {
          reject(error);
        }
      });
    }

    public static createCompany(company: ICompany): Promise<string>{
        return new Promise(async (resolve, reject) => {
            try {

                await Company.create(company);
                resolve('Empresa creada Correctamente')
            } catch (error) {
                reject(error);
            }
        })
    }

    public static editCompany(userId: Object, company: ICompany): Promise<String> {
        return new Promise(async (resolve, reject) => {
          try {
            await Company.updateOne({ _id: userId }, company);
            resolve(`Empresa ${company.name} editado correctamente.`);
          } catch (error) {
            reject(error);
          }
        });
      }
    
      public static deleteCompany(companyId: Object): Promise<string>{
        return new Promise(async(resolve, reject) => {
          try {
            await Company.updateOne({ _id: companyId }, { isDeleted: true })
            resolve('Empresa Eliminada correctamente.')
          } catch (error) {
            reject(error)
          }
        });
      }
/*
      public static findById(userId: Object): Promise<ICompany | null>{
        return new Promise(async (resolve, reject) => {
          try {
            const UserById = await Company.findOne({ _id: userId }, { isDeleted: false });
            resolve(UserById);
          } catch (error: any) {
            reject(error);
          }
        })
      }*/
}