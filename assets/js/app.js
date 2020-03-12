var imgs = [
    'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/optin-checked.jpg',
    'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/bg-q-1.jpg',
    'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/bg-q-2.jpg',
    'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/bg-q-3.jpg',
    'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/bg-q-4.jpg',
    'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/bg-q-5.jpg',
    'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/bg-q-6.jpg',
    'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/bg-q-7.jpg',
    'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/bg-q-8.jpg',
    'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/bg-q-9.jpg',
    'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/bg-slide-NPA.jpg',
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
    handleQuestions(true)
});

$(document).on("click", ".nps-answer", function(e){
    e.preventDefault()
    var _this = $(e.target)



        $('.nps-answer').each((i) => {
                $('.nps-answer').eq(i).removeClass('selected')
        })

    if (_this.hasClass('selected')) {
        _this.removeClass('selected')
    }
    else
        _this.addClass('selected')

})

$(document).on("click", ".answer-btn", function(e){
    e.preventDefault()
    var _this = $(e.target)
    var checked = false

    if (_this.hasClass('selected')) {
        checked = true
        _this.removeClass('selected')
    }
    var checkedNumber = getNumberOfSelectedAnswers()

    if (checkedNumber === mapQuestions[index].multiple) {
        $('#questions .right .answer').each((i) => {
            if ($('#questions .right .answer').eq(i).hasClass('selected')) {
                $('#questions .right .answer').eq(i).removeClass('selected')

                return false
            }
        })
    }

    if (!checked)
        _this.addClass('selected')

})

function getNumberOfSelectedAnswers() {
    var checkedNumber = 0

    $('.answer-btn').each((i) => {
        if ($('.answer-btn').eq(i).hasClass('selected')) {
            checkedNumber++
        }
    })

    return checkedNumber
}
$(document).on("click", "#validate-question", function(e){
    e.preventDefault()
    $('#questions .right .error').html('')
    var checkedNumber = getNumberOfSelectedAnswers()

    if (checkedNumber > 0) {
        $('.answer-btn').each((i) => {
            if ($('.answer-btn').eq(i).hasClass('selected')) {
                mapAnswers.answers[index].answer.push($('.answer-btn').eq(i).text())
            }
        })
        console.log(mapAnswers)
        handleQuestions()
    }
    else {
        handleErrorQuestions()
    }

})

function handleErrorQuestions() {
    const number = mapQuestions[index].multiple

    if (number > 1) {
        $('#questions .right .error').show().html('<br />Merci de selectionner au moins une réponse')
    }
    else
        $('#questions .right .error').show().html('<br />Merci de selectionner une réponse')
}

function handleQuestions(first) {
    var height = $('#questions .right').height() - 120

    if (index >= mapQuestions.length - 1) {
        $('#questions').fadeOut('slow', () => {
            $('#nps').fadeIn('slow', () => {
            })
        })
    }
    else {
        if (!first) {
            index++
            $('#questions').fadeOut('slow', () => {
                changeQuestionElement(height)
                $('#questions').fadeIn('slow', () => {
                })
            })
        }
        else
            changeQuestionElement($('.header .right').height() - 120)

    }


}

function changeQuestionElement(heightContainer) {
    const question = mapQuestions[index]

    $('#questions .right').empty()

    $('#questions').css('background-image', `url(https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/bg-q-${index + 1}.jpg)`)
    $('#sur-title-questions').html(question.sur_title)
    $('#title-questions').html(question.title)
    $('#sub-title-questions').html(question.sub_title)

    for (var i = 0; i < question.answers.length; i++) {
        $('#questions .right').append(`<div class="wrapper"><a class="answer answer-btn" href="""></a></div>`)
        $('#questions .right .answer').eq(i).html(question.answers[i])
        const nb = Math.round(heightContainer / question.answers.length - 1)
        $('div.wrapper').css('height', nb)
    }
    $('#questions .right').append(`<button id="validate-question">Valider<span class="error"></span></button>`)
}





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

$(document).on("click", "#bt-header", function(e){
    e.preventDefault()
    if ($('.header form').css('display') === 'none') { // FIRST
        $('.header .right .inner').css('padding', '30% 42px 20px')
        $('.header form').slideDown('slow')
        $('.header .right p').slideUp('slow')
    }
    else {
        $('.header').fadeOut('slow', () => {
            $('.questions').fadeIn('slow', () => {

            })
        })
    }
})


$(document).on("click", "#bt-nps", function(e){
    e.preventDefault()
    var checked = false

    $('.nps-answer').each((i) => {
        if ($('.nps-answer').eq(i).hasClass('selected')) {
            checked = true

            return false
        }
    })

    if (checked) {
        $('#nps .error').hide()
        $('#nps').fadeOut('slow', () => {
            $('#merci').fadeIn('slow', () => {
            })
        })
    }
    else {
        $('#nps .error').show()
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
