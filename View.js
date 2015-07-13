View = Backbone.View.extend({

	mode: "Numbers",
	secondaryMode: "Image",
	i:-1,
	currentCollection: numbers,
	currentColLen: numbers.length,
	
	initialize: function(){
		this.initialRender();
	},

	//Initial rendering only
	initialRender: function(){
		this.currentCollection.shuffleCollection();

	//Template0: WrapperTemplate
		// get the html from the script template
		var wrapperHTML = document.getElementById('wrapperTemplate').innerHTML,
		// compile the first template
			compiledWrapper = _.template(wrapperHTML),
	//Template1: ModeTemplate
		// get the html from the script template and compile it
			modeHTML = document.getElementById('modeTemplate').innerHTML,
			compiledMode = _.template(modeHTML),
		
		// build the html from the template, pass in necessary content
			compiledModeHTML = compiledMode({mode: 'Numbers', secondaryMode: 'Image'});
			compiledWrapperHTML = compiledWrapper({otherTemplates: compiledModeHTML});

		// Jam the inner(Mode) into the outer(Wrapper)
			$(compiledWrapperHTML).find('#otherTemplates').html(compiledModeHTML);
		
		// Jam it all into the element
			this.$el.html(compiledWrapperHTML);


		// Set reused DOM references
			this.$nestedContent = $('#nestedContent');
			this.$aboutContent = $('#aboutContent');
			this.$imageContent = $('#imageContent');
	},

	renderMode : function(i){
		// get the html from the script template
		var modeHTML = document.getElementById('modeTemplate').innerHTML,
		
		// compile the first template
			compiledMode = _.template(modeHTML),
		
		// build the html from the template, pass in necessary content
			compiledModeHTML = compiledMode({mode: this.mode, secondaryMode: 'Image'});
		
		// Jam it all into the element
			this.$nestedContent.html(compiledModeHTML);
	},

	renderSecMode : function(i){
		// get the html from the script template
		var secModeHTML = document.getElementById('secondaryModeTemplate').innerHTML,
		
		// compile the second template
			compiledSecMode = _.template(secModeHTML),
		
		// build the html from the template, pass in necessary content
			compiledsecModeHTML = compiledSecMode({mode: this.mode, secondaryMode: 'Image'});
		
		// Jam it all into the element
			this.$nestedContent.html(compiledsecModeHTML);
	},

	renderCard : function(i){
		// get the html from the script template
			displayCardHTML = document.getElementById('displayCardTemplate').innerHTML,
		
		// compile the third/inner template
			compiledDispCard = _.template(displayCardHTML),
		
		//Get current content to pass into the template
			RenderRomanji = this.currentCollection.at(this.i).get("romanji"),
			RenderImage = this.currentCollection.at(this.i).get("image");
		
		// build the html from the template, pass in necessary content
			compiledDispCardHTML = compiledDispCard({mode: this.mode, secondaryMode: this.secondaryMode, bodyContent: RenderRomanji, imageContent: RenderImage});
	
		// Jam it all into the element
			this.$nestedContent.html(compiledDispCardHTML);
	},

	//Bind events
	events: {"click .mode": "updateMode",
			"click .secondaryMode": "updateSecondaryMode",
			"click #nextButton": "nextCard",
			"click #transButton": "translate",
			"click #aboutBtn": "renderAbout",
			"click #secModeBackBtn": "renderMode",
			"click #cardBackBtn": "renderSecMode",
	},

	//Update mode, re-render
 	updateMode : function(e){
		this.mode = e.target.id;
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
		this.renderSecMode();
	},

	//Secondary Mode
 	updateSecondaryMode : function(e){
		this.secondaryMode = e.target.id;
		
		//Shuffle each time a new mode is selected
		this.currentCollection.shuffleCollection();
		
		//Reset the i value because each collection may have a different length,
		i = 0;
		
		//Render content
		this.renderCard(this.i);

		//If Romanji, display text and hide image
		if (this.secondaryMode === "Romanji"){
			//this.$imageContent.addClass('invisible');
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
		this.renderCard(this.i);

		//If Image, display image and hide text (until Translate is pressed)
		if (this.secondaryMode === "Image"){
			$('#bodyContent').removeClass('visible').addClass('invisible');
		}

		//Else, if Romanji, display text and hide image (until Translate is pressed)
		else{
			//this.$imageContent.addClass('invisible');
			$('#imageContent').addClass('invisible');
			$('#bodyContent').addClass('visible').removeClass('invisible');
		}
	},

	//Display translation 
	translate : function(e){
		if (this.secondaryMode === "Image"){
			$('#bodyContent').removeClass('invisible').addClass('visible');
		}

		else{
			//this.$imageContent.removeClass('invisible').addClass('visible');
			$('#imageContent').removeClass('invisible').addClass('visible');
		}
		//No need to re-render		
	},

	renderAbout : function(e){
		//$('#aboutContent').toggleClass('invisible visible');
		this.$aboutContent.toggleClass('invisible visible');
	}

});

	//NOTE: this.$el is equivalent to $("#renderHere")
	var firstView = new View({el: $("#renderHere")});
		


//Debugging ----------------------------------------------------------------
	//Call with: viewCollection(this.currentColLen, this.currentCollection);
	//Debugging
	var viewCollection = function(curLen, curCol){
		console.log("Accessed");
		console.log(curLen);
		for(a = 0; a < curLen; a++){
			console.log(curCol.at(a).get("romanji"));
		}
	}



