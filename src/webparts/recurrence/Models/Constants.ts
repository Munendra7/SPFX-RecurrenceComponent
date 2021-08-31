import { getTheme, mergeStyleSets, FontWeights } from '@fluentui/react';
import { IButtonStyles } from '@fluentui/react/lib/Button';
import { IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { IDropdownOption } from '@fluentui/react/lib/Dropdown';

import Calculation from '../DataServices/Calculations';

const calculationObj = new Calculation();

const theme = getTheme();
export const contentStyles = mergeStyleSets({
    container: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'stretch',
    },
    header: [
      // eslint-disable-next-line deprecation/deprecation
      theme.fonts.xLarge,
      {
        flex: '1 1 auto',
        borderTop: `4px solid ${theme.palette.themePrimary}`,
        color: theme.palette.neutralPrimary,
        display: 'flex',
        alignItems: 'center',
        fontWeight: FontWeights.semibold,
        padding: '12px 12px 14px 24px',
      },
    ],
    body: {
      flex: '4 4 auto',
      padding: '0 24px 24px 24px',
      overflowY: 'hidden',
      selectors: {
        p: { margin: '14px 0' },
        'p:first-child': { marginTop: 0 },
        'p:last-child': { marginBottom: 0 },
      },
    },
});

export const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
      color: theme.palette.neutralPrimary,
      marginLeft: 'auto',
      marginTop: '4px',
      marginRight: '2px',
    },
    rootHovered: {
      color: theme.palette.neutralDark,
    },
};

export const frequencyOptions: IChoiceGroupOption[] = [
    { key: 'Monthly', text: 'Monthly' },
    { key: 'Quaterly', text: 'Quaterly' },
    { key: 'HalfYearly', text: 'Half Yearly'},
    { key: 'Yearly', text: 'Yearly' },
];

export const frequencyPatternOptions: IChoiceGroupOption[] = [
  { key: 'Day', text: 'Day' },
  { key: 'The', text: 'The' }
];

export const posOptions: IDropdownOption[] = [
  { key: '1', text: 'First' },
  { key: '2', text: 'Second' },
  { key: '3', text: 'Third' },
  { key: '4', text: 'Fourth' },
  { key: '5', text: 'Last' },
];

export const dayOptions: IDropdownOption[] = [
  { key: '1', text: 'day' },
  { key: '2', text: 'weekday' },
  { key: '3', text: 'weekend day' },
  { key: '4', text: 'Sunday' },
  { key: '5', text: 'Monday' },
  { key: '6', text: 'Tuesday' },
  { key: '7', text: 'Wednesday' },
  { key: '8', text: 'Thursday' },
  { key: '9', text: 'Friday' },
  { key: '10', text: 'Saturday' },
];

export const intervalText: Object = 
{
  "Monthly":"month(s)",
  "Quaterly":"month of quater",
  "HalfYearly":"month of half year"
};

export const quaterlyInterval:IDropdownOption[] = [
  { key: '1', text: 'First' },
  { key: '2', text: 'Second' },
  { key: '3', text: 'Third' }
];

export const halfYearlyInterval:IDropdownOption[] = [
  { key: '1', text: 'First' },
  { key: '2', text: 'Second' },
  { key: '3', text: 'Third' },
  { key: '4', text: 'Fourth' },
  { key: '5', text: 'Fifth' },
  { key: '6', text: 'Sixth' }
];

export const months:IDropdownOption[] = [
  { key: '1', text: 'January' },
  { key: '2', text: 'February' },
  { key: '3', text: 'March' },
  { key: '4', text: 'April' },
  { key: '5', text: 'May' },
  { key: '6', text: 'June' },
  { key: '7', text: 'July' },
  { key: '8', text: 'August' },
  { key: '9', text: 'September' },
  { key: '10', text: 'October' },
  { key: '11', text: 'November' },
  { key: '12', text: 'December' },
];

export const frequencyRange: IChoiceGroupOption[] = [
  { key: 'EndBy', text: 'End By' },
  { key: 'EndAfter', text: 'End After' },
  { key: 'NoEndDate', text: 'No End Date' }
];

export const frequencyDefaults = 
{
  "Monthly":{
    "freqPattern":"Day",
    "byMonthDay": new Date().getDate(),
    "byDay":-1,
    "bySetPos":-1,
    "interval":1,
    "frequencyRange":"EndBy",
    "occurrence":13,
    "startDate":calculationObj.getDateWithoutTime(new Date().getTime()),
    "endDate":calculationObj.getDateWithoutTime(new Date(new Date().getFullYear()+1,new Date().getMonth(),new Date().getDate()).getTime())
  },
  "Quaterly":{
    "freqPattern":"Day",
    "byMonthDay": new Date().getDate(),
    "byDay":-1,
    "bySetPos":-1,
    "interval":calculationObj.getMonthQuaterSequence(new Date()),
    "frequencyRange":"EndBy",
    "occurrence":8,
    "startDate":calculationObj.getDateWithoutTime(new Date().getTime()),
    "endDate":calculationObj.getDateWithoutTime(new Date(new Date().getFullYear()+1,new Date().getMonth(),new Date().getDate()).getTime())
  },
  "HalfYearly":{
    "freqPattern":"Day",
    "byMonthDay": new Date().getDate(),
    "byDay":-1,
    "bySetPos":-1,
    "interval":calculationObj.getMonthHalfYearlySequence(new Date()),
    "frequencyRange":"EndBy",
    "occurrence":4,
    "startDate":calculationObj.getDateWithoutTime(new Date().getTime()),
    "endDate":calculationObj.getDateWithoutTime(new Date(new Date().getFullYear()+5,new Date().getMonth(),new Date().getDate()).getTime())
  },
  "Yearly":{
    "freqPattern":"Day",
    "byMonthDay": new Date().getDate(),
    "byDay":-1,
    "bySetPos":-1,
    "interval":new Date().getMonth()+1,
    "frequencyRange":"EndBy",
    "occurrence":10,
    "startDate":calculationObj.getDateWithoutTime(new Date().getTime()),
    "endDate":calculationObj.getDateWithoutTime(new Date(new Date().getFullYear()+10,new Date().getMonth(),new Date().getDate()).getTime())
  }
};