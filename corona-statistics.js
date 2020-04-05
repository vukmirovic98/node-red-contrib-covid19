/**
 * Copyright 2020 Nemanja Vukmirovic
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
module.exports = function(RED) {
    const fetch = require('node-fetch');
    function COVID19(config) {
        RED.nodes.createNode(this,config);
        var cases          =config.infected;
        var deaths                  =config.deaths;
        var recovered               =config.recovered;
        var active                  =config.active;
        var critical                =config.critical;
        var today                   =config.todaycases;
        var deaths_today            =config.todaydeaths;
        var casepermilion           =config.casepermilion;
        var deathspermilion         =config.deathspermilion;
      
        this. url                     ="http://corona.lmao.ninja/countries/";
        this.regionListValue         =null;
        this.isrequesting            =false;
        var node                     = this;

        node.status({ });
        
        function sleep (time) {
            return new Promise((resolve) => setTimeout(resolve, time));
          }


    if (node.cases == false && node.deaths==false && node.recovered==false && node.active ==false && node.critical==false && node.today==false && node.deaths_today==false && node.casepermilion==false && node.deathspermilion==false){        
        node.error("At least one or more checkbox must be checked!");
        node.status({fill:"red",shape:"dot",text:"error"});      
     
    }
    else {
      
    }
    try { node.regionListValue = RED.util.evaluateNodeProperty(config.regionList, config.regionListType, node)}

    catch(exc) {
        node.error("Node failed due to bad JSON format.[" + exc + "]");
        node.status({fill:"red",shape:"dot",text:"error"});
        node.status({fill:"red",shape:"dot",text:"error"});
        sleep(5000).then(() => {
            node.status({ });
        });

    }


    node.on('input', function(msg, send, done) {   
       
          
     
            node.status({fill:"blue",shape:"dot",text:"Requesting"});
            fetch(node.url, { method: 'GET'   } ).then( function(res) {  if (res.ok) {
                res.json().then( function(result) {
                    result.status = res.status;
                result.statusText = res.statusText
                
            node.status({fill:"blue",shape:"dot",text:"Parsing JSON."});
            for (var i = 0; i < node.regionListValue.length; i++) { 
                var index = result.map(function (cc) { return cc.countryInfo.iso2; }).indexOf(node.regionListValue[i]);      
    
                    RED.util.setMessageProperty(msg,'covid.' + [result[index].countryInfo.iso2] + '.countryinfo.country', result[index].country, true);
                    RED.util.setMessageProperty(msg,'covid.' + [result[index].countryInfo.iso2] + '.countryinfo.iso', result[index].countryInfo.iso2, true);
                    RED.util.setMessageProperty(msg,'covid.' + [result[index].countryInfo.iso2] + '.countryinfo.iso2', result[index].countryInfo.iso3, true);
                    RED.util.setMessageProperty(msg,'covid.' + [result[index].countryInfo.iso2] + '.countryinfo.flagurl', result[index].countryInfo.flag, true);     
                    if (cases){ RED.util.setMessageProperty(msg,'covid.' + [result[index].countryInfo.iso2] + '.cases', result[index].cases, true);}
                    if (deaths){RED.util.setMessageProperty(msg, 'covid.' +[result[index].countryInfo.iso2] +'.deaths', result[index].deaths, true);}
                    if (recovered)  {RED.util.setMessageProperty(msg,'covid.' + [result[index].countryInfo.iso2] +'.recovered', result[index].recovered, true);}                   
                    if (active)  {RED.util.setMessageProperty(msg, 'covid.' + [result[index].countryInfo.iso2] +'.active', result[index].active, true);}
                    if (critical)  {RED.util.setMessageProperty(msg,'covid.' + [result[index].countryInfo.iso2] +'.critical', result[index].critical, true);}
                    if (today)  {RED.util.setMessageProperty(msg, 'covid.' +[result[index].countryInfo.iso2] +'.todaycases', result[index].todayCases, true);}
                    if (deaths_today)  {RED.util.setMessageProperty(msg,'covid.' + [result[index].countryInfo.iso2] +'.todaydeaths', result[index].todayDeaths, true);}
                    if (casepermilion)  {RED.util.setMessageProperty(msg,'covid.' + [result[index].countryInfo.iso2] +'.casemilion', result[index].casesPerOneMillion, true);}
                    if (deathspermilion)  {RED.util.setMessageProperty(msg, 'covid.' +[result[index].countryInfo.iso2] +'.deathsmilion', result[index].deathsPerOneMillion, true);}
                    RED.util.setMessageProperty(msg,'covid.' + [result[index].countryInfo.iso2] + '.countryinfo.location.lat', result[index].countryInfo.lat, true);
                    RED.util.setMessageProperty(msg,'covid.' + [result[index].countryInfo.iso2] + '.countryinfo.location.long', result[index].countryInfo.long, true);
                    node.status({fill:"blue",shape:"dot",text:"Parsing JSON."});
        
        }  
            if (RED.util.getMessageProperty(msg, 'covid') != null){
                node.send(msg) 
                node.status({fill:"green",shape:"dot",text:"Done!"});  
                sleep(5000).then(() => {
                    node.status({ });
                });}
                

        })
    }
        else {node.error ('Error getting the response.')}   
        
        node.status({fill:"red",shape:"dot",text:"error"});
        sleep(5000).then(() => {
            node.status({ });
        });
    })

        })
 } 
RED.nodes.registerType("country statistics",COVID19);
}
