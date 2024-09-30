import { ethers } from "ethers";
import FinancialABI from "./Abis/FinancialTrackingSystem.json";
import { FinancialTrackingSystem } from "./AddressHelper";


export const FinancialObj = async(Signer:any) => {
    return new ethers.Contract(FinancialTrackingSystem,FinancialABI,Signer)
}