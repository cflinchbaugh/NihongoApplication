	//Declare Model
	var Card = Backbone.Model.extend({
		defaults: {
	    	romanji: 'Default Romanji',
	    	image: ''
		},

		initialize: function(){
		}
	});

		var rom = [];
			rom["Numbers"] = [];
			rom["Hiragana"] = [];
			rom["Katakana"] = [];
			rom["Phrases"] = [];
			
		//Declare Collection
		CardCollection = Backbone.Collection.extend({
			model: Card,
			initialize: function(models, options){
				_.extend(this, _.pick(options, "id"));
						
				// returning this ajax call makes a "Promise";
				// if multiple calls were made, set the ajax requests to variables and work with them instead of a direct return		
				return $.ajax({
					//Pull data from XC, pass in "options.id" to grab the correct XC collection per Backbone Collection
					url: "http://www.cflinchbaugh-trinity.com/Nihongo/Nihongo" + options.id + "?format=JSONP&callback=?",
					dataType: "jsonp"
				})
					.success(function(response){
						//Each time a new collection is made, create all the cards by looping over the XC content and pull the arguments
						for (i = 0; i < response["CONTENTS"].length; i++){
							createCards(options.id, i, response["CONTENTS"][i]["romanji"]["VALUE"], response["CONTENTS"][i]["image"]["URL"]);
						}

						//After all the cards are created, put them into a single collection as determined by their options.id value
						populateCollection(options.id);
						console.log("Finished");
					});
			},

			shuffleCollection: function(){
				this.reset(this.shuffle(), {silent:true});
				return this;
			},

			getRomanji: function(){
				return this.romanji;
			}
		});

		function createCards(deck, i, rom, img){
			this.rom[deck.toString()][i] = new Card({romanji: rom, image: "http://www.cflinchbaugh-trinity.com" + img});
		}
		
		//TODO: Moving to View, delete these later when that works
		// numbers = new CardCollection([], {id: "Numbers"});	
		// hiragana = new CardCollection([], {id: "Hiragana"});
		// katakana = new CardCollection([], {id: "Katakana"});
		// phrases = new CardCollection([], {id: "Phrases"});

		// $('#renderHere').css('display', 'block');

		function populateCollection(deck){
			console.log(rom[deck].length);
			if (deck === "Numbers"){
				for (i = 0; i < rom[deck].length; i++){
					numbers.add(rom[deck][i]);
				}
			}

			else if (deck === "Hiragana"){
				for (i = 0; i < rom[deck].length; i++){
					hiragana.add(rom[deck][i]);
				}	
			}

			else if (deck === "Katakana"){
				for (i = 0; i < rom[deck].length; i++){
					katakana.add(rom[deck][i]);
				}	
			}

			else if (deck === "Phrases"){
				for (i = 0; i < rom[deck].length; i++){
					phrases.add(rom[deck][i]);
				}	
			}
		}

	//Debugging only
	function viewCollectionContent(string, collection){
		console.log(string + " " + JSON.stringify(collection.toJSON()));
	}





	