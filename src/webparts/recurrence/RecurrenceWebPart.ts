import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'RecurrenceWebPartStrings';
import Recurrence from './components/Recurrence';
import { IRecurrenceProps } from './Models/IRecurrenceProps';

import { sp } from "@pnp/sp/presets/all";

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export interface IRecurrenceWebPartProps {
  description: string;
}

export default class RecurrenceWebPart extends BaseClientSideWebPart<IRecurrenceWebPartProps> {

  public render(): void {

    sp.setup(this.context);

    const element: React.ReactElement<IRecurrenceProps> = React.createElement(
      Recurrence,
      {
        description: this.properties.description,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
