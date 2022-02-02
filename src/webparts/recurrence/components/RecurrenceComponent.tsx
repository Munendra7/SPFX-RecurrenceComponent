import * as React from 'react';
import { IRecurrenceComponentProps, IRecurrenceComponentStates } from '../Models/IRecurrenceComponent';
import { PrimaryButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Modal, DatePicker } from 'office-ui-fabric-react';
import * as Const from '../Models/Constants';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import styles from './RecurrenceComponent.module.scss';

import { RecurrenceFields } from '../Models/RecurrenceFields';

import Calculation from '../DataServices/Calculations';

import "./Recurrence.css";

import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

export default class RecurrenceComponent extends React.Component<IRecurrenceComponentProps, IRecurrenceComponentStates> {
  
  public savedRecurrenceValues: RecurrenceFields;

  public calculationObj: Calculation;

  public constructor(props)
  {
    super(props);

    this.state={
        showRecurrencePopup:false,
        recurrenceFields: new RecurrenceFields(),
        showAlert:false,
        showWarning:false,
        msgAlertWarning:"",
        recurrenceMsg: "",
        isSaved: false
    };

    this.savedRecurrenceValues = new RecurrenceFields();
    this.calculationObj = new Calculation();
  }

  public render(): React.ReactElement<IRecurrenceComponentProps> {
    return (
      <>
      <PrimaryButton text="Recurrence" onClick={()=>{this.setState({showRecurrencePopup:!this.state.showRecurrencePopup});}} allowDisabledFocus iconProps={{ iconName: 'SyncOccurence' }} />
       {this.state.isSaved?<><br /><div className={styles.recurrenceMSG}><IconButton
            styles={Const.iconButtonStyles}
            iconProps={{ iconName: 'Info' }}
          /><p className="RecurrenceText">{this.state.recurrenceMsg}</p></div></>:<></>}
       <Modal
        titleAriaId="TaskRecurrence"
        isOpen={this.state.showRecurrencePopup}
        onDismiss={()=>{this.onDismiss();}}
        isBlocking={true}
        containerClassName={Const.contentStyles.container + " " +styles.recurrencePopupContainer}
        >

        <div className={Const.contentStyles.header}>
          <span>Task Recurrence</span>
          <IconButton
            styles={Const.iconButtonStyles}
            iconProps={{ iconName: 'Cancel' }}
            ariaLabel="Close"
            onClick={()=>{this.onDismiss();}}
          />
        </div>
        <div className={Const.contentStyles.body}>
            <div className={styles.frequencyPatternRow + " row"}>
              <p>Recurrence Pattern</p>
                
                <div className={styles.frequencyCol + " col-md-2"}>
                    <ChoiceGroup className="recurrenceChoiceField" selectedKey={this.state.recurrenceFields.frequency} options={Const.frequencyOptions} 
                      onChange={(e,option)=>
                      {
                        this.setState({
                          recurrenceFields:{
                            ...this.state.recurrenceFields,
                            frequency:option.key,
                            frequencyRange:Const.frequencyDefaults[option.key].frequencyRange,
                            freqPattern:Const.frequencyDefaults[option.key].freqPattern,
                            byMonthDay:this.state.recurrenceFields.startDate.getDate(),
                            byDay:Const.frequencyDefaults[option.key].byDay,
                            bySetPos:Const.frequencyDefaults[option.key].bySetPos,
                            interval:this.calculationObj.getInterval(this.state.recurrenceFields.startDate,option.key),
                            occurrence:Const.frequencyDefaults[option.key].occurrence,
                          }
                        },()=>{
                          this.setRecurrenceFieldState("endDate",this.calculationObj.getEndDate(this.state.recurrenceFields));
                        });
                      }
                      }/>
                </div>

                <div className="col-md-10">
                  <div className="row">
                    <div className="col-md-1">
                      <ChoiceGroup className="recurrenceChoiceField" options={Const.frequencyPatternOptions}
                        onChange={(e,option)=>
                          {
                            this.setState({
                              recurrenceFields:{
                                ...this.state.recurrenceFields,
                                freqPattern:option.key,
                                byMonthDay:option.key=="Day"?this.state.recurrenceFields.startDate.getDate():-1,
                                byDay:option.key=="The"?this.calculationObj.getWeekDayNumber(this.state.recurrenceFields.startDate):-1,
                                bySetPos:option.key=="The"?this.calculationObj.getPosIndex(this.state.recurrenceFields.startDate):-1,
                                interval:this.calculationObj.getInterval(this.state.recurrenceFields.startDate,this.state.recurrenceFields.frequency)
                              }
                            });
                          }
                        }
                        selectedKey={this.state.recurrenceFields.freqPattern}
                      />
                    </div>
                    <div className="col-md-11">
                      <div className={styles.frequencyPatternRowControls + " row"}>
                        <div className="col-md-2">
                          <TextField disabled={this.state.recurrenceFields.freqPattern=="The"}
                            value={this.state.recurrenceFields.byMonthDay==-1 ?"":this.state.recurrenceFields.byMonthDay.toString()}
                            onChange={(e,value)=>{
                              this.setRecurrenceFieldState("byMonthDay",(value!="" && !isNaN(Number(value)) && Number(value)<32 && Number(value)>0)?Number(value):-1);
                              }
                            }
                          />
                        </div>
                        <div className="col-md-1">of every</div>
                        
                        {this.state.recurrenceFields.frequency=="Monthly"?
                          <div className="col-md-2"><TextField disabled={this.state.recurrenceFields.freqPattern=="The"}
                          value={this.state.recurrenceFields.interval==-1 || this.state.recurrenceFields.freqPattern=="The"?"":this.state.recurrenceFields.interval.toString()}
                          onChange={(e,value)=>{
                            this.setRecurrenceFieldState("interval",(value!="" && !isNaN(Number(value)) && Number(value)<100 && Number(value)>0)?Number(value):-1);
                            }
                          }
                          /></div>:
                          <div className="col-md-3"><Dropdown
                            selectedKey={this.state.recurrenceFields.freqPattern=="The"?-1:this.state.recurrenceFields.interval.toString()}
                            options={this.state.recurrenceFields.frequency=="Quaterly"?Const.quaterlyInterval:this.state.recurrenceFields.frequency=="Yearly"?Const.months:Const.halfYearlyInterval}
                            disabled={this.state.recurrenceFields.freqPattern=="The"}
                            onChange={
                              (e,value)=>{
                                this.setRecurrenceFieldState("interval",Number(value.key));
                              }
                            }
                          /></div>
                        }
                        
                        <div className="col-md-5">{Const.intervalText[this.state.recurrenceFields.frequency]}</div>
                      </div>

                      <div className={styles.frequencyPatternRowControls + " row"}>
                        <div className="col-md-3">
                        <Dropdown
                          selectedKey={this.state.recurrenceFields.bySetPos.toString()}
                          options={Const.posOptions}
                          disabled={this.state.recurrenceFields.freqPattern=="Day"}
                          onChange={
                            (e,value)=>{
                              this.setRecurrenceFieldState("bySetPos",Number(value.key));
                            }
                          }
                        />
                        </div>

                        <div className="col-md-3">
                        <Dropdown
                          selectedKey={this.state.recurrenceFields.byDay.toString()}
                          options={Const.dayOptions}
                          disabled={this.state.recurrenceFields.freqPattern=="Day"}
                          onChange={
                            (e,value)=>{
                              this.setRecurrenceFieldState("byDay",Number(value.key));
                            }
                          }
                        />
                        </div>
                        <div className="col-md-1">of every</div>
                        
                        {this.state.recurrenceFields.frequency=="Monthly"?
                          <div className="col-md-2"><TextField disabled={this.state.recurrenceFields.freqPattern=="Day"}
                          value={this.state.recurrenceFields.interval==-1 || this.state.recurrenceFields.freqPattern=="Day"?"":this.state.recurrenceFields.interval.toString()}
                          onChange={(e,value)=>{
                            this.setRecurrenceFieldState("interval",(value!="" && !isNaN(Number(value)) && Number(value)<100 && Number(value)>0)?Number(value):-1);
                            }
                          }
                          /></div>:
                          <div className="col-md-3"><Dropdown
                            selectedKey={this.state.recurrenceFields.freqPattern=="Day"?-1:this.state.recurrenceFields.interval.toString()}
                            options={this.state.recurrenceFields.frequency=="Quaterly"?Const.quaterlyInterval:this.state.recurrenceFields.frequency=="Yearly"?Const.months:Const.halfYearlyInterval}
                            disabled={this.state.recurrenceFields.freqPattern=="Day"}
                            onChange={
                              (e,value)=>{
                                this.setRecurrenceFieldState("interval",Number(value.key));
                              }
                            }
                          /></div>
                        }
                        
                        <div className="col-md-2">{Const.intervalText[this.state.recurrenceFields.frequency]}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
            </div>

            <div className={styles.rangeOfFrequencyRow + " row"}>
              <p>Range of Recurrence</p>
              <div className={styles.rangeRow + " row"}>
                <div className="col-md-1">
                  <p>Start Date:</p>
                </div>
                <div className="col-md-3">
                  <DatePicker
                    placeholder="Start Date"
                    onSelectDate={(val)=>{
                      this.setRecurrenceFieldState("startDate",val);
                      }
                    }
                    value={this.state.recurrenceFields.startDate}
                  />
                </div>
                <div className="col-md-2">
                  <ChoiceGroup className="recurrenceRangeChoiceField recurrenceChoiceField" options={Const.frequencyRange}
                    onChange={(e,option)=>
                      {
                        this.setState({
                          recurrenceFields:{
                            ...this.state.recurrenceFields,
                            frequencyRange:option.key
                          }
                        },()=>{
                          if(option.key=="EndBy")
                          {
                            this.setState({
                              recurrenceFields:{
                                ...this.state.recurrenceFields,
                                endDate:this.calculationObj.getEndDate(this.state.recurrenceFields)
                              }
                            });
                          }

                          else if(option.key=="EndAfter")
                          {
                            this.setState({
                              recurrenceFields:{
                                ...this.state.recurrenceFields,
                                occurrence:this.calculationObj.countOccurances(this.state.recurrenceFields)
                              }
                            });
                          }

                          else if(option.key=="NoEndDate")
                          {
                            this.setState({
                              recurrenceFields:{
                                ...this.state.recurrenceFields,
                                occurrence:Const.frequencyDefaults[this.state.recurrenceFields.frequency].occurrence,
                              }
                            },()=>{
                              this.setRecurrenceFieldState("endDate",this.calculationObj.getEndDate(this.state.recurrenceFields));
                            });
                          }
                        });
                      }
                    }
                    selectedKey={this.state.recurrenceFields.frequencyRange}
                  />
                </div>
                <div className="col-md-6">
                  <div className={styles.frequencyRangeRowControls + " row"}>
                    <div className="col-md-6">
                      <DatePicker
                        placeholder="End Date"
                        disabled={this.state.recurrenceFields.frequencyRange!="EndBy"}
                        onSelectDate={(val)=>{
                          this.setRecurrenceFieldState("endDate",val);
                        }}
                        value={this.state.recurrenceFields.endDate}
                        minDate={this.state.recurrenceFields.startDate}
                      />
                    </div>
                  </div>
                  <div className={styles.frequencyRangeRowControls + " row"}>
                    <div className="col-md-3">
                      <TextField 
                        disabled={this.state.recurrenceFields.frequencyRange!="EndAfter"}
                        onChange={(e,value)=>{
                          this.setRecurrenceFieldState("occurrence",(value!="" && !isNaN(Number(value)) && Number(value)<100 && Number(value)>0)?Number(value):-1);
                          }
                        }
                        value={this.state.recurrenceFields.occurrence!=-1?this.state.recurrenceFields.occurrence.toString():""}
                      />
                    </div>
                    <div className="col-md-1">occurrences</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.recurrenceActions + " row"}>
              <div className="col-md-3"></div>
              <div className="col-md-2"><PrimaryButton iconProps={{ iconName: 'Save' }} className={styles.recurrenceActionButton} text={"Save"} onClick={()=>{this.onSave();}} /></div>
              <div className="col-md-2"><PrimaryButton iconProps={{ iconName: 'Cancel' }} className={styles.recurrenceActionButton} text={"Cancel"} onClick={()=>{this.onDismiss();}} /></div>
              <div className="col-md-2"><PrimaryButton iconProps={{ iconName: 'RemoveOccurrence' }} className={styles.recurrenceActionButton} text={"Remove Recurrence"} onClick={()=>{this.onRemoveRecurrence();}} /></div>
              <div className="col-md-3"></div>
            </div>

        </div>

        </Modal>

        <Dialog
            hidden={!(this.state.showAlert || this.state.showWarning)}
            isBlocking={true}
            onDismiss={()=>this.hideDialog()}
            dialogContentProps={ {
                type: DialogType.normal,
                title: <IconButton
                  iconProps={{ iconName: 'Warning' }}
                />,
                subText: this.state.msgAlertWarning,
            }}
        >
            <DialogFooter>
              <PrimaryButton onClick={()=>{
                if(this.state.showWarning)
                {
                  this.saveRecurrence();
                }
                this.hideDialog();
              }} text="OK" />
              {this.state.showWarning?<PrimaryButton onClick={()=>{this.hideDialog();}} text="Cancel" />:<></>}
            </DialogFooter>
        </Dialog>
      </>
    );
  }

  public hideDialog()
  {
    this.setState({
      showAlert:false,
      showWarning:false,
      msgAlertWarning:""
    });
  }

  public setRecurrenceFieldState(name,value)
  {
    this.setState({
      recurrenceFields:{
        ...this.state.recurrenceFields,
        [name]: value
      }
    });
  }

  public async setRange()
  {
    this.setState({
      isSaved:true,
      recurrenceFields: {
        ...this.state.recurrenceFields,
        startDate: this.calculationObj.setStartDate(this.state.recurrenceFields),
        occurrence:this.state.recurrenceFields.frequencyRange=="NoEndDate"?Const.frequencyDefaults[this.state.recurrenceFields.frequency].occurrence:this.state.recurrenceFields.occurrence
      }
    },()=>{
        this.setState({
          recurrenceFields: {
          ...this.state.recurrenceFields,
          occurrence:this.state.recurrenceFields.frequencyRange=="EndBy"?this.calculationObj.countOccurances(this.state.recurrenceFields):this.state.recurrenceFields.occurrence,
          endDate:this.state.recurrenceFields.frequencyRange=="EndAfter" || this.state.recurrenceFields.frequencyRange=="NoEndDate"?this.calculationObj.getEndDate(this.state.recurrenceFields):this.state.recurrenceFields.endDate
        }
      },()=>{
        this.setState({
          recurrenceFields:{
            ...this.state.recurrenceFields,
            endDate:this.state.recurrenceFields.endDate<this.state.recurrenceFields.startDate?this.state.recurrenceFields.startDate:this.state.recurrenceFields.endDate,
            occurrence:this.state.recurrenceFields.occurrence==0?1:this.state.recurrenceFields.occurrence
          }
        },()=>{
          this.setState({
            recurrenceMsg:this.calculationObj.getRecurrenceMsg(this.state.recurrenceFields)
          });
        });
      });
    });
  }

  public onDismiss()
  {
      this.setState({
        showRecurrencePopup:!this.state.showRecurrencePopup,
        recurrenceFields:this.savedRecurrenceValues
      });
  }

  public onRemoveRecurrence()
  {
    this.savedRecurrenceValues = new RecurrenceFields();
    this.setState({
      recurrenceFields: new RecurrenceFields(),
      showRecurrencePopup:!this.state.showRecurrencePopup,
      isSaved:false,
      recurrenceMsg:""
    });
  }

  public onSave()
  {
    let patternCheck = this.calculationObj.frequencyPatternCheck(this.state.recurrenceFields);
    let warningsCheck = this.calculationObj.warningsCheck(this.state.recurrenceFields);

    if('true' in patternCheck)
    {
      this.setState({
        showAlert:true,
        showWarning:false,
        msgAlertWarning:patternCheck.true
      });
    }

    else if('true' in warningsCheck)
    {
      this.setState({
        showAlert:false,
        showWarning:true,
        msgAlertWarning:warningsCheck.true
      });
    }

    else
    {
      this.saveRecurrence();
    }
  }

  public saveRecurrence()
  {
    this.setState({
      showRecurrencePopup:!this.state.showRecurrencePopup
    },()=>{
      this.setRange().then(()=>{
        this.savedRecurrenceValues = this.state.recurrenceFields;
      });
    });
  }
}
