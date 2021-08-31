import { WebPartContext } from "@microsoft/sp-webpart-base";
import { RecurrenceFields } from "./RecurrenceFields";

export interface IRecurrenceComponentProps {
    context: WebPartContext;
}

export interface IRecurrenceComponentStates {
  showRecurrencePopup: boolean;
  recurrenceFields: RecurrenceFields;
  showAlert: boolean;
  showWarning: boolean;
  msgAlertWarning: string;
  isSaved: boolean;
  recurrenceMsg: string;
}
