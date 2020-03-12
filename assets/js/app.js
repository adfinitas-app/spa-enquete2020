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
let donateur = false;


function fillLink() {
    let p = extractUrlParams();
    let string = ''

    let code_media = "";

    if (p['reserved_code_media'] && p['reserved_code_media'] !== "undefined") {
        code_media = p['reserved_code_media'];
        if (p['reserved_code_media'].indexOf("W20F") !== -1) {
            donateur = true;
            string += '?cid=217'
        }
    }

    if (!donateur) {
        string += '?cid=216'
        $('#form .prospect-part').show()
    }


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
    if (p['reserved_code_media'] && p['reserved_code_media'] !== "undefined")
        string += ("&reserved_code_media=" + p['reserved_code_media']);
    else
        string += "&reserved_code_media=W20P80ZZL";


    $('#bt-don').attr('href', $('#bt-don').attr('href') + string)

}

var index = 7;
preload(imgs)

$(document).foundation();

$(window).resize( function() {
    if ($('#questions').css('display') === 'block')
        adaptAnswerHeight($(window).height() - 120)
})

$(document).ready( function() {
    populateCountry()
    $("#f_phone").intlTelInput({
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.12/js/utils.js',
        initialCountry: ['fr']
    });
    handleQuestions(true)
    fillLink()
    fillFieldsFromUrl()
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

    if (checkedNumber > 0 || mapQuestions[index].sortable) {
        mapAnswers.answers[index].answer = []
        $('.answer-btn').each((i) => {
            if ($('.answer-btn').eq(i).hasClass('selected')) {
                mapAnswers.answers[index].answer.push($('.answer-btn').eq(i).text())
            }
        })
        handleQuestions()
    }
    else {
        handleErrorQuestions()
    }

})

function handleErrorQuestions() {
    const number = mapQuestions[index].multiple

    if (number > 1) {
        $('#questions .right .error').show().html('<br />Veuillez faire au moins un choix avant de valider votre réponse')
    }
    else
        $('#questions .right .error').show().html('<br />Veuillez faire un choix avant de valider votre réponse')
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
            changeQuestionElement($(window).height() - 120)

    }


}

function adaptAnswerHeight(heightContainer) {
    const question = mapQuestions[index]

    const nb = Math.round(heightContainer / question.answers.length - 1)
    if ($(window).width() > 640)
        $('div.wrapper').css('height', nb)
}

function changeQuestionElement(heightContainer, newIndex) {
    const saveIndex = newIndex || index
    const question = mapQuestions[saveIndex]

    $('#questions .right').empty()



    $('#questions').css('background-image', `url(https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/bg-q-${index + 1}.jpg)`)
    $('#sur-title-questions').html(question.sur_title)
    $('#title-questions').html(question.title)
    $('#sub-title-questions').html(question.sub_title)

    if (question.sortable) {
        $('#questions .right').attr('id', 'sortable')
        for (var i = 0; i < question.answers.length; i++) {
            $('#questions .right').append(`<div class="wrapper sortable-container"><a class="answer answer-sortable" href="""></a></div>`)
            $('#questions .right .answer').eq(i).html(question.answers[i])

            adaptAnswerHeight(heightContainer)

            $( "#sortable" ).sortable();
            $( "#sortable" ).disableSelection();
        }
    }
    else {
        $('#questions .right').removeAttr('id')
        for (var i = 0; i < question.answers.length; i++) {
            $('#questions .right').append(`<div class="wrapper"><a class="answer answer-btn" href="""></a></div>`)
            $('#questions .right .answer').eq(i).html(question.answers[i])

            adaptAnswerHeight(heightContainer)
        }
    }


    $('#questions .right').append(`<button id="validate-question">Valider<span class="error"></span></button>`)
    $('#questions .cursor span').text(index + 1)
    $('#questions .cursor').css('left', `${index * (Math.round(100 / mapQuestions.length) + 0.2)}%`)
}

$('#back-small').click((e) => {
    e.preventDefault()

    $('.header h1').show()
    $('.header .images').show()
    $('.header .title p').show()
    $('#expand-small').show()
    $('.text-small').hide()
    $('.header .right button').css('margin-top', '110px')
    $('#filter-small').hide()
    $('.header form').hide()
    $('#back-small').hide()
})

$('#expand-small').click((e) => {
    e.preventDefault()

    $('.header h1').hide()
    $('.header .images').hide()
    $('.header .title p').hide()
    $('#expand-small').hide()
    $('.text-small').show()
    $('.header .right button').css('margin-top', '25px')
    $('#filter-small').show()
    $('#back-small').css('display','block')
})

$(document).on("click", ".answer-sortable", function(e) {
    e.preventDefault()
})
$(document).on("click", "#questions .cursor-item", function(e) {
    const i = $(e.target).index() - 1

    if (mapAnswers.answers[i] && mapAnswers.answers[i].answer.length === 0) {

    }
    else {
        index = i
        goBack(i)
    }

})


function goBack(i) {
    var height = $(window).height() - 120

    $('#questions').fadeOut('slow', () => {
        changeQuestionElement(height, i)
        $('#questions').fadeIn('slow', () => {
        })
    })



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


function extractUrlParams(){
    var t = document.location.search.substring(1).split('&'); var f = [];
    for (var i=0; i<t.length; i++){
        var x = t[ i ].split('=');
        f[x[0]]=decodeURIComponent(x[1]);
    }
    return f;
};
