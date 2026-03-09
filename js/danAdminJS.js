$(document).ready(function(){


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


	// GET DATA FROM DB
		$("#viewDB").on("click", (e)=>{
		e.preventDefault();
			getCustomerData();

		});

      getCustomerData = (formData)=>{
	   $.ajax({
        url: "db-display-data.php",
            type: "GET",
            dataType: "json", // Expect JSON data
            success: function(data) {

                console.log("data " + data);

                // $.each(data, function(index, row) {
                //     console.log(row.FullName + " " + row.Email + " " + " " + row.Phone + " " + row.ServiceRequested + " "+ row.CustomerMessage + " " + " " + row.SubmissionDate);
                // });

                // /*Process the JSON data and display it
                let buildResponseGrid;
                let htmlOutput = "<div class='response-field-cell'>";
                 buildResponseGrid += $.each(data, function(index, row) {
                    
                     htmlOutput + row.InquiryID + "</div>" + htmlOutput + "Name:" + row.FullName + "</div>" + htmlOutput + "Email:" + row.Email + "</div>" + htmlOutput + "Phone:" + row.Phone + "</div>" + htmlOutput + "Service:" + row.ServiceRequested + "</div>" +  htmlOutput + "Message:" + row.CustomerMessage + "</div></div>";
                    
                });
                console.log("b" + buildResponseGrid);
                $("#response-container").html(buildResponseGrid);
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Request failed: " + textStatus, errorThrown);
                 
            }
        });}

});