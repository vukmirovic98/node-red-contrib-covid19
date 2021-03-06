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
        var cases                   =config.infected;
        var deaths                  =config.deaths;
        var recovered               =config.recovered;
        var active                  =config.active;
        var critical                =config.critical;
        var today                   =config.todaycases;
        var deaths_today            =config.todaydeaths;
        var casepermilion           =config.casepermilion;
        var deathspermilion         =config.deathspermilion;
        this. url                     ="https://corona.lmao.ninja/v2/countries";
        var node                    = this;
        node.status({ });
        
        function sleep (time) {
            return new Promise((resolve) => setTimeout(resolve, time));
          }


    if (node.cases == false && node.deaths==false && node.recovered==false && node.active ==false && node.critical==false && node.today==false && node.deaths_today==false && node.casepermilion==false && node.deathspermilion==false){        
        node.error("At least one or more checkbox must be checked!");
        node.status({fill:"red",shape:"dot",text:"error"});      
     
    }
    node.on('input', function(msg, send, done) {   
     
            node.status({fill:"blue",shape:"dot",text:"Requesting"});

        
            fetch(node.url, { method: 'GET'   } ).then(function(res) {  
                if (res.ok) {res.json().then( function(result) {
                result.status = res.status;
            result.statusText = res.statusText 
        
        
            node.status({fill:"blue",shape:"dot",text:"Parsing JSON."});

                    RED.util.setMessageProperty(msg, 'covid.countries', result, true);
                
                    node.status({fill:"blue",shape:"dot",text:"Parsing JSON."});
        
        
        
                    if (RED.util.getMessageProperty(msg, 'covid') != undefined){
                        node.send(msg) 
                        node.status({fill:"green",shape:"dot",text:"Done!"});  
                        sleep(5000).then(() => {
                            node.status({ });
                        });}

                        else {node.error ('Error getting the response.')
         
                        node.status({fill:"red",shape:"dot",text:"error"});
                        sleep(5000).then(() => {
                            node.status({ });
                        });} 
                
                        ;
                    })}         
                } )

       
        

            
           
                

        })
 } 
RED.nodes.registerType("affected countries",COVID19);
}
