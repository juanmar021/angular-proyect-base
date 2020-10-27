import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { GeneralService } from '../../services/general.service';
import { GET_GENERAL, GetGeneralAction, GetGeneralOkayAction, ADD_GENERAL, AddGeneralAction, CrudGeneralOkayAction, UPDATE_GENERAL, UpdateGeneralAction, DELETE_GENERAL, DeleteGeneralAction, CrudGeneralFinishAction, GetGeneralFailAction } from '../actions/general.actions';
import { ErrorService } from '../../services/error.service';
import { ResponseModel } from '../../models/ResponseModel';
 


@Injectable()
export class GeneralEffects {

    public constructor( private actions$: Actions,
                        private _service: GeneralService ,
                        private errorService:ErrorService
                        ) {}                                 
    @Effect()
    add$: Observable<Action> = this.actions$.pipe(
        ofType( ADD_GENERAL ),
        mergeMap( (action: AddGeneralAction) => {
            return this._service.add(action.general).pipe(
                map( (resp: ResponseModel) => {

                    if ( resp.okay ) {
                        return new CrudGeneralOkayAction(resp.data );
                    } else {
                        return new CrudGeneralFinishAction();
                    }
                }),
                catchError( (err) => {

                    this.errorService.show(err);
                    return of(new CrudGeneralFinishAction());
                })
            );
        })
    );
                        
    @Effect()
    update$: Observable<Action> = this.actions$.pipe(
        ofType( UPDATE_GENERAL ),
        mergeMap( (action: UpdateGeneralAction) => {
            return this._service.update(action.general).pipe(
                map( (resp: ResponseModel) => {

                    if ( resp.okay ) {
                        return new CrudGeneralOkayAction(resp.data );
                    } else {
                        return new CrudGeneralFinishAction();
                    }
                }),
                catchError( (err) => {

                    this.errorService.show(err);
                    return of(new CrudGeneralFinishAction());
                })
              );
        })
    );
    


    @Effect()
    delete$: Observable<Action> = this.actions$.pipe(
        ofType( DELETE_GENERAL ),
        mergeMap( (action: DeleteGeneralAction) => {
            return this._service.delete(action.id).pipe(
                map( (resp: ResponseModel) => {

                    if ( resp.okay ) {
                        return new CrudGeneralOkayAction(resp.data );
                    } 
                }),
                catchError( (err) => {
                    this.errorService.show(err);
                    return of(new CrudGeneralFinishAction());
                })
            );
        })
    );


    @Effect()
    loadGeneralModels$: Observable<Action> = this.actions$.pipe(
        ofType( GET_GENERAL ),
        mergeMap( (action: GetGeneralAction) => {
            return this._service.getGeneralModels(action.groupId).pipe(
                map( (resp: ResponseModel) => {
                    if ( resp.okay ) {
                        return new GetGeneralOkayAction(resp.data,action.groupId );
                    } 
                }),
                catchError( (err) => {

                    this.errorService.show(err);
                    return of(new GetGeneralFailAction( undefined,action.groupId ));
                })
            );
        })
    );
   
}
