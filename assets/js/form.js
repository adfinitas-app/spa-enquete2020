$(document).on("click", ".bt-header", function(e){
    e.preventDefault()
    if ($(window.width) > 640) {
        if ($('.header form').css('display') === 'none') { // FIRST
            $('.header .right button').css('margin-top', '25px')
            $('.text-small').hide()
            $('.header .right p').slideUp('slow')


            $('.header form').slideDown('slow')
            $('.header .right .inner').css('padding', '25% 42px 20px')
        }
        else {
            if (validateForm()) {
                $('.header').fadeOut('slow', () => {
                    $('.questions').fadeIn('slow')
                })
            }

        }

    }
    else {
        if ($('.header form').css('display') === 'none') { // FIRST
            if ($(window).width() < 640) {
                const nbs = ($('.iti-flag').css('background-position').split(' '))
                $('.iti-flag').css('background-position', `${parseInt(nbs[0]) + 7}px ${nbs[1]}`)
            }

            $('.header .right .inner').addClass('padding-expanded')
            $('#filter-small').show()
            $('#expand-small').hide()
            $('#back-small').css('display','block')
            $('.header form').slideDown('slow')
            $('.header .right p').slideUp('slow')
            $('.header .right .inner').css('padding', '25% 22px 20px')
        }
        else {
            if (validateForm()) {
                $('.header').fadeOut('slow', () => {
                    $('.questions').fadeIn('slow')
                })
            }

        }
    }

})

function validateForm() {
    var check = true;

    $('.error-form').hide();
    $('#form input, #form select').each( function(i) {
        $(this).removeClass('red-border');
    });


    if ($("#f_email").val() === "") {
        if (check)
            $('.error-generic').show();
        $("#f_email").addClass('red-border');
        check = false;
    }
    if (!donateur && $("#f_firstname").val() === "") {
        if (check)
            $('.error-generic').show();
        $("#f_firstname").addClass('red-border');
        check = false;
    }
    if (!donateur && $("#f_lastname").val() === "") {
        if (check)
            $('.error-generic').show();
        $("#f_lastname").addClass('red-border');
        check = false;
    }
    if ($('#f_email').val() !== "") {
        if (!validateEmail($('#f_email').val())) {
            $('.error-mail-wrong').show();
            $('#f_email').addClass('red-border');
            check = false;
        }
    }
    if ($('#f_phone').val() != "") {
        if (!$("#f_phone").intlTelInput("isValidNumber")) {
            $('.error-phone-wrong').show();
            $('#f_phone').addClass('red-border');
            check = false;
        }
    }

    if (!donateur && $('#f_civility').find(":selected").val() === '') {
        if (check)
            $('.error-generic').show();
        $('#f_civility').addClass('red-border');
        check = false;
    }

    if (!$('#f_optin').is(':checked')) {
        $('.error-optin').show();
        check = false;
    }

    if (!check) {
        $('div.error').show();
        $('form').focus();
    }

    return check;
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


function fillFieldsFromUrl() {
    var p = extractUrlParams();

    if (p['email'] && p['email'] !== "undefined") {
        $("#f_email").val(p['email']);
        $("#f_email").prop('disabled', true);
    }
    else if (p['wv_email'] && p['wv_email'] !== "undefined") {
        $("#f_email").val(p['wv_email']);
        $("#f_email").prop('disabled', true);
    }
    if (p['firstname'] && p['firstname'] !== "undefined") {
        $("#f_firstname").val(p['firstname']);
    }
    else if (p['wv_firstname'] && p['wv_firstname'] !== "undefined") {
        $("#f_firstname").val(p['wv_firstname']);
    }
    if (p['lastname'] && p['lastname'] !== "undefined") {
        $("#f_lastname").val(p['lastname']);
    }
    else if (p['wv_lastname'] && p['wv_lastname'] !== "undefined") {
        $("#f_lastname").val(p['wv_lastname']);
    }
    if (p['phone'] && p['phone'] !== "undefined") {
        $("#f_phone").val(p['phone']);
    }
}
