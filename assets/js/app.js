var imgs = [
    'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/optin-checked.jpg'
]

var mapQuestions = [
    {
        index: 0,
        title: 'Dans quelle tranche <br />d’âge vous situez-vous ?',
        text: '*Vous avez moins de 18 ans ? Nous sommes désolés de ne pouvoir accepter vos réponses, cette enquête étant strictement réservée aux personnes majeures.',
        answers: [
            '18 – 30 ans',
            '31 – 45 ans',
            '46 – 60 ans',
            '61 – 75 ans',
            '76 ans et plus'
        ]
    }
]

var index = 0;
preload(imgs)

$(document).foundation();

$(document).ready( function() {
    populateCountry()
    $("#f_phone").intlTelInput({
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.12/js/utils.js',
        initialCountry: ['fr']
    });

});

function populateCountry() {
    for (c of country) {
        var o = new Option(c.country, c.country);
        $(o).html(c.country);
        $("#f_country").append(o);
    }
}
$(window).scroll(function() {
});

$(document).on('closed', '.remodal', function (e) {
});



$('#bt-header').click(() => {
    if ($('.header form').css('display') === 'none') { // FIRST
        $('.header .right').css('padding', '10% 42px 20px')
        $('.header form').slideDown('slow')
        $('.header .right p').slideUp('slow')
    }
})







function preload(arguments) {
    var images = [];
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = arguments[i];
    }
}

function scrollNext(next) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: next.offset().top
    }, 800, function(){

    });
}
function getUserInUrl() {
    let p = extractUrlParams();

    let string = ''

    if (p['email'] && p['email'] !== "undefined")
        string += ("&email=" + p['email']);
    if (p['wv_email'] && p['wv_email'] !== "undefined")
        string += ("&email=" + p['wv_email']);
    if (p['wv_firstname'] && p['wv_firstname'] !== "undefined")
        string += ("&firstname=" + p['wv_firstname']);
    if (p['firstname'] && p['firstname'] !== "undefined")
        string += ("&firstname=" + p['firstname']);
    if (p['wv_lastname'] && p['wv_lastname'] !== "undefined")
        string += ("&lastname=" + p['wv_lastname']);
    if (p['lastname'] && p['lastname'] !== "undefined")
        string += ("&lastname=" + p['lastname']);

    string += "&lang=fr_FR"

    return string
}

function fillLink() {
    let p = extractUrlParams();

    let string = "";
    let code_media = "";
    let donateur = false;

    if (p['reserved_code_media'] && p['reserved_code_media'] !== "undefined") {
        code_media = p['reserved_code_media'];
        if (p['reserved_code_media'].indexOf("W19F") !== -1) //PROSPECT
            donateur = true;
    }
    else {
        code_media = 'W19PP0ZZ'
    }

    if (donateur) {
        string += "?cid=228&reserved_code_media=" + code_media;
    }
    else {
        string += "?cid=229&reserved_code_media=" + code_media;
    }

    changeAmountDon(donateur)

    string += getUserInUrl()

    $('.link-don').each(function() {
        let src = $(this).attr('href');
        $(this).attr('href', src + string);
    });

}

function extractUrlParams(){
    var t = document.location.search.substring(1).split('&'); var f = [];
    for (var i=0; i<t.length; i++){
        var x = t[ i ].split('=');
        f[x[0]]=decodeURIComponent(x[1]);
    }
    return f;
};
