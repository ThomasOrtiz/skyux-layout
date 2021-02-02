import {
  Component,
  TemplateRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'sky-matrix-item',
  templateUrl: './matrix-item.component.html',
  styleUrls: ['./matrix-item.component.scss']
})
export class SkyMatrixItemComponent {

  @ViewChild('matrixItemTemplateRef', {
    read: TemplateRef,
    static: true
  })
  public templateRef: TemplateRef<any>;

}
