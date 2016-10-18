module.exports = {
  id : '/fatalencounters.js',
  properties : {
    person_name : {
      type : 'string'
    },
    person_age : {
      type : 'integer',
      minimum : 0,
      maximum : 120
    },
    person_gender : {
      enum : [
        'Unknown',
        'Male', 
        'Female'
      ]
    },
    person_race : {
      type : 'array',
      items : { 
        enum : [
          'Unknown',
          'African-American/Black',
          'European-American/White',
          'Hispanic/Latino',
          'Asian',
          'Race unspecified'
        ]
      }
    },
    person_img_url : {
      type : 'boolean'
    },
    death_date : {
      type : 'string',
      pattern : '' 
    },
    death_location_address : {
      type : 'string'
    },
    death_location_city : {
      type : 'string'
    },
    death_location_state : {
      type : 'string'
    },
    death_location_zip : {
      type : 'string'
    },
    death_location_county : {
      type : 'string'
    },
    death_agency : {
      type : 'string'
    },
    death_cause : {
      enum : [
        'Unknown',
        'Gunshot',
        'Stabbed',
        'Undetermined',
        'Vehicle',
        'Beaten/Bludgeoned with instrument',
        'Other'
      ]
    },
    death_description : {
      type : 'string'
    },
    death_disposition : {
      enum : [
        'Justified',
        'Homocide',
        'Other'
      ]
    },
    sources : {
      type : 'array',
      items : { 
        type : 'string'
      }
    },
    person_mentalillness : {
      type : 'boolean'
    },
    workflow_submittedby : {
      type : 'string'
    },
    workflow_status : {
      type : 'string'
    },
    death_dateanddescription : {
      type : 'string'
    },
    timestamp : {
      type : 'string'
    }
  }
}