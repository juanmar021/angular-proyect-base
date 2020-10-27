import * as generls from '../actions/general.actions';
import { GET_GENERAL, GET_GENERAL_OKAY, GET_GENERAL_FAIL, ADD_GENERAL, UPDATE_GENERAL, DELETE_GENERAL, CRUD_GENERAL_OKAY, CRUD_GENERAL_FINISH } from "../actions/general.actions";
import { GeneralModel } from '../../models/GeneralModel';
import { ErrorResponseModel } from '../../models/ErrorResponseModel';
import { TypesEntitiesGenerals } from '../../utils/Constants/TypesEntitiesGenerals';

export interface GeneralState {

    sports: GeneralModel[];
    categories: GeneralModel[];
    generalModels: GeneralModel[];
    loadingGeneralModels: boolean;
    errorloadGeneralModels: ErrorResponseModel;

    groups: GeneralModel[];
    loadingGroups:boolean;


    cruding: boolean;
    crudOkay:boolean;

}

const stateInitial: GeneralState = {

    cruding: false,    
    crudOkay:false,

    sports:new  Array<GeneralModel>(),
    categories:new  Array<GeneralModel>(),
    generalModels:new  Array<GeneralModel>(),
    loadingGeneralModels: false,
    errorloadGeneralModels: undefined,
    
    groups:new  Array<GeneralModel>(),
    loadingGroups: false,

};

export function generalReducer( state: GeneralState = stateInitial, action: generls.accions ): GeneralState {

    switch ( action.type ) {


             // [ACTIONS CRUD]

             case ADD_GENERAL:

                return {
                    ...state,
                    cruding:true
            };
    
            case UPDATE_GENERAL:
    
                return {
                    ...state,
                    cruding:true
                };
    
            case DELETE_GENERAL:
    
                return {
                    ...state,
                    cruding:true
                };
    
            case CRUD_GENERAL_OKAY:
    
                return {
                    ...state,
                    cruding: false,
                    crudOkay:true
                };

            case CRUD_GENERAL_FINISH:
    
                return {
                    ...state,
                    cruding: false,
                    crudOkay:false    
                };


    // [ACTIONS GETS]    
        case GET_GENERAL:

            return {
                ...state,
                errorloadGeneralModels: undefined,
                loadingGeneralModels: true,
            };
        case GET_GENERAL_OKAY:

            return {
                ...state,
                loadingGeneralModels: false,
                sports: action.groupId === TypesEntitiesGenerals.SPORTS? action.payload:state.sports,
                categories: action.groupId === TypesEntitiesGenerals.CATEGORIES? action.payload:state.categories,
                generalModels: action.payload,
                errorloadGeneralModels: undefined,

            };
        case GET_GENERAL_FAIL:

            return {
                ...state,
                loadingGeneralModels: false,
                errorloadGeneralModels: action.error,
                sports:  action.groupId === TypesEntitiesGenerals.SPORTS? new  Array<GeneralModel>():state.sports,
                categories:  action.groupId === TypesEntitiesGenerals.CATEGORIES? new  Array<GeneralModel>():state.categories,
                generalModels: new Array<GeneralModel>()
            };


        default:
            return state;
    }

}
