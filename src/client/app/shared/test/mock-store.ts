import {Action, Store} from '@ngrx/store';
import {Subject} from 'rxjs/Subject';

export function mockStore<T>(
  {
    actions = new Subject<Action>(),
    states = new Subject<T>()
  }: {
    actions?: Subject<Action>,
    states?: Subject<T>
  }): Store<T> {
  const result = states as any;
  result.dispatch = (action: Action) => actions.next(action);
  result.select = () => {return states};
  return result;
}
