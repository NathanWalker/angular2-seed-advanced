// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { IAppState, BaseComponent, RouterExtensions, getNames } from '../../frameworks/core/index';
import * as nameList from '../../frameworks/sample/index';

@BaseComponent({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
  public names$: Observable<Array<string>>;
  public newName: string = '';

  constructor(private store: Store<IAppState>, public routerext: RouterExtensions) {
    this.names$ = store.select<Array<string>>(s => s.sample.names);
    // this.names$ = store.let(getNames);
  }

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.store.dispatch(new nameList.AddAction(this.newName));
    // this.store.dispatch({ type: nameList.ActionTypes.ADD, payload: this.newName });
    this.newName = '';
    return false;
  }

  readAbout() {
    // Try this in the {N} app
    // {N} can use these animation options
    this.routerext.navigate(['/about'], {
      transition: {
        duration: 1000,
        name: 'slideTop',
      }
    });
  }
}
