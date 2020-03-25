# node-red-contrib-covid19
A simple node-red node to gather statistics regarding of COIVD-19 (Corona) virus cases.
## Install
Run the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install node-red-contrib-covid19
```
Note that statistics rely on [external sources](https://github.com/novelcovid/api), witch may not be 100% accurate, and may not be online 24/7.


## Node usage
This node gets a request of all of the statistics, and filter them according to nodes settings.
In the ```Specify countries:``` type in the iso code of the country you want to gather the statistics of the COVID-19 virus.(make sure that the iso code is uppercase). 

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

This are the values that are sent everytime.

![ ](https://user-images.githubusercontent.com/53474043/77585482-ddbd7000-6ee4-11ea-84df-409c010c0904.png)

This is the output of the node with all of the settigns checked for China and Italy.

![](https://user-images.githubusercontent.com/53474043/77585490-deee9d00-6ee4-11ea-843f-8eee3e752c85.png)

And these are the settings of the output above.

![](https://user-images.githubusercontent.com/53474043/77585491-deee9d00-6ee4-11ea-9d23-4c321b3692c4.png)

In case the Countries text box is lefted empty or haves an error you will recieve the first error when you deploy your flow, and the second error when the node recieves a message.

![](https://user-images.githubusercontent.com/53474043/77585488-de560680-6ee4-11ea-964b-cda6e73024fd.png)

In case your textbox haves an invalid country iso format you will recieve the following error.

![](https://user-images.githubusercontent.com/53474043/77585941-9e435380-6ee5-11ea-9ea4-8fb539c1d3b5.png)
