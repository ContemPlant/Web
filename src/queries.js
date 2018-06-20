

// login queries

	function loginQuery(email, pass) { return `mutation {
                                login(
                                      email: ` + `"` + email + `"` + `
                                      password: ` + `"` + pass + `"` + `
                                      ){user{username,id,email},token}}`;
                         			}


// Plant queries
	
	// Get list of user plants
	function plantQuery() { return `query {
 									plants {
   											id
   											name
   											temperature_opt
   											humidity_opt
   											radiation_opt
   											loudness_opt
   											plantStates(last: 1) {
     											                  health
     															  environment
     														      size
   																 }
    										}
									}`;
						}

	// Mutation to create a user plant 
	function createPlant(plantName, tempOpt, humOpt, radOpt, loudOpt)  {return `mutation {
                    																		createPlant(input:{
                    																							name: "` + plantName + `"

                    																							temperature_opt:` + tempOpt + `

                    																							temperature_weight:1

                    																							humidity_opt: ` + humOpt + `

                    																							humidity_weight: 1

                    																							radiation_opt: ` + radOpt + `

                   												 												radiation_weight: 1

                    																							loudness_opt: `+ loudOpt + `

                    																							loudness_weight: 1
                    																							}) {
                        																							id
                    																								}
               	 																		}`;
               	 														}

  // Query to get the last plant data 
  function updatePlantData(plantId)  {return `query {
  												plant(id: "${plantId}"){
    																	plantStates(last: 1) {
      																							environment
      																							size
      																							health
      																							sensorDates {
        																										timeStamp
        																										temperatureValue
       																										 	humidityValue
        																										radiationValue
        																										loudnessValue
        																									}
     																						 }
  																		}
												}`;
									}

// Ardu queries

	// load plant on ardu
	function loadOnArdu (arduId, plantId) {return `mutation {
                												loadPlantOnArdu(
                																arduId: ` + `"` + arduId + `"` + `
                																plantId: ` + `"` + plantId + `"` + `
                																){arduId}}`;									
                						}

export {
    loginQuery,
    plantQuery,
    createPlant,
    updatePlantData,
    loadOnArdu
    
}