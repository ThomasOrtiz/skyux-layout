import {
  Component
} from '@angular/core';

import {
  SkyThemeService,
  SkyThemeSettings
} from '@skyux/theme';

@Component({
  selector: 'flex-visual',
  templateUrl: './flex-visual.component.html'
})
export class FlexVisualComponent {

  public items: any[] = [
    {
      title: 'Officia deserunt mollit',
      description: 'Excepteur sint occaecat cupidatat non proident.'
    },
    {
      title: 'Sed vitae lectus congue',
      description: 'Donec vel sagittis turpis, at sollicitudin dolor.'
    },
    {
      title: 'Cras felis enim',
      description: 'Sagittis id egestas ac, e sollicitudin vitae sem.'
    },
    {
      title: 'Aliquam sit amet turpis vestibulum e luctus turpis eget',
      description: 'Donec tincidunt lectus et ligula dapibus, a iaculis nibh sagittis.'
    },
    {
      title: '*** This flex child should set the height for all the others ***',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum placerat tortor, sit amet convallis ligula consequat sit amet. Etiam quis pretium nunc. Donec vel sagittis turpis, at sollicitudin dolor.'
    },
    {
      title: 'Nulla non felis feugiat',
      description: 'Donec vel sagittis turpis.'
    },
    {
      title: 'Duis massa neque',
      description: 'Splacerat sit amet finibus a, varius vel tortor.'
    }
  ];

  constructor(
    private themeSvc: SkyThemeService
  ) { }

  public themeSettingsChange(themeSettings: SkyThemeSettings): void {
    this.themeSvc.setTheme(themeSettings);
  }

}
