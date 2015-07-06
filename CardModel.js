	//Declare Model
	var Card = Backbone.Model.extend({
		defaults: {
	    	romanji: 'Default Romanji',
	    	image: ''
		},

		initialize: function(){
		}
	});

		//Declare Collection
		CardCollection = Backbone.Collection.extend({
			model: Card,
			initialize: function(){
				this.bindEvents();

			},
			
			bindEvents: function(){
				this.on("add", function(){
					console.log("Element added");
				});
			},

			randomIntFromInterval: function(min, max){
				return (Math.floor(Math.random()*(max-min+1)+min));
			},

			shuffleCollection: function(){
				//console.log("initial: " + JSON.stringify(this.toJSON()));
				this.reset(this.shuffle(), {silent:true});
				return this;
			},

			getRomanji: function(){
				return this.romanji;
			}
		});

//Paths
		var absolutePath = "C:\\Users\\cflinchbaugh\\Desktop\\JavaScript_Training\\Nihongo\\",
		absoluteNumbers = absolutePath + "Numbers\\",
		absoluteHiragana = absolutePath + "Hiragana\\",
		absoluteKatakana = absolutePath + "Katakana\\",

	//Numbers
		one = new Card({romanji: "ichi", image: absoluteNumbers + "1.png"}),
		two = new Card({romanji: "ni", image: absoluteNumbers + "2.png"}),
		three = new Card({romanji: "san", image: absoluteNumbers + "3.png"}),

		numbers = new CardCollection([one, two, three]);
		//viewCollectionContent("Numbers Collection: ", numbers);
		

	//Hiragana
		var e = new Card({romanji: "e", image: absoluteHiragana + "e.png"}),
			u = new Card({romanji: "u", image: absoluteHiragana + "u.png"}),
			o = new Card({romanji: "o", image: absoluteHiragana + "o.png"}),
			ku = new Card({romanji: "ku", image: absoluteHiragana + "ku.png"});
		
		//Create and Populate Collection Instance
		var hiragana = new CardCollection([]);
		hiragana.add([e,u, o, ku]);
		//viewCollectionContent("hiragana collection: ", hiragana);

	//Katakana
		var a = new Card({romanji: "a", image: absoluteKatakana + "a.png"}),
			e = new Card({romanji: "e", image: absoluteKatakana + "e.png"}),
			i = new Card({romanji: "i", image: absoluteKatakana + "i.png"}),
			o = new Card({romanji: "o", image: absoluteKatakana + "o.png"}),
			u = new Card({romanji: "u", image: absoluteKatakana + "u.png"}),
			ka = new Card({romanji: "ka", image: absoluteKatakana + "ka.png"}),
			ke = new Card({romanji: "ke", image: absoluteKatakana + "ke.png"}),
			ki = new Card({romanji: "ki", image: absoluteKatakana + "ki.png"}),
			ko = new Card({romanji: "ko", image: absoluteKatakana + "ko.png"}),
			ku = new Card({romanji: "ku", image: absoluteKatakana + "ku.png"}),
			sa = new Card({romanji: "sa", image: absoluteKatakana + "sa.png"}),
			se = new Card({romanji: "se", image: absoluteKatakana + "se.png"}),
			shi = new Card({romanji: "shi", image: absoluteKatakana + "shi.png"}),
			so = new Card({romanji: "so", image: absoluteKatakana + "so.png"}),
			su = new Card({romanji: "su", image: absoluteKatakana + "su.png"});

		//Create and Populate Collection Instance
		var katakana = new CardCollection([]);
		katakana.add([a, e, i, o, u, ka, ke, ki, ko, ku, sa, se, shi, so, su]);
		//viewCollectionContent("katakana collection: ", katakana);

	//Phrases
		var phrase1 = new Card({romanji: "Phrase1", image: "testPath_Phrase1"}),
			phrase2 = new Card({romanji: "Phrase2", image: "testPath_Phrase2"});
		
		//Create and Populate Collection Instance
		var phrases = new CardCollection([]);
		phrases.add([phrase1,phrase2]);
		//viewCollectionContent("Phrase collection: ", phrases);

	//Debugging only
	function viewCollectionContent(string, collection){
		console.log(string + " " + JSON.stringify(collection.toJSON()));
	}


	