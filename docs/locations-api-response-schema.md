## Film locations API request/response specification

--------

### <a name="autocomplete-suggestions"></a> Autocomplete search
The API will perform a textual search of movies and locations returning whole or partial matches of `query`.

##### Request
- Endpoint: `search/autocomplete`

- Required Parameters
  - `query` - The text to match in the search.


##### Response
* Schema:

  ```json
  {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Autocomplete suggestions results",
    "type": "object",
    "properties": {
      "suggestions": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "location": {
              "type": "string"
            }
          },
          "required": [
            "title",
            "location"
          ]
        }
      }
    },
    "required": [
      "suggestions"
    ]
  }
  ```

--------

### <a name="locations-search"></a> Locations search
The API will perform a textual search of movie titles returning whole matches of `query`. Search is to be performed in a case and diacritic insensitive manner.


##### Request
- Endpoint: `search`

- Required Parameters
  - `query` - The movie title.


##### Response
* Schema:

  ```json
  {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Locations search results",
    "type": "object",
    "properties": {
      "results": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "release_year": {
              "type": "string"
            },
            "location": {
              "type": "string"
            },
            "facts": {
              "type": "string"
            },
            "production_company": {
              "type": "string"
            },
            "distributor": {
              "type": "string"
            },
            "director": {
              "type": "string"
            },
            "writer": {
              "type": "string"
            },
            "actor_1": {
              "type": "string"
            },
            "actor_2": {
              "type": "string"
            },
            "actor_3": {
              "type": "string"
            },
            "misc": {
              "type": "string"
            },
            "geocode_information": {
              "type": "object",
              "properties": {
                "latitude": {
                  "type": "string"
                },
                "longitude": {
                  "type": "string"
                }
              }
            }
          },
          "required": [
            "id",
            "title",
            "release_year",
            "location",
            "facts",
            "production_company",
            "distributor",
            "director",
            "writer",
            "actor_1",
            "actor_2",
            "actor_3",
            "misc",
            "geocode_information"
          ]
        }
      }
    },
    "required": [
      "results"
    ]
  }
  ```
