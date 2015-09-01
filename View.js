View = Backbone.View.extend({

	i:-1,
	numbersLoaded: false,
	hiraganaLoaded: false,
	katakanaLoaded: false,
	phrasesLoaded: false,

	initialize: function(){
		this.initialRender();
		//this.createCollections();
	},

	//Initial rendering only
	initialRender: function(){

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
			compiledModeHTML = compiledMode({mode: 'Numbers', secondaryMode: 'Image'}),
			compiledWrapperHTML = compiledWrapper({otherTemplates: compiledModeHTML});

		// Jam the inner(Mode) into the outer(Wrapper)
		//Not actually doing anything?
			//$(compiledWrapperHTML).find('#otherTemplates').html(compiledModeHTML);
		
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
			this.$el.html(compiledModeHTML);
	},

	//Check to see if the deck was previously loaded,
	//if so, immediately transition to visible
	styleLoading : function(mode){
		
		switch(mode){
			case "Hiragana":
				if (hLoaded === true){
					$('.secondaryMode').toggleClass('visible loading');
				}
				else {
					console.log("Hiragana Not Loaded");
				}
				break;

			case "Katakana":
				if (kLoaded === true){
					$('.secondaryMode').toggleClass('visible loading');
				}
				else {
					console.log("Katakana Not Loaded");
				}
				break;

			case "Numbers":
				if (nLoaded === true){
					$('.secondaryMode').toggleClass('visible loading');
				}
				else {
					console.log("Numbers Not Loaded");
				}

				break;

			case "Phrases":
				if (pLoaded === true){
					$('.secondaryMode').toggleClass('visible loading');
				}
				else {
					console.log("Phrases Not Loaded");
				}

				break;

			//case "Hiragana":

		}

		// switch(this.mode){
		// 	case "Numbers":
		// 		this.currentCollection = numbers;
		// 		console.log("numbersLoaded: " + this.numbersLoaded);

		// 		if (this.numbersLoaded === false){
		// 			this.currentCollection.getNumbers();
		// 			this.numbersLoaded = true;
		// 		}
		// 		break;


	},
	
	renderSecMode : function(i){
		// get the html from the script template
		var secModeHTML = document.getElementById('secondaryModeTemplate').innerHTML,
		
		// compile the second template
			compiledSecMode = _.template(secModeHTML),
		
		// build the html from the template, pass in necessary content
			compiledSecModeHTML = compiledSecMode({mode: this.mode, secondaryMode: 'Image'});
			
		// Jam it all into the element
			this.$el.html(compiledSecModeHTML);

		//Update CSS
		this.styleLoading(this.mode);
	},


	renderCard : function(i){
		//Template 3.0
		//get the outter html from the script template
			displayCardHTML = document.getElementById('displayCardTemplate').innerHTML,
	 	
	 	// compile the outter template
	 		compiledDispCard = _.template(displayCardHTML),

	 	//Template 3.5
	 	//get the html from the inner script template and compile it
	 		cardContentHTML = document.getElementById('cardContentTemplate').innerHTML,
			compiledcardContent = _.template(cardContentHTML),

		//Get current content to pass into the template
			RenderRomanji = this.currentCollection.at(this.i).get("romanji"),
			RenderImage = this.currentCollection.at(this.i).get("image");

		// build the html from the template, pass in necessary content
			compiledcardContentHTML = compiledcardContent({mode: this.mode, 
				secondaryMode: this.secondaryMode, 
				bodyContent: RenderRomanji, 
				imageContent: RenderImage
			}),

			compiledDispCardHTML = compiledDispCard({otherTemplates: compiledcardContentHTML, 
				mode: this.mode, 
				secondaryMode: this.secondaryMode, 
				bodyContent: RenderRomanji, 
				imageContent: RenderImage,
				cardContentTemplateHere: compiledcardContentHTML

			}),
		
		// Jam it all into the element
			this.$el.html(compiledDispCardHTML);
	},

	renderCardContent : function(i){
	 	//Template 3.5
	 	//get the html from the inner script template and compile it
	 		cardContentHTML = document.getElementById('cardContentTemplate').innerHTML;
			compiledcardContent = _.template(cardContentHTML);

		//Get current content to pass into the template
			RenderRomanji = this.currentCollection.at(this.i).get("romanji"),
			RenderImage = this.currentCollection.at(this.i).get("image");

		// build the html from the template, pass in necessary content
			compiledcardContentHTML = compiledcardContent({mode: this.mode, 
				secondaryMode: this.secondaryMode, 
				bodyContent: RenderRomanji, 
				imageContent: RenderImage
			});

			$('#cardContent').html(compiledcardContentHTML);
	},

	renderFeedbackForm : function(i){
		// get the html from the script template
			feedbackFormHTML = document.getElementById('feedbackFormTemplate').innerHTML,
		
		// compile the fourth/inner template
			compiledForm = _.template(feedbackFormHTML),
		
		// build the html from the template, pass in necessary content
			compiledFormHTML = compiledForm({});
	
		// Jam it all into the element
			this.$el.html(compiledFormHTML);
	},

	//Bind events
	events: {"click .mode": "updateMode",
			"click .secondaryMode": "updateSecondaryMode",
			"click #nextButton": "nextCard",
			"click #transButton": "translate",
			"click #aboutBtn": "renderAbout",
			"click #secModeBackBtn": "backToMode",
			"click #cardBackBtn": "backToSecMode",
			"click #feedbackBtn": "renderFeedback",
			"click #homeBtn": "backToMode"
	},

	//Re-render Mode via the Back Button
	backToMode : function(e){
		this.renderMode();

		$("#modeBtns").addClass('invisible');
		
		setTimeout(function(){
			$("#modeBtns").removeClass('invisible');
			$("#modeBtns").addClass('visible');
		}, 100); 
	}, 

	//Re-render Second Mode via the Back Button
	backToSecMode: function(e){
		this.renderSecMode();
				
		setTimeout(function(){
			$("#secondTemplateWrapper").addClass('visible');
		}, 100); 
	},

	//Update mode, re-render
 	updateMode : function(e){
		this.mode = e.target.id;
		
		switch(this.mode){
			case "Numbers":
				this.currentCollection = numbers;
				console.log("numbersLoaded: " + this.numbersLoaded);

				if (this.numbersLoaded === false){
					this.currentCollection.getNumbers();
					this.numbersLoaded = true;
				}
				break;
			case "Hiragana":
				this.currentCollection = hiragana;
				console.log("hiraganaLoaded: " + this.hiraganaLoaded);
				if (this.hiraganaLoaded === false){
					this.currentCollection.getHiragana();
					this.hiraganaLoaded = true;
				}
				break;
			case "Katakana":
				this.currentCollection = katakana;
				if (this.katakanaLoaded === false){
					this.currentCollection.getKatakana();
					this.katakanaLoaded = true;
				}
				break;
			case "Phrases":
				this.currentCollection = phrases;
				console.log("phrasesLoaded: " + this.phrasesLoaded);
				if (this.phrasesLoaded === false){
					this.currentCollection.getPhrases();
					this.phrasesLoaded = true;
				}
				break;
		}

		this.currentColLen = this.currentCollection.length;

		//Shuffle each time a new mode is selected
		this.currentCollection.shuffleCollection();
		
		//Reset the i value because each collection may have a different length,
		this.i = -1;
		
		//Render content
		this.renderSecMode();
		
		//Animation between modes
		setTimeout(function(){
			$("#secondTemplateWrapper").addClass('visible');
		}, 100); 
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

		//Animation between modes
		setTimeout(function(){
			$("#displayCardWrapper").addClass('visible');
		}, 100); 

		//If Romanji, display text and hide image
		if (this.secondaryMode === "Romanji"){
			$('#imageContent').addClass('invisible');
			$('#bodyContent').removeClass('invisible');
		}

		else {
			$('#bodyContent').addClass('invisible');
			$('#imageContent').removeClass('invisible');
		}
	},

	//Next card	
	nextCard : function(e){
		//Increment count, reshuffle if end of the deck has been reached
		this.i++;

		if (this.i >= this.currentCollection.length){
			console.log("------------Shuffle");
		 	this.currentCollection.shuffleCollection();
		 	this.i = 0;
		}

		//Render next card (must come before applying classes)
		this.renderCardContent(this.i);

		//Animation between modes
		setTimeout(function(){
			$("#secondTemplateWrapper").addClass('visible');
		}, 100); 

		setTimeout(function(){
			$("#displayCardWrapper").addClass('visible');
		}, 100); 
		
		//If Image, display image and hide text (until Translate is pressed)
		if (this.secondaryMode === "Image"){
			setTimeout(function(){
				$('#imageContent').removeClass('invisible').addClass('visible');
			}, 100); 
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
			$('#bodyContent').toggleClass('invisible visible');
		}

		else{
			$('#imageContent').toggleClass('invisible visible');
		}
		//No need to re-render		
	},

	renderAbout : function(e){
//TODO: See Joe/Ian
//apparently THIS changed when I reloaded the template so now I have to make a DOM call
		//$('#aboutContent').toggleClass('hide');
		//this.$classesStringified = $('#aboutContent').attr('class');
		
		if ($('#aboutContent').hasClass('hide')){
			$('#aboutContent').toggleClass('hide');
			setTimeout(function(){
				$('#aboutContent').toggleClass('invisible visible');
			}, 100); 
		}

		else{
			$('#aboutContent').toggleClass('invisible visible');
			setTimeout(function(){
				$('#aboutContent').toggleClass('hide');
			}, 100); 
		}
	},

	renderFeedback : function(e){
		this.renderFeedbackForm();

		setTimeout(function(){
			$("#feedbackFormWrapper").addClass('visible');
		}, 100); 

	}
});

	//NOTE: this.$el is equivalent to $("#renderHere")
	var firstView = new View({el: $("#renderHere")});
		
	var createCollections = function(){
		numbers = new CardCollection([], {id: "Numbers"});	
		hiragana = new CardCollection([], {id: "Hiragana"});
		katakana = new CardCollection([], {id: "Katakana"});
		phrases = new CardCollection([], {id: "Phrases"});
	}
		$.when(createCollections()).done();

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


