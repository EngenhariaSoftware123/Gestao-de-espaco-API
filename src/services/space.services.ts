import {SpaceDALs} from "../database/data_access/space.dals"
import { Available_equipmentsDALs } from "../database/data_access/available.dals"
import { ISpaceData } from "../interfaces/space.interface";
import {BadRequestError, NotFoundError} from "../helpers/error.helpers"

class SpaceServices{
    spaceDALs: SpaceDALs;
    available_equipmentsDALS: Available_equipmentsDALs;
    constructor(){
        this.spaceDALs = new SpaceDALs();
        this.available_equipmentsDALS = new Available_equipmentsDALs();
    }

    async createSpace({name, typeRoom, capacity, available_equipments, pavilion, acessibility}: ISpaceData){
        const createdSpace = await this.spaceDALs.createSpace({name, typeRoom, capacity, pavilion, acessibility});
        
        if(!createdSpace){
            throw new BadRequestError({message: "espaço não foi criado"});
        }
        let equipments: any[] = [];
         await Promise.all(
        available_equipments.map(async (availableEquipament)=>{
            const {name, quantity} = availableEquipament;
            
            let result = await this.available_equipmentsDALS.createAvailable({name, quantity,  spaceId: createdSpace.id})
            if(result){
                equipments.push(result);
            }
            
            
            
            
        }));

        return {
            createdSpace,
            equipments

        }
        
    }

    async getSpace(){
        const spaces = await this.spaceDALs.findSpaces();
        let spaceArray:{space: any; available_equipments: any[]}[] = [];
       await Promise.all(
        spaces.map(async (space)=>{
            let result = await this.available_equipmentsDALS.findAvailablesbySpaceId(space.id)
        
            if(result){
                spaceArray.push({space, available_equipments: result});
            }
            
        }));
        return spaceArray;
    }

    async updateSpace(id: number, {name, typeRoom, capacity, available_equipments, pavilion, acessibility}: ISpaceData){
            const space = await this.spaceDALs.findSpaceById(id);

            if(!space){
                throw new NotFoundError({message: 'espaço não encontrado'});
            }

            const updateSpace = await this.spaceDALs.updateSpace({id, name, typeRoom, capacity, pavilion, acessibility})
            const deleteAvailables = await this.available_equipmentsDALS.deleteAvailableBySpaceId(space.id);

            let equipments: any[] = [];
         await Promise.all(
        available_equipments.map(async (availableEquipament)=>{
            const {name, quantity} = availableEquipament;
            
            let result = await this.available_equipmentsDALS.createAvailable({name, quantity,  spaceId: space.id})
            if(result){
                equipments.push(result);
            }
            
            
            
            
        }));

        return {
            updateSpace,
            equipments
        }

    }

}

export {SpaceServices}