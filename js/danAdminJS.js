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
        //Loop through the data and display it
                $.each(data, function(index, row) {
                    console.log(row.column_name);
                });

                /*Process the JSON data and display it
                let htmlOutput = "<div class='response-field-cell'>";
                $.each(data, function(i, item) {
                    htmlOutput + item.id + "</div>" + htmlOutput + item.FullName + "</div>" + htmlOutput + item.Email + "</div>" + htmlOutput + "</div>" + htmlOutput + item.Phone + "</div>" + htmlOutput + item.ServiceRequested + "</div>" + htmlOutput + item.CustomerMessage + "</div>";
                });
                htmlOutput += "</div>";
                $("#response-container").html(htmlOutput);
                */
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Request failed: " + textStatus, errorThrown);
                 
            }
        });}

});