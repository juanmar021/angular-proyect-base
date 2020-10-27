
import { Action } from '@ngrx/store';
import { GeneralModel } from '../../models/GeneralModel';
import { ErrorResponseModel } from '../../models/ErrorResponseModel';

export const GET_GENERAL        = '[GENERAL] Get';
export const GET_GENERAL_OKAY   = '[GENERAL] Get okay';
export const GET_GENERAL_FAIL   = '[GENERAL] Get fail';

export const CRUD_GENERAL_OKAY   = '[GENERAL] Crud  okay';
export const CRUD_GENERAL_FINISH = '[GENERAL] Crud finish ';

export const ADD_GENERAL       = '[GENERAL] Save ';

export const UPDATE_GENERAL        = '[GENERAL] Update ';

export const DELETE_GENERAL        = '[GENERAL] Delete ';

// [GET]
export class GetGeneralAction implements Action {
  
    readonly type = GET_GENERAL;

    public constructor(public groupId:number) {}
}

export class GetGeneralOkayAction implements Action {
    readonly type = GET_GENERAL_OKAY;

    public constructor( public payload: GeneralModel[], public groupId:number ) {}
}

export class GetGeneralFailAction implements Action {
    readonly type = GET_GENERAL_FAIL;

    public constructor( public error: ErrorResponseModel , public groupId:number) {}
}


// [CRUD GENERAL]
export class AddGeneralAction implements Action {
  
    readonly type = ADD_GENERAL;

    public constructor(public general:GeneralModel) {}
}
export class UpdateGeneralAction implements Action {
  
    readonly type = UPDATE_GENERAL;

    public constructor(public general:GeneralModel) {}
}

export class DeleteGeneralAction implements Action {
  
    readonly type = DELETE_GENERAL;

    public constructor(public id:number) {}
}

export class CrudGeneralOkayAction implements Action {
    readonly type = CRUD_GENERAL_OKAY;

    public constructor( public payload:any ) {}
}


export class CrudGeneralFinishAction implements Action {

    readonly type = CRUD_GENERAL_FINISH;

    public constructor( ) {}
}


export type accions =   GetGeneralAction           |
                        GetGeneralOkayAction       |
                        GetGeneralFailAction       |
                        AddGeneralAction           |
                        UpdateGeneralAction        |
                        DeleteGeneralAction        |
                        CrudGeneralOkayAction      |
                        CrudGeneralFinishAction;

