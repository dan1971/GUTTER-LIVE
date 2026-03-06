$(document).ready(function(){

// MAKE IT RAIN! 
var parent = document.getElementById("rain-overlay");
var ro = new ResizeObserver(entries => {
  for (let entry of entries) {
    const cr = entry.contentRect;
var parentWidth = parent.clientWidth;
var parentHeight = parent.clientHeight;

var stgw = parent.clientWidth;
var stgh = parent.clientHeight;

canvas.width = parentWidth;
canvas.height = parentHeight;

		var loffset = 0;
		var toffset = 0;
    // console.log('Element:', entry.target);
    // console.log(`Element size: ${cr.width}px x ${cr.height}px`);
    // console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
  }
});

// Observe one or multiple elements
ro.observe(parent);
	
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var parentWidth = parent.clientWidth;
var parentHeight = parent.clientHeight;

var stgw = parent.clientWidth;
var stgh = parent.clientHeight;

canvas.width = parentWidth;
canvas.height = parentHeight;

		var loffset = 0;
		var toffset = 0;

		function _pexresize() {
			var cw = window.innerWidth;
			var ch = window.innerHeight;
			if (cw<=ch*stgw/stgh) {
				loffset = 0;
				toffset = Math.floor(ch-(cw*stgh/stgw))/2;
				canvas.style.width = cw + "px";
				canvas.style.height = Math.floor(cw*stgh/stgw) + "px";
			} else {
				loffset = Math.floor(cw-(ch*stgw/stgh))/2;
				toffset = 0;
				canvas.style.height = ch + "px";
				canvas.style.width = Math.floor(ch*stgw/stgh) + "px";
			}
			canvas.style.marginLeft = loffset +"px";
			canvas.style.marginTop = toffset +"px";
		}
		// _pexresize();

		var count = 15;
		var lcount = 6;

		var layer = [];
		var layery = [];

		ctx.fillStyle = "rgba(255,255,255,0.5)";
		for (var l=0;l<lcount;l++) {
			ctx.clearRect(0,0,stgw,stgh);
			for (var i=0;i<count*(lcount-l)/1.5;i++) {
				var myx = Math.floor(Math.random()*stgw);
				var myy = Math.floor(Math.random()*stgh);
				var myh = 4*2+3;
				var myw = myh/10;
				ctx.beginPath();
				ctx.moveTo(myx,myy);
				ctx.lineTo(myx+myw,myy+myh);
				ctx.arc(myx, myy+myh, myw, 0, 1 * Math.PI);
				ctx.lineTo(myx-myw,myy+myh);
				ctx.closePath();
				ctx.fill();
			}
			layer[l] = new Image();
			layer[l].src = canvas.toDataURL("image/png");
			layery[l] = 0;

		}
		var stt = 0;
		var str = Date.now()+Math.random()*4000;
		var stact = false;

		function animate() {
			ctx.clearRect(0,0,stgw,stgh);

			for (var l=0;l<lcount;l++) {
				layery[l] += (l+1.5)*5;
				if (layery[l]>stgh) {

					layery[l] =layery[l]-stgh;
				}
				ctx.drawImage(layer[l],0,layery[l]);
				ctx.drawImage(layer[l],0,layery[l]-stgh);
			}
			if (Date.now()>str) {
				stact = true;
			}
			if (stact) {
				stt++;
				if (stt<5+Math.random()*10) {
					var ex = stt/30;
				} else {
					var ex = (stt-10)/30;
				}
				if (stt>20) {
					stt = 0;
					stact = false;
					str = Date.now()+Math.random()*8000+2000;
				}

				ctx.fillStyle = "rgba(255,255,255,"+ex+")";
				ctx.fillRect(0,0,stgw,stgh);
			}
			window.requestAnimationFrame(animate);
		}


		animate();

      // RAIN END 
      //--------------CONTACT CAPTCHA FORM SUBMISSION --------------
        // CONTACT FORM ERROR CHECK START
         // SANITIZE FIRST NAME
     
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
		success: function(response) {
        // Display the response from the PHP script
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

});