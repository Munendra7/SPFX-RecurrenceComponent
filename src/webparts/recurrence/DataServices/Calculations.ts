import {RecurrenceFields} from '../Models/RecurrenceFields';

import * as Const from '../Models/Constants';

export default class Calculation
{
    public countOccurances(recurrenceFields:RecurrenceFields)
    {
        let startDate = this.getDateWithoutTime(recurrenceFields.startDate.getTime());
        let endDate = this.getDateWithoutTime(recurrenceFields.endDate.getTime());

        let occurrence = 0;

        while(startDate<=endDate)
        {
            occurrence++;
            startDate = this.getNextDueDate(startDate,recurrenceFields);
            console.log(startDate);
        }

        return occurrence;
    }

    public getEndDate(recurrenceFields:RecurrenceFields)
    {
        let startDate = this.getDateWithoutTime(recurrenceFields.startDate.getTime());

        let occurrence = 1;

        while(occurrence<recurrenceFields.occurrence)
        {
            occurrence++;
            startDate = this.getNextDueDate(startDate,recurrenceFields);
            console.log(startDate);
        }

        return startDate;
    }

    public getNextDueDate(date:Date,recurrenceFields:RecurrenceFields)
    {
        let startDate = date;

        if(recurrenceFields.frequency=="Monthly")
        {
            let validRangeDate = new Date(startDate.getFullYear(),startDate.getMonth()+recurrenceFields.interval,1);
                
            return this.getDateWithoutTime(validRangeDate.setDate(this.getDateNumber(recurrenceFields,validRangeDate)));
        }

        else if(recurrenceFields.frequency=="Quaterly")
        {
            let validRangeDate = new Date(startDate.getFullYear(),startDate.getMonth()+3,1);

            return this.getDateWithoutTime(validRangeDate.setDate(this.getDateNumber(recurrenceFields,validRangeDate)));
        }

        else if(recurrenceFields.frequency=="HalfYearly")
        {
            let validRangeDate = new Date(startDate.getFullYear(),startDate.getMonth()+6,1);

            return this.getDateWithoutTime(validRangeDate.setDate(this.getDateNumber(recurrenceFields,validRangeDate)));
        }

        else if(recurrenceFields.frequency=="Yearly")
        {
            let validRangeDate = new Date(startDate.getFullYear()+1,startDate.getMonth(),1);

            return this.getDateWithoutTime(validRangeDate.setDate(this.getDateNumber(recurrenceFields,validRangeDate)));
        }
    }

    public setStartDate(recurrenceFields:RecurrenceFields)
    {
        let startDate = recurrenceFields.startDate;

        if(recurrenceFields.frequency=="Monthly")
        {
            if((recurrenceFields.freqPattern=="Day" && startDate.getDate()>recurrenceFields.byMonthDay) || (recurrenceFields.freqPattern=="The" && startDate.getDate()>this.getFrequencyDate(startDate,recurrenceFields)))
            {
                let validRangeDate = new Date(startDate.getFullYear(),startDate.getMonth()+recurrenceFields.interval,1);
                
                return this.getDateWithoutTime(validRangeDate.setDate(this.getDateNumber(recurrenceFields,validRangeDate)));
            }

            else
            {
                return this.getDateWithoutTime(new Date(startDate.getFullYear(),startDate.getMonth(),1).setDate(this.getDateNumber(recurrenceFields,startDate)));
            }
        }

        else if(recurrenceFields.frequency=="Quaterly")
        {
            if(this.getMonthQuaterSequence(startDate)>recurrenceFields.interval || ((recurrenceFields.freqPattern=="Day" && startDate.getDate()>recurrenceFields.byMonthDay) || (recurrenceFields.freqPattern=="The" && startDate.getDate()>this.getFrequencyDate(startDate,recurrenceFields)) && this.getMonthQuaterSequence(startDate)==recurrenceFields.interval))
            {
                let validRangeDate = new Date(startDate.getFullYear(),startDate.getMonth()+(3-this.getMonthQuaterSequence(startDate))+recurrenceFields.interval,1);

                return this.getDateWithoutTime(validRangeDate.setDate(this.getDateNumber(recurrenceFields,validRangeDate)));
            }

            else
            {
                let validRangeDate = new Date(startDate.getFullYear(),startDate.getMonth()+(recurrenceFields.interval-this.getMonthQuaterSequence(startDate)),1);
                
                return this.getDateWithoutTime(validRangeDate.setDate(this.getDateNumber(recurrenceFields,validRangeDate)));
            }
        }

        else if(recurrenceFields.frequency=="HalfYearly")
        {
            if(this.getMonthHalfYearlySequence(startDate)>recurrenceFields.interval || (((recurrenceFields.freqPattern=="Day" && startDate.getDate()>recurrenceFields.byMonthDay) || (recurrenceFields.freqPattern=="The" && startDate.getDate()>this.getFrequencyDate(startDate,recurrenceFields))) && this.getMonthHalfYearlySequence(startDate)==recurrenceFields.interval))
            {
                let validRangeDate = new Date(startDate.getFullYear(),((startDate.getMonth())+(6-this.getMonthHalfYearlySequence(startDate))+recurrenceFields.interval),1);

                return this.getDateWithoutTime(validRangeDate.setDate(this.getDateNumber(recurrenceFields,validRangeDate)));
            }

            else
            {
                let validRangeDate = new Date(startDate.getFullYear(),(startDate.getMonth())+(recurrenceFields.interval-this.getMonthHalfYearlySequence(startDate)),1);
                
                return this.getDateWithoutTime(validRangeDate.setDate(this.getDateNumber(recurrenceFields,validRangeDate)));
            }
        }

        else if(recurrenceFields.frequency=="Yearly")
        {
            if(startDate.getMonth()+1>recurrenceFields.interval || ((recurrenceFields.freqPattern=="Day" && startDate.getDate()>recurrenceFields.byMonthDay) || (recurrenceFields.freqPattern=="The" && startDate.getDate()>this.getFrequencyDate(startDate,recurrenceFields))) && (startDate.getMonth()+1==recurrenceFields.interval))
            {
                let validRangeDate = new Date(startDate.getFullYear()+1,recurrenceFields.interval-1,1);
                
                return this.getDateWithoutTime(validRangeDate.setDate(this.getDateNumber(recurrenceFields,validRangeDate)));
            }

            else
            {
                let validRangeDate = new Date(startDate.getFullYear(),recurrenceFields.interval-1,1);
                
                return this.getDateWithoutTime(validRangeDate.setDate(this.getDateNumber(recurrenceFields,validRangeDate)));
            }
        }

        else
        {
            return startDate;
        }
    }

    public getDateNumber(recurrenceFields:RecurrenceFields,date:Date)
    {
        if(recurrenceFields.freqPattern=="Day")
        {
            return this.GetMonthDays(date)<recurrenceFields.byMonthDay?this.GetMonthDays(date):recurrenceFields.byMonthDay;
        }
        else
        {
            return this.getFrequencyDate(date,recurrenceFields);
        }
    }

    public GetMonthDays(date:Date) {
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return new Date(year, month, 0).getDate();
    }

    public getDateWithoutTime(time:number)
    {
        return new Date(new Date(time).setHours(0,0,0,0));
    }

    public getMonthQuater(date:Date)
    {
        var quater = [1,2,3,4];
        return quater[Math.floor(date.getMonth() / 3)];
    }

    public getMonthQuaterSequence(date:Date)
    {
        var quaterSequence = {1:[0,1,2],2:[3,4,5],3:[6,7,8],4:[9,10,11]};
        return quaterSequence[Math.floor((date.getMonth()) / 3)+1].indexOf(date.getMonth())+1;
    }

    public getMonthHalfYearlySequence(date:Date)
    {
        var halfyearlySequence = {1:[0,1,2,3,4,5],2:[6,7,8,9,10,11]};
        return halfyearlySequence[Math.floor((date.getMonth()) / 6)+1].indexOf(date.getMonth())+1;
    }

    public getFrequencyDate(date:Date,recurrenceFields:RecurrenceFields)
    {
        let pos = recurrenceFields.bySetPos;
        let day = recurrenceFields.byDay;

        switch(day)
        {
            case 1:
                return this.getDay(pos,date); // return day
            case 2:
                return this.getWeekDate(pos,date,[1,2,3,4,5]); // return weekday
            case 3:
                return this.getWeekDate(pos,date,[0,6]); // return weekend day
            default:
                return this.getWeekDate(pos,date,[day-4]); // return week date
        }
    }

    public getDay(position:number,date:Date)
    {
        if(position<5)
        {
            return position;
        }

        else
        {
            return this.GetMonthDays(date);
        }
    }

    public getWeekDate(position:number,date:Date,weekArray:number[])
    {
        let weekDaysCount = 0;
        if(position<5)
        {
            let monthStartDate = new Date(new Date(date.toString()).setDate(1));

            while(weekDaysCount!=position)
            {
                if(weekArray.indexOf(monthStartDate.getDay())>-1)
                {
                    weekDaysCount++;
                }
                monthStartDate.setDate(monthStartDate.getDate() + 1);
            }

            return monthStartDate.getDate()-1;

        }

        else
        {
            let monthEndDate = new Date(date.getFullYear(), date.getMonth()+1, 0);

            while(weekDaysCount!=1)
            {
                if(weekArray.indexOf(monthEndDate.getDay())>-1)
                {
                    weekDaysCount++;
                }
                monthEndDate.setDate(monthEndDate.getDate() - 1);
            }

            return monthEndDate.getDate()+1;
        }
    }

    public getInterval(date:Date,frequency:string)
    {
        if(frequency=="Monthly")
        {
            return 1;
        }
        else if(frequency=="Quaterly")
        {
            return this.getMonthQuaterSequence(date);
        }
        else if(frequency=="HalfYearly")
        {
            return this.getMonthHalfYearlySequence(date);
        }
        else if(frequency=="Yearly")
        {
            return date.getMonth()+1;
        }
    }

    public frequencyPatternCheck(recurrenceFields:RecurrenceFields)
    {
        if((recurrenceFields.freqPattern=="Day" && recurrenceFields.byMonthDay==-1) || (recurrenceFields.freqPattern=="The" && (recurrenceFields.bySetPos==-1 || recurrenceFields.byDay==-1)) || recurrenceFields.interval==-1)
        {
            return {true:"The recurrence pattern is not valid."};
        }

        else if((recurrenceFields.frequencyRange=="EndBy" && recurrenceFields.endDate==null) || (recurrenceFields.frequencyRange=="EndAfter" && recurrenceFields.occurrence==-1))
        {
            return {true:"The recurrence pattern is not valid."};
        }

        else if(recurrenceFields.frequency=="Yearly" && recurrenceFields.freqPattern=="Day" && this.GetMonthDays(new Date(recurrenceFields.startDate.getFullYear(),recurrenceFields.interval-1,1))<recurrenceFields.byMonthDay)
        {
            return {true:"The recurrence pattern is not valid."};
        }

        else
        {
            return {false:""};
        }
    }

    public warningsCheck(recurrenceFields:RecurrenceFields)
    {
        if(recurrenceFields.frequency!="Yearly" && recurrenceFields.byMonthDay>28)
        {
            return {true:"Some months have fewer than "+recurrenceFields.byMonthDay+ " days. For these months, the occurrence will fall on the last day of the month."};
        }

        else
        {
            return {false:""};
        }
    }

    public getWeekDayNumber(date:Date)
    {
        return date.getDay()+4;
    }

    public getPosIndex(date:Date)
    {
        let firstDayOfMonth = new Date(date.getFullYear(),date.getMonth(),1);

        let dateDay = new Date().getDay();

        let posCounter = 0;

        while(firstDayOfMonth<=date)
        {
            if(firstDayOfMonth.getDay()==dateDay)
            {
                posCounter++;
            }

            firstDayOfMonth = new Date(firstDayOfMonth.getFullYear(),firstDayOfMonth.getMonth(),firstDayOfMonth.getDate()+1);
        }

        return posCounter>4?5:posCounter;
    }

    public getRecurrenceMsg(recurrenceFields:RecurrenceFields)
    {
        let recurrenceMsg = "Due "+ recurrenceFields.freqPattern.toLowerCase()+" ";

        if(recurrenceFields.freqPattern=="Day")
        {
            recurrenceMsg+=recurrenceFields.byMonthDay+" of every ";
        }
        
        else if(recurrenceFields.freqPattern=="The")
        {
            recurrenceMsg+=Const.posOptions.filter(posVal=>{return posVal.key==recurrenceFields.bySetPos;})[0]["text"].toLowerCase() + " " + Const.dayOptions.filter(dayVal=>{return dayVal.key==recurrenceFields.byDay;})[0]["text"] + " of every ";
        }

        if(recurrenceFields.frequency=="Monthly")
        {
            recurrenceMsg+=recurrenceFields.interval + " " + Const.intervalText[recurrenceFields.frequency];
        }

        else if(recurrenceFields.frequency=="Quaterly")
        {
            recurrenceMsg+=Const.quaterlyInterval.filter(interval=>{return interval.key==recurrenceFields.interval;})[0]["text"].toLowerCase() + " " + Const.intervalText[recurrenceFields.frequency];
        }

        else if(recurrenceFields.frequency=="HalfYearly")
        {
            recurrenceMsg+=Const.halfYearlyInterval.filter(interval=>{return interval.key==recurrenceFields.interval;})[0]["text"].toLowerCase() + " " + Const.intervalText[recurrenceFields.frequency];
        }

        else if(recurrenceFields.frequency=="Yearly")
        {
            recurrenceMsg+=Const.months.filter(interval=>{return interval.key==recurrenceFields.interval;})[0]["text"];
        }

        recurrenceMsg+=" effective " + recurrenceFields.startDate.toDateString();
        
        if(recurrenceFields.frequencyRange!="NoEndDate")
        {
            recurrenceMsg+=" until "+recurrenceFields.endDate.toDateString();
        }

        return recurrenceMsg+".";

    }
}