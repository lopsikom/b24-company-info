import type { B24Frame } from '@bitrix24/b24jssdk'
import type { ICompnany, IRequisite } from './models/BtirixModels';

export class BitrixHandler {
    private companyId? : number
    constructor(private readonly _frame : B24Frame) {
    }

    get frame() : B24Frame {
        return this._frame 
    }
    async companyRequisite(id? : string | number) : Promise<IRequisite[]> {
        return (await this._frame.actions.v2.call.make({
            method : "crm.requisite.list",
            params : {
                filter : {
                    ENTITY_TYPE_ID : 4,
                    ENTITY_ID : id ?? await this.getCompanyId()
                }
            }
        })).getData()?.result as IRequisite[];
    }
    async companyInfo(id? : string | number) : Promise<ICompnany>{
        return (await this._frame.actions.v2.call.make({
            method: 'crm.company.get',
            params: {
                id: id ?? await this.getCompanyId(),
            },
        })).getData()?.result as ICompnany
    }
    async getCompanyId(){
        if(!this.companyId){
            const id = this._frame.placement.options.ID
            this.companyId = id;
        }
        return this.companyId;
    }
}
let b24FrameHandler : BitrixHandler | null = null

export async function initB24Frame(){
    const frame = await useNuxtApp().$initializeB24Frame();
    b24FrameHandler = new BitrixHandler(frame);
    return b24FrameHandler
}
