import * as React from 'react';
import { IRecurrenceProps } from '../Models/IRecurrenceProps';
import RecurrenceComponent from './RecurrenceComponent';

export default class Recurrence extends React.Component<IRecurrenceProps, {}> {
  public render(): React.ReactElement<IRecurrenceProps> {
    return (
      <>
       <RecurrenceComponent context={this.props.context}></RecurrenceComponent>
      </>
    );
  }
}
