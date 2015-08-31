View = Backbone.View.extend({

	i:-1,
	// mode: "Numbers",
	// secondaryMode: "Image",
	// currentCollection: numbers,
	// currentColLen: numbers.length,


	initialize: function(){
		this.initialRender();
		//this.createCollections();
	},

	// createCollections: function(){
	// 	numbers = new CardCollection([], {id: "Numbers"});	
	// 	hiragana = new CardCollection([], {id: "Hiragana"});
	// 	katakana = new CardCollection([], {id: "Katakana"});
	// 	phrases = new CardCollection([], {id: "Phrases"});
	// 	console.log("CreateCollectionsCompleted");
	// 	console.log(katakana);
	// },

	//Initial rendering only
	initialRender: function(){
		//this.currentCollection.shuffleCollection();

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

	renderSecMode : function(i){

		console.log("RenderSecMode Called");
		// get the html from the script template
		var secModeHTML = document.getElementById('secondaryModeTemplate').innerHTML,
		
		// compile the second template
			compiledSecMode = _.template(secModeHTML),
		
		// build the html from the template, pass in necessary content
			compiledSecModeHTML = compiledSecMode({mode: this.mode, secondaryMode: 'Image'});
			
		// Jam it all into the element
			this.$el.html(compiledSecModeHTML);
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
			console.log(RenderRomanji);
			console.log(RenderImage);

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

	renderFeedbackForm : function(i){
		// get the html from the script template
			feedbackFormHTML = document.getElementById('feedbackFormTemplate').innerHTML,
		
		// compile the fourth/inner template
			compiledForm = _.template(feedbackFormHTML),
		
		// build the html from the template, pass in necessary content
			compiledFormHTML = compiledForm({});
	
		// Jam it all into the element
			this.$nestedContent.html(compiledFormHTML);
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
			//console.log(this.$imageContent);
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

		//Animation between modes
		setTimeout(function(){
			$("#secondTemplateWrapper").addClass('visible');
		}, 100); 

		setTimeout(function(){
			$("#displayCardWrapper").addClass('visible');
		}, 100); 

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



