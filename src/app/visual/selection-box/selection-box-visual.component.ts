import {
  Component, OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'selection-box-visual',
  templateUrl: './selection-box-visual.component.html'
})
export class SelectionBoxVisualComponent implements OnInit {

  public buttonIsClicked: boolean = false;

  public myArray: any = [
    {
      icon: 'edit',
      iconType: 'skyux',
      header: 'Write an introduction',
      description: 'A brief one paragraph introduction about your organzation will help supporters identify with your cause',
      controlName: 'introduction'
    },
    {
      icon: 'calendar',
      iconType: 'skyux',
      header: 'Schedule a consultation',
      description: 'Get something on the calendar to engage your constituents!',
      controlName: 'schedule'
    },
    {
      icon: 'clock',
      iconType: 'skyux',
      header: 'Save time and effort',
      description: 'Encourage supporters to interact with your organization',
      controlName: 'encourage'
    }
  ];

  public myForm: FormGroup;

  get myOptions() {
    return this.myForm.get('radioGroup').get('myOptions');
  }

  // Padding to be applied to the action button container so that the focus outline
  // is fully visible in the screenshot.
  public containerPadding: number = 0;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      checkboxGroup: this.formBuilder.group({
        introduction: undefined,
        encourage: undefined,
        schedule: undefined
      }),
      radioGroup:
        this.formBuilder.group({ myOptions: undefined }, { validator: Validators.required })
    });
  }

  public applyFocus(): void {
    this.containerPadding = 15;
    const actionButton: HTMLElement = document
      .getElementById('screenshot-action-button')
      .querySelector('.sky-action-button');
    actionButton.focus();
  }

  public buttonClicked(): void {
    this.buttonIsClicked = true;
  }
}
