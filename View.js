View = Backbone.View.extend({

	i:-1,
	numbersLoaded: false,
	hiraganaLoaded: false,
	katakanaLoaded: false,
	phrasesLoaded: false,
	secondModeActive: false,
	mode: "Hiragana",

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
			compiledModeHTML = compiledMode({mode: mode, secondaryMode: 'Image'});
		
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
		}
	},
	
	renderSecMode : function(i){
		// get the html from the script template
		var secModeHTML = document.getElementById('secondaryModeTemplate').innerHTML,
		
		// compile the second template
			compiledSecMode = _.template(secModeHTML),
		
		// build the html from the template, pass in necessary content
			compiledSecModeHTML = compiledSecMode({mode: mode, secondaryMode: 'Image'});
			
		// Jam it all into the element
		console.log(this.$el.html);
			this.$el.html(compiledSecModeHTML);

		//Update CSS
		this.styleLoading(mode);
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
			compiledcardContentHTML = compiledcardContent({mode: mode, 
				secondaryMode: this.secondaryMode, 
				bodyContent: RenderRomanji, 
				imageContent: RenderImage
			}),

			compiledDispCardHTML = compiledDispCard({otherTemplates: compiledcardContentHTML, 
				mode: mode, 
				secondaryMode: this.secondaryMode, 
				bodyContent: RenderRomanji, 
				imageContent: RenderImage,
				cardContentTemplateHere: compiledcardContentHTML

			}),
		
		// Jam it all into the element
			console.log(this.$el.html);
			//this.$el.html(compiledDispCardHTML);
			$('#cardContentHere').html(compiledDispCardHTML);

		// Make the content visible
		$('#Hiragana').addClass('hideHiragana');
		$('#Katakana').addClass('hideKatakana');
		$('#Numbers').addClass('hideNumbers');
		$('#Phrases').addClass('hidePhrases');

		$('#cardContentHere').toggleClass('invisible visible');
		
		setTimeout(function(){
			$('#displayCardTemplate').toggleClass('invisible visible');
		}, 1500); 

	},

	renderCardContent : function(i){
	 	//Template 3.5
	 	//get the html from the inner script template and compile it
	 		cardContentHTML = document.getElementById('cardContentTemplate').innerHTML;
			compiledcardContent = _.template(cardContentHTML);

		//Get current content to pass into the template
			console.log(this.currentCollection);
			console.log(this.i);
			console.log(this.currentCollection.at(this.i));

			RenderRomanji = this.currentCollection.at(this.i).get("romanji"),
			RenderImage = this.currentCollection.at(this.i).get("image");

		// build the html from the template, pass in necessary content
			compiledcardContentHTML = compiledcardContent({mode: mode, 
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
	events: {"mouseover .mode": "updateMode",

			"click #hirImage" : "hirImage",
			"click #hirRomanji" : "hirRomanji",

			"click #katImage" : "katImage",
			"click #katRomanji" : "katRomanji",

			"click #numImage" : "numImage",
			"click #numRomanji" : "numRomanji",

			"click #phrasesImage" : "phrasesImage",
			"click #phrasesRomanji" : "phrasesRomanji",

			"mouseover #modeDivs" : "slideSecModesOut",
			"mouseout #modeDivs" : "slideSecModesIn",


			"click .secondaryMode": "updateSecondaryMode",
			"click #nextButton": "nextCard",
			"click #transButton": "translate",
			"click #aboutBtn": "renderAbout",
			"click #secModeBackBtn": "backToMode",
			"click #cardBackBtn": "backToSecMode",
			"click #feedbackBtn": "renderFeedback",
			"click #homeBtn": "backToMode",
			"click #hajimeBtn": "shrinkWelcome"

	},

/* Change mode/secondaryMode after making initial selection
Redundant use of secondary mode */
	hirImage : function(e){
		this.secondaryMode = 'Image';
	},

	hirRomanji : function(e){
		this.secondaryMode = 'Romanji';
	},

	katImage : function(e){
		this.secondaryMode = 'Image';
	},

	katRomanji : function(e){
		this.secondaryMode = 'Romanji';
	},

	phrasesImage : function(e){
		this.secondaryMode = 'Image';
	},

	phrasesRomanji : function(e){
		this.secondaryMode = 'Romanji';
	},

	numImage : function(e){
		this.secondaryMode = 'Image';
	},

	numRomanji : function(e){
		mode = 'Numbers';
	},

/* -----------------------------------------*/
slideSecModesOut : function(e){
	if (this.secondModeActive){
		$("#Hiragana").addClass('slideHiragana');
		$("#Katakana").addClass('slideKatakana');
		$("#Numbers").addClass('slideNumbers');
		$("#Phrases").addClass('slidePhrases');
	}
},

slideSecModesIn : function(e){
	$("#Hiragana").removeClass('slideHiragana');
	$("#Katakana").removeClass('slideKatakana');
	$("#Numbers").removeClass('slideNumbers');
	$("#Phrases").removeClass('slidePhrases');
},


	slideOut : function(e){
		console.log(e.currentTarget.id);
	},

	slideHiraganaOut : function(e){
		if (this.secondModeActive){
			$("#Hiragana").addClass('slideHiragana');
		}
	},

	slideHiraganaIn : function(e){
	// 	if (this.secondModeActive){
	// 		$("#Hiragana").removeClass('slideHiragana');
	// 	}
	},

	slideKatakanaOut : function(e){
		if (this.secondModeActive){
			$("#Katakana").addClass('slideKatakana');
		}
	},

	slideKatakanaIn : function(e){
		// if (this.secondModeActive){
		// 	$("#Katakana").removeClass('slideKatakana');
		// }
	},

	slideNumbersOut : function(e){
		if (this.secondModeActive){
			$("#Numbers").addClass('slideNumbers');
		}
	},

	slideNumbersIn : function(e){
		// if (this.secondModeActive){
		// 	$("#Numbers").removeClass('slideNumbers');
		// }
	},

	slidePhrasesOut : function(e){
		if (this.secondModeActive){
			$("#Phrases").addClass('slidePhrases');
		}
	},

	slidePhrasesIn : function(e){
		// if (this.secondModeActive){
		// 	$("#Phrases").removeClass('slidePhrases');
		// }
	},

	// Remove introductory message
	// Then make the main menu appear
	shrinkWelcome : function(e){
		//$("#welcome").hide();
		$("#welcome").removeClass('fadeInUp');
		
		setTimeout(function(){
			$("#welcome").addClass('disappear');
		}, 0);

		// Buttons
		$("#modeBtns button").removeClass('disappear');
		$("#Hiragana").addClass('appear');
		$("#Katakana").addClass('appear1');
		$("#Phrases").addClass('appear2');
		$("#Numbers").addClass('appear3');

		// Divs (replacing buttons)
		$("#modeDivs div").removeClass('disappear');
		$("#HiraganaDiv").addClass('appear');
		$("#KatakanaDiv").addClass('appear1');
		$("#NumbersDiv").addClass('appear2');
		$("#PhrasesDiv").addClass('appear3');

		$("#feedbackBtn").removeClass('disappear');
		$("#feedbackBtn").addClass('appear5');		
	},


	//Re-render main Mode Menu via the Home Button
	// Currently used on the Feedback form
	backToMode : function(e){
		this.renderMode();

		$("#modeBtns").addClass('invisible');
		
		setTimeout(function(){
			$("#modeBtns").removeClass('invisible');
			$("#modeBtns").addClass('visible');
		}, 100); 
	}, 

	//Currently deprecated
	// //Re-render Second Mode via the Back Button
	// backToSecMode: function(e){
	// 	this.renderSecMode();
				
	// 	setTimeout(function(){
	// 		$("#secondTemplateWrapper").addClass('visible');
	// 	}, 100); 
	// },

	//Update mode
 	updateMode : function(e){
 		
		mode = e.target.id;
 				
		switch(mode){
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
				console.log("katakanaLoaded: " + this.katakanaLoaded);
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
		
		// //Render content
		// this.renderSecMode();
		
		// //Animation between modes
		// setTimeout(function(){
		// 	$("#secondTemplateWrapper").addClass('visible');
		// }, 100); 

	},

	//Secondary Mode
 	updateSecondaryMode : function(e){
		console.log(this.currentCollection);
		$('#cardContentHere').removeClass('invisibe');
		$('#cardContentHere').addClass('visibe');


		this.secondaryMode = e.target.id;
		$('#hiragana').addClass('hideHiragana');
		
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

		this.secondModeActive = true;
		console.log(this.secondModeActive);

		$('.secondaryMode').toggleClass('loading visible invisible');
		$('.label').addClass('repositionLabels');
		$('.firstMode').removeClass('firstMode');

		setTimeout(function(){
			$('.changeModes').toggleClass('invisible visible');
		}, 1500); 

	},

	//Next card	
	nextCard : function(e){
		console.log(mode);
		console.log(this.secondaryMode);
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


// 	renderAbout : function(e){
// //TODO: See Joe/Ian
// //apparently THIS changed when I reloaded the template so now I have to make a DOM call
// 		//$('#aboutContent').toggleClass('hide');
// 		//this.$classesStringified = $('#aboutContent').attr('class');
		
// 		if ($('#aboutContent').hasClass('hide')){
// 			$('#aboutContent').toggleClass('hide');
// 			setTimeout(function(){
// 				$('#aboutContent').toggleClass('invisible visible');
// 			}, 100); 
// 		}

// 		else{
// 			$('#aboutContent').toggleClass('invisible visible');
// 			setTimeout(function(){
// 				$('#aboutContent').toggleClass('hide');
// 			}, 100); 
// 		}
// 	},

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


/*Testing----------------------------------------------------*/


/*----------------------------------------------------------*/

