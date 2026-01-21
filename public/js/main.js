$(function(){

    $('.side-menu-toggle').on('click', menuHandler);


    function menuHandler(){
        $('.backgroundDrop').css('display', 'block');

        $('.sideMenu').css('transform', 'translateX(0)');
    }

    $('.backgroundDrop').on('click', backdropHandler);

    function backdropHandler(){
        $('.backgroundDrop').css('display', 'none');
        $('.sideMenu').css('transform', 'translateX(-100%)');
    }

    $('#cancelOut').on('click', backdropHandler);

    let prevScrollpos = window.pageYOffset;

    $(window).on('scroll', function(){
        let currentScrollPos = window.pageYOffset;
        // if(prevScrollpos > currentScrollPos){ 
        //     $('#headerNav').css('top', '0');
        //     $('.mainContent1').css('marginTop', '4.51rem');
        // }
        // else{
        //     $('#headerNav').css('top', '-4.5rem');
        //     $('.mainContent1').css("margin-top", '0');
            
        // }

        if(prevScrollpos < currentScrollPos && window.pageYOffset > 80){
            $('#headerNav').css('top', '-4.5rem');
            
        }
        else{
            $('#headerNav').css('top', '0');
            
        }



        prevScrollpos = currentScrollPos;
    });


    $('#showPostedComments').on('click', function(){
        if ($('.pass-change-results').css('display') == 'block') {
            $('.pass-change-results').css('display', 'none')
            $('.pass-change-error').css('display', 'none')
            $('.pass-change-success').css('display', 'none')

        }
        $('.commentsPosted').animate({left: '0px'});
        $('.commentsPosted').css('display', 'block');
        $('.changedPassword').animate({left: '-1500px'});
        $('.changedPassword').css('display', 'none');
    });

    $('#changePassword ').on('click', function(){
        $('.commentsPosted').animate({left: '-1500px'});
        $('.commentsPosted').css('display', 'none');
        $('.changedPassword ').animate({left: '0px'});
        $('.changedPassword').css('display', 'block');
        
    });

    $('#tryAgainButton').on('click', function(){
        $('.overlay').css('display', 'none');
        $('.commentsPosted').animate({left: '-1500px'});
        $('.commentsPosted').css('display', 'none');
        $('.changedPassword').animate({left: '0px'});
        $('.changedPassword').css('display', 'block');
    });

    $('#cancelButton').on('click', function(){
        $('.overlay').css('display', 'none');
    }); 

    $('.imagePic').on('click', function(){
        console.log($('.imagePic').html());
    })

});

