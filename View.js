View = Backbone.View.extend({

	mode: "Numbers",
	secondaryMode: "Image",
	i:-1,
	currentCollection: numbers,
	currentColLen: numbers.length,
	
	initialize: function(){
		this.render();
		// this.reRenderDispCard();
	},

	//Initial rendering
	render: function(){
		this.currentCollection.shuffleCollection();
	//Template1: ModeTemplate
		// get the html from the script template
		var modeHTML = document.getElementById('modeTemplate').innerHTML,
		// compile the first template
			compiledMode = _.template(modeHTML),
		
	//Template2: Navigation Template
		// get the html from the script template
			navHTML = document.getElementById('navigationTemplate').innerHTML,
		// compile the second/inner template
			compiledNav = _.template(navHTML),

	//Template3: Card Template
		// get the html from the script template
			displayCardHTML = document.getElementById('displayCardTemplate').innerHTML,
		// compile the third/inner template
			compiledDispCard = _.template(displayCardHTML),
		

		//Get current content to pass into the template
			RenderRomanji = this.currentCollection.at(this.i).get("romanji"),
			RenderImage = this.currentCollection.at(this.i).get("image"),

		// build the html from the second template
			compiledDispCardHTML = compiledDispCard({bodyContent: RenderRomanji, imageContent: RenderImage}),

		// build the html from the second template
			compiledNavHTML = compiledNav({displayCardContent:compiledDispCardHTML}),
		
		// build the html from the template
			compiledModeHTML = compiledMode({mode: 'Numbers', secondaryMode: 'Image', navWrapperContent:compiledNavHTML});
		// Jam the second(Nav) into the first(mode)
			$(compiledModeHTML).find('#navigationWrapper').html(compiledNavHTML);
	
		// Jam it all into the element
			this.$el.html(compiledModeHTML);


		// Load the logic (declared above)
		//boundLogic();

	},

	//TODO Rerender just the inner template
	//This will be called on 'next' button click
	//Potentially split this into two?  One for the romanji, one for the image
	//Currently re-renders the entire thing; which defeats the purpose- but at least it works.
	reRenderDispCard : function(i){
		// get the html from the script template
			displayCardHTML = document.getElementById('displayCardTemplate').innerHTML,
		// compile the third/inner template
			compiledDispCard = _.template(displayCardHTML),
		//Get current content to pass into the template
			RenderRomanji = this.currentCollection.at(this.i).get("romanji"),
			RenderImage = this.currentCollection.at(this.i).get("image");
		// build the html from the second template
			compiledDispCardHTML = compiledDispCard({bodyContent: RenderRomanji, imageContent: RenderImage});
	
		// Jam it all into the element
			//this.$el.html(compiledDispCardHTML);
			$('#displayCardContent').html(compiledDispCardHTML);
	},

	reRenderNavigation : function(i){
		// get the html from the script template
			displayCardHTML = document.getElementById('displayCardTemplate').innerHTML,
		// compile the third/inner template
			compiledDispCard = _.template(displayCardHTML),
		//Get current content to pass into the template
			RenderRomanji = this.currentCollection.at(this.i).get("romanji"),
			RenderImage = this.currentCollection.at(this.i).get("image");
		// build the html from the second template
			compiledDispCardHTML = compiledDispCard({bodyContent: RenderRomanji, imageContent: RenderImage});
	
		// Jam it all into the element
			this.$el.html(compiledDispCardHTML);
			//$('#displayCardContent').html(compiledDispCardHTML);
	},

	//Bind events
	events: {"click .mode": "updateMode",
			"click .secondaryMode": "updateSecondaryMode",
			"click #nextButton": "nextCard",
			"click #transButton": "translate"
	},

	//Update mode, re-render
 	updateMode : function(e){
		this.mode = e.target.id;
		console.log("Mode: " + this.mode);
		switch(this.mode){
			case "Numbers":
				this.currentCollection = numbers;
				break;
			case "Hiragana":
				this.currentCollection = hiragana;
				break;
			case "Katakana":
				this.currentCollection = katakana;
				break;
			case "Phrases":
				this.currentCollection = phrases;
				break;
		}
		
		this.currentColLen = this.currentCollection.length;

		//Shuffle each time a new mode is selected
		this.currentCollection.shuffleCollection();
		//Reset the i value because each collection may have a different length,
		this.i = -1;
		
		//Render content
		this.reRenderDispCard(this.i);
	},

	//Secondary Mode
		//Update mode, re-render
 	updateSecondaryMode : function(e){
		this.secondaryMode = e.target.id;
		console.log(this.secondaryMode);


		//Shuffle each time a new mode is selected
		this.currentCollection.shuffleCollection();
		//Reset the i value because each collection may have a different length,
		i = 0;
		
		//Render content
		this.reRenderDispCard(this.i);

		//If Romanji, display text and hide image
		if (this.secondaryMode === "Romanji"){
			console.log("Why?");
			$('#imageContent').addClass('invisible');
			$('#bodyContent').removeClass('invisible');
		}
	},

	//Next card	
	nextCard : function(e){
		this.i++;
		if (this.i >= this.currentColLen){
			console.log("------------Shuffle");
		 	this.currentCollection.shuffleCollection();
		 	this.i = 0;
		}

		//Render next card (must come before applying classes)
		this.reRenderDispCard(this.i);

		//If Image, display image and hide text (until Translate is pressed)
		if (this.secondaryMode === "Image"){
			//remove invisible class from text
			$('#bodyContent').removeClass('visible');
			$('#bodyContent').addClass('invisible');
			
			// $('#imageContent').removeClass('invisible');
			// $('#imageContent').addClass('visible');
		}

		//Else, if Romanji, display text and hide image (until Translate is pressed)
		else{
			//remove invisible class from image
			$('#imageContent').addClass('invisible');
			$('#bodyContent').addClass('visible');
			$('#bodyContent').removeClass('invisible');
		}
	},

	//Display translation 
	translate : function(e){
		console.log(this.secondaryMode);
		if (this.secondaryMode === "Image"){
			//remove invisible class from text
			$('#bodyContent').removeClass('invisible');
			$('#bodyContent').addClass('visible');
		}

		else{
			//remove invisible class from image
			$('#imageContent').removeClass('invisible');
			$('#imageContent').addClass('visible');
		}
		//No need to re-render		
	}


});

	//NOTE: this.$el is equivalent to $("#renderHere")
	var firstView = new View({el: $("#renderHere")});
		// firstView.set("tagName","span");
		// firstView.set("className","className");
		// firstView.set("id","id");

	//Debugging
	//viewCollection(this.currentColLen, this.currentCollection);
	//Debugging
	var viewCollection = function(curLen, curCol){
		console.log("Accessed");
		console.log(curLen);
		for(a = 0; a < curLen; a++){
			console.log(curCol.at(a).get("romanji"));
		}
	}
