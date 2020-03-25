# node-red-contrib-covid19
A simple node-red node to gather statistics regarding of COIVD-19 (Corona) virus cases.
## Install
Run the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install node-red-contrib-covid19
```
Note that statistics rely on [external sources](https://github.com/novelcovid/api), witch may not be 100% accurate, and may not be online 24/7.


## Node usage
This node gets a request of all of the statistics, and filter them according to node`s settings.

### Input:
Input can be any messsage, there is no need to set up anything.
### Output:
All of the nodes outputs are in ```msg.covid19```. 

Default values that are always sent to the output are:
```
msg.covid19.(countryISO).countryinfo.country        (string)
msg.covid19.(countryISO).countryinfo.iso            (string)
msg.covid19.(countryISO).countryinfo.iso2           (string)
msg.covid19.(countryISO).countryinfo.flagurl        (string)
msg.covid19.(countryISO).countryinfo.location.lat   (number)
msg.covid19.(countryISO).countryinfo.location.long  (number)
```
Other variable outputs are:
```
msg.covid19.(countryISO).cases          (number)    Cases count
msg.covid19.(countryISO).deaths         (number)    Deaths count
msg.covid19.(countryISO).recovered      (number)    Recovered count
msg.covid19.(countryISO).active         (number)    Active count
msg.covid19.(countryISO).critical       (number)    Critical count
msg.covid19.(countryISO).todaycases     (number)    Today count
msg.covid19.(countryISO).todaydeaths    (number)    Today Deaths count
msg.covid19.(countryISO).casemilion     (number)    Cases Per One Milion count
msg.covid19.(countryISO).deathsmilion   (number)    Deaths Per One Milion count 

```
All of these outputs are optional, depending if selected checkboxes are checked or not. 

## Screenshots
![Default values](https://raw.githubusercontent.com/vukmirovic98/Image-library/master/alldisabled.png?token=AMX7F63WIHDQYPQSMY7FVE26PPCTA)

This are the values that are sent everytime.


![Clasic output](https://raw.githubusercontent.com/vukmirovic98/Image-library/master/debugwindow.png?token=AMX7F642O5DGEZVN7YWCJE26PPC5Q)

This is the output of the node with all of the settigns checked for China and Italy.


![Settings page](https://raw.githubusercontent.com/vukmirovic98/Image-library/master/settingwindows.png?token=AMX7F64VCKN2J3BK7HVKE2C6PPDBS)

And these are the settings of the output above.
