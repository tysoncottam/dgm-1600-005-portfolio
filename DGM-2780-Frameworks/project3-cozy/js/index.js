// Custom JS here

$(document).ready( function() {
    $("#my-header").hide(); //hide your div initially
    var topOfOthDiv = $("#start-header").offset().top;
    $(window).scroll(function() {
        if($(window).scrollTop() > topOfOthDiv) 
        { 
            $("#my-header").show();
            $("#my-header").addClass('active');
        }
        else if($(window).scrollTop() < topOfOthDiv) 
        { 
            $("#my-header").removeClass('active');
        }
    });
});

//-------------------

document.getElementById("hidden-menu-id").addEventListener("click", myFunction1);

function myFunction1()
{
    $("#my-menu").show();
    $("#my-header-menu").addClass('active');
    $("#my-menu").addClass('active');
}

document.getElementById("my-close-menu").addEventListener("click", myFunction2);

function myFunction2()
{
    $("#my-menu").hide();
    $("#my-header-menu").removeClass('active');
    $("#my-menu").removeClass('active');
}

//-------------------

document.getElementById("hidden-menu-id2").addEventListener("click", myFunction3);

function myFunction3()
{
    $("#my-menu2").show();
    $("#my-header-menu2").addClass('active');
    $("#my-menu2").addClass('active');
}

document.getElementById("my-close-menu2").addEventListener("click", myFunction4);

function myFunction4()
{
    $("#my-menu2").hide();
    $("#my-header-menu2").removeClass('active');
    $("#my-menu2").removeClass('active');
}