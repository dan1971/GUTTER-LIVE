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
                
                $.each(data, function(index, row) {
                    let rowDiv = $('<div>').addClass('data-row');
                    rowDiv.append('<div class="response-field-cell">Name: ' + row.FullName + '</div>');
                     rowDiv.append('<div class="response-field-cell">Email: ' + row.Email + '</div>');
                      rowDiv.append('<div class="response-field-cell">Phone: ' + row.Phone + '</div>');
                       rowDiv.append('<div class="response-field-cell">Service: ' + row.ServiceRequested + '</div>');
                        rowDiv.append('<div class="response-field-cell">Message: ' + row.CustomerMessage + '</div>');
                            rowDiv.append('<div class="response-field-cell">Date Sent: ' + row.SubmissionDate + '</div>');
                            $("#response-container").html(buildResponseGrid);
                });
                $("#response-container").append(rowDiv);
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Request failed: " + textStatus, errorThrown);
                 
            }
        });}

});