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
		$("#viewDB-btn").on("click", (e)=>{
		e.preventDefault();
        if ($('.response-container').is(':empty')) {
		    $('.loader').css('display','inline-block');
		    $('#send-status-message').html("Fetching Form Input Data");
            getCustomerData();
            
            } else {
                console.log("Container is already populated");
            }

		});

      getCustomerData = (formData)=>{

        $('.loader').css('display','inline-block');
		$('#send-status-message').html("Fetching Form Input Data");

	   $.ajax({
        url: "db-display-data.php",
            type: "GET",
            dataType: "json", // Expect JSON data
            success: function(data) {

                $('.loader').css('display','none');
                $('#send-status-message').html("");

                // /*Process the JSON data and display it
                $.each(data, function(index, row) {
                if(index==0){
                    let colHeadDiv = $('<div>').addClass('data-row data-col');
                    colHeadDiv.append('<div class="response-field-cell">Name</div>');
                    colHeadDiv.append('<div class="response-field-cell">Email</div>');
                    colHeadDiv.append('<div class="response-field-cell">Phone</div>');
                    colHeadDiv.append('<div class="response-field-cell">Service</div>');
                    colHeadDiv.append('<div class="response-field-cell">Message</div>');
                    colHeadDiv.append('<div class="response-field-cell">Date Sent</div>');
                    $(".response-container").append(colHeadDiv);
                }
                let rowDiv = $('<div>').addClass('data-row');
                    rowDiv.append('<div class="response-field-cell">' + row.FullName + '</div>');
                     rowDiv.append('<div class="response-field-cell">' + row.Email + '</div>');
                      rowDiv.append('<div class="response-field-cell">' + row.Phone + '</div>');
                       rowDiv.append('<div class="response-field-cell">' + row.ServiceRequested + '</div>');
                        rowDiv.append('<div class="response-field-cell">' + row.CustomerMessage + '</div>');
                            rowDiv.append('<div class="response-field-cell">' + row.SubmissionDate + '</div>');
                             $(".response-container").append(rowDiv);
                })
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Request failed: " + textStatus, errorThrown);
                $('.loader').css('display','none');
                $('#send-status-message').html("Error Fetching Data: " + errorThrown);
                 
            }
        
        });
    }

});