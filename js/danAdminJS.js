$(document).ready(function(){


     
	   (function($) {
	   $.sanitize = function(input) {
		let output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
		replace(/<[\/\!]*?[^<>]*?>/gi, '').
		replace(/<style[^>]*?>.*?<\/style>/gi, '').
		replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '').
        replace(/&nbsp;/g, '');
	    return output;
	    };
	 })(jQuery);
	 let sCname;

     //SANITIZE FIRST NAME END

	  //ON CLICKKKKKKKKKKK
      $("#contact-form-submit").on("click", (e)=>{
		e.preventDefault();
	   let Cname = $('input[name="name"]').val();;
	   let Cphone =  $('input[name="phone"]').val();
	   let Cemail =  $('input[name="email"]').val();
	   let Cmessge = $('#cfMessage').val();

       let formData = $('#contact-form').serialize();
	   console.log("serialized form values= " + formData);

	   let isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Cemail);

	  let errors = [0,0,0,0];
		if(Cname == ""){
			$('#Fname').prev().html("<span style='color:red;'>*Enter Name</span>");
			$('#Fname').css({'border-color':'red','border-width':'2px'});
			errors[0] = 1;
		} else {
			$('#Fname').prev().html("");
			$('#Fname').css({'border-color':'#ccc','border-width':'1px'});
			sCname = $.sanitize(Cname);
			errors[0] = 0;
		} 
		if(Cemail == ""){
			$('#email').prev().html("<span style='color: red;'>*Enter Email</span>");
			$('#email').css({'border-color':'red','border-width':'2px'});
			errors[2] = 1;
		} else if(Cemail != "" && isValidEmail == false) {
			$('#email').prev().html("<span style='color: red;'>*Enter a valid Email</span>");
			$('#email').css({'border-color':'red','border-width':'2px'});
			errors[2] = 1;
		} else {
			$('#email').prev().html("");
			$('#email').css({'border-color':'#ccc','border-width':'1px'});
			errors[2] = 0;
		}

		let findErrors = errors.includes(1);
		
      // CONTACT FORM ERROR CHECK END

		if(!findErrors){
			let h = $('.form-container-all').height();
			$('.form-container-all').css('height',h);
			$('.form-submit-message-container-screen').css('display','grid');
    		$('.form-submit-message-container').css('display','grid');

	   let formData = $('#contact-form').serialize();
		console.log(JSON.stringify(formData)); 

			
			sendInfo(formData);
				$('#cfName')[0].value = "";  
				$('#cfPhone')[0].value = ""; 
				$('#cfEmail')[0].value = "";
				$('#cfMessage')[0].value="";
			
		};
	  });

  sendInfo = (formData)=>{
	  $.ajax({
        type: 'POST',
        url: "contact_form_submit.php",
		data: formData,
		success: function(data) {
        // Display the response from the PHP script
		console.log(data)
        let h = $('.form-container-all').height();
		$('.form-container-all').css('height',h);
		$('.loader').css('display','none');
		$('#send-status-message').html("Message Sent!<br> Thank you! We will be in touch within 24hrs.");
		
         },
       error: function(jqXHR, textStatus, errorThrown) {
				let h = $('.form-container-all').height();
		     $('.form-container-all').css('height',h);
		     $('.loader').css('display','none');
		      $('#send-status-message').html(errorThrown);
                console.log("Request failed: " + textStatus, errorThrown);
                 }
        });}

		// retrieve DB data

		$("#viewDB").on("click", (e)=>{
		e.preventDefault();
			getCustomerData();

		});

      getCustomerData = (formData)=>{
	   $.ajax({
        url: "fetch_data.php",
            type: "GET",
            dataType: "json", // Expect JSON data
            success: function(data) {
                // Process the JSON data and display it
                let htmlOutput = "<div class='response-field-cell'>";
                $.each(data, function(i, item) {
                    htmlOutput + item.id + "</div>" + htmlOutput + item.FullName + "</div>" + htmlOutput + item.Email + "</div>" + htmlOutput + "</div>" + htmlOutput + item.Phone + "</div>" + htmlOutput + item.ServiceRequested + "</div>" + htmlOutput + item.CustomerMessage + "</div>";
                });
                htmlOutput += "</ul>";
                $("#response-container").html(htmlOutput);
            },
            error: function(xhr, status, error) {
                console.error("Error fetching data: " + error);
            }
        });}

});