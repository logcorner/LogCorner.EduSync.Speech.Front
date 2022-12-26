import {Injectable} from '@angular/core'
import {Subject, Subscription} from 'rxjs'
import {filter, map} from 'rxjs/operators'
import { EmitEvent } from '../models/EmitEvent';
import { Events } from '../models/Events';

@Injectable()

  export class MediatorService {
    private  subject$ = new Subject();
    
    on(event : Events, action : any) : Subscription {
        return this.subject$
        .pipe(
            filter((e:   any ) => e.name === event),
            map((e:EmitEvent) => e.value)
        ).subscribe(action)
    }

    emit(event : EmitEvent) : void {
        this.subject$.next(event);
    }
  }