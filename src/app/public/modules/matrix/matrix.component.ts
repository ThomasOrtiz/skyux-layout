import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList
} from '@angular/core';

import {
  SkyMatrixItemComponent
} from './matrix-item.component';

@Component({
  selector: 'sky-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class SkyMatrixComponent implements AfterContentInit {

  public gridTemplateColumnsStyle = 'repeat(auto-fit, minmax(250px, 1fr))';

  // All columns on one row
  // repeat(colNum, 1fr)

  @ContentChildren(SkyMatrixItemComponent, {
    read: SkyMatrixItemComponent
  })
  private matrixItemComponents: QueryList<SkyMatrixItemComponent>;

  public ngAfterContentInit(): void {
    console.log(this.matrixItemComponents);
  }

}
