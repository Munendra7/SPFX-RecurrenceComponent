import { frequencyDefaults } from './Constants';

export class RecurrenceFields
{
    public frequency:string;
    public freqPattern:string;
    public byMonthDay:number;
    public bySetPos:number;
    public byDay:number;
    public interval:number;
    public frequencyRange:string;
    public occurrence:number;
    public startDate:Date;
    public endDate:Date;

    public constructor()
    {
        this.frequency = "Monthly";
        this.freqPattern = frequencyDefaults["Monthly"].freqPattern;
        this.byMonthDay = frequencyDefaults["Monthly"].byMonthDay;
        this.byDay = frequencyDefaults["Monthly"].byDay;
        this.bySetPos = frequencyDefaults["Monthly"].bySetPos;
        this.interval = frequencyDefaults["Monthly"].interval;
        this.frequencyRange = frequencyDefaults["Monthly"].frequencyRange;
        this.occurrence = frequencyDefaults["Monthly"].occurrence;
        this.startDate = frequencyDefaults["Monthly"].startDate;
        this.endDate = frequencyDefaults["Monthly"].endDate;
    }
}