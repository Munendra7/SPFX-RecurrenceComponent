# SPFX Recurrence Component

## Summary

This Solution allows you to use Outlook's recurrence like functionality in SharePoint using SPFX.

## Features

1. This control will have a button which will open a recurrence popup.

![image](https://user-images.githubusercontent.com/89851958/152210682-24685c17-bab3-4163-9bdb-4d8aa2dccd7f.png)

![image](https://user-images.githubusercontent.com/89851958/152210912-2c4175ac-d446-4d07-a9c0-df8ce1d1a4e5.png)

2. Based on your choice you can select the recurrence Pattern and it will automatically select and show the pattern for the startdate which is selected.
For Example:- Start Date is 2nd Feb 2022 and you have selected Quaterly as your recurrence pattern, it will automatically set it to the First Wednesday of every Second Month of Quater(Feb is Second month of quater).

![image](https://user-images.githubusercontent.com/89851958/152211668-3b292f1c-db79-46a7-9f5b-aea4daacf5b2.png)

3. Based on your end date it will automatically calculate the onumber of ocurrence of task or if you have selected Number of Ocurrences as end date it will automatically calculate the end date of the recurring task after saving.

![image](https://user-images.githubusercontent.com/89851958/152212092-3de137fb-dbc4-43ac-b74e-cbd2b0dd5c4b.png)

4. After saving it will show the pattern which is selected below the button.

![image](https://user-images.githubusercontent.com/89851958/152212183-fc24fb4d-4828-4914-a401-6e6210a58f07.png)


You can customize it as per your requirement and modify the logics of the calculations as well.

If you want to save the recurrence pattern in sharepoint, I will suggest you to save it in json format and Parse it to show the values back on the recurrence control.

## Used SharePoint Framework Version

Supported node version :- v14.17.0
![version](https://img.shields.io/npm/v/@microsoft/sp-component-base/latest?color=green)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Version history

Version|Date|Comments
-------|----|--------
1.0|February 2, 2022|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
`git clone "https://github.com/Munendra7/SPFX-RecurrenceComponent.git"`
- Ensure that you are at the solution folder
- in the command-line run:
  `npm install`
  `gulp serve`


## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
