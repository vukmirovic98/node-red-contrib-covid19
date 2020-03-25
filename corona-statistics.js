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
        this.cases          =config.infected;
        this.deaths                  =config.deaths;
        this.recovered               =config.recovered;
        this.active                  =config.active;
        this.critical                =config.critical;
        this.today                   =config.todaycases;
        this.deaths_today            =config.todaydeaths;
        this.casepermilion           =config.casepermilion;
        this.deathspermilion         =config.deathspermilion;
        this.separateMsg             = config.separateMsg;
        this.url                     ="http://corona.lmao.ninja/countries/";
        this.regionListValue         =null;
        this.isrequesting            =false;
        var node = this;
        node.status({ });
        var result;
        function request() {
            node.status({fill:"Blue",shape:"dot",text:"Requesting"});
            fetch(node.url, { method: 'GET'   } ).then( function(res) {  if (res.ok) {
                res.json().then( function(resultAsJson) {
                    resultAsJson.status = res.status;
                    resultAsJson.statusText = res.statusText
                    result = resultAsJson
                    node.status({ });
                    return result;
                       
                 })
            }
            else {node.error ('Error getting the response.')}   
            })
        }
    request()
    if (node.infected_count == false && node.deaths==false && node.recovered==false && node.active ==false && node.critical==false && node.today==false && node.deaths_today==false && node.casepermilion==false){        
        node.error("At least one or more checkbox must be checked!");
        node.status({fill:"red",shape:"dot",text:"error"});      
    }
    try { node.regionListValue = RED.util.evaluateNodeProperty(config.regionList, config.regionListType, node);}
    catch(exc) {
        node.error("Node failed due to bad JSON format.[" + exc + "]");
        node.status({fill:"red",shape:"dot",text:"error"});
    }

    node.on('input', function(msg, send, done) {   
        node.status({fill:"blue",shape:"dot",text:"Requesting"});
        fetch(node.url, { method: 'GET'   } ).then( function(res) {  if (res.ok) {
            res.json().then( function(resultAsJson) {
                resultAsJson.status = res.status;
                resultAsJson.statusText = res.statusText
                result = resultAsJson
               })
        }
            else {node.error ('Error getting the response.')}   
        })
        request()
        node.status({fill:"blue",shape:"dot",text:"Parsing JSON."});
        for (var i = 0; i < node.regionListValue.length; i++) { 
            var index = result.map(function (cc) { return cc.countryInfo.iso2; }).indexOf(node.regionListValue[i]);      
            try{
                RED.util.setMessageProperty(msg,'covid-19.' + [result[index].countryInfo.iso2] + '.countryinfo.country', result[index].country, true);
                RED.util.setMessageProperty(msg,'covid-19.' + [result[index].countryInfo.iso2] + '.countryinfo.iso', result[index].countryInfo.iso2, true);
                RED.util.setMessageProperty(msg,'covid-19.' + [result[index].countryInfo.iso2] + '.countryinfo.iso2', result[index].countryInfo.iso3, true);
                RED.util.setMessageProperty(msg,'covid-19.' + [result[index].countryInfo.iso2] + '.countryinfo.flagurl', result[index].countryInfo.flag, true);     
                if (this.cases){ RED.util.setMessageProperty(msg,'covid-19.' + [result[index].countryInfo.iso2] + '.cases', result[index].cases, true);}
                if (this.deaths){RED.util.setMessageProperty(msg, 'covid-19.' +[result[index].countryInfo.iso2] +'.deaths', result[index].deaths, true);}
                if (this.recovered)  {RED.util.setMessageProperty(msg,'covid-19.' + [result[index].countryInfo.iso2] +'.recovered', result[index].recovered, true);}                    if (this.active)  {RED.util.setMessageProperty(msg, 'covid-19.' + [result[index].countryInfo.iso2] +'.active', result[index].active, true);}
                if (this.critical)  {RED.util.setMessageProperty(msg,'covid-19.' + [result[index].countryInfo.iso2] +'.critical', result[index].critical, true);}
                if (this.today)  {RED.util.setMessageProperty(msg, 'covid-19.' +[result[index].countryInfo.iso2] +'.todaycases', result[index].todayCases, true);}
                if (this.deaths_today)  {RED.util.setMessageProperty(msg,'covid-19.' + [result[index].countryInfo.iso2] +'.todaydeaths', result[index].todayDeaths, true);}
                if (this.casepermilion)  {RED.util.setMessageProperty(msg,'covid-19.' + [result[index].countryInfo.iso2] +'.casemilion', result[index].casesPerOneMillion, true);}
                if (this.deathspermilion)  {RED.util.setMessageProperty(msg, 'covid-19.' +[result[index].countryInfo.iso2] +'.deathsmilion', result[index].deathsPerOneMillion, true);}
                RED.util.setMessageProperty(msg,'covid-19.' + [result[index].countryInfo.iso2] + '.countryinfo.location.lat', result[index].countryInfo.lat, true);
                RED.util.setMessageProperty(msg,'covid-19.' + [result[index].countryInfo.iso2] + '.countryinfo.location.long', result[index].countryInfo.long, true);
            }
            catch(exc){
                node.error("Please check countries list and try again.[" + exc + "]");}
        }    
        if (RED.util.getMessageProperty(msg, 'covid-19') != null){
            node.send(msg) }
        });
 } 
RED.nodes.registerType("COVID-19",COVID19);
}
