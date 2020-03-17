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
            string += '?cid=216'
        }
    }

    if (!donateur) {
        string += '?cid=217'
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

var index = 0;
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

$(document).on("click", ".answer-btn.input", function(el) {
    var _this = $(el.target)

    _this.find('input').focus()
})

var checkedInput = false
$(document).on("focus", ".input-answer", function(el) {
    var _this = $(el.target)

    removeSelected()
    checkedInput = true
    _this.parent().parent().addClass('selected')
})

$(document).on("click", ".answer-btn", function(e){
    e.preventDefault()
    if (!checkedInput) {
        var _this = $(e.target)
        var checked = false

        if (_this.hasClass('selected')) {
            checked = true
            _this.removeClass('selected')
        }

        removeSelected()

        if (!checked)
            _this.addClass('selected')
    }
    else
        checkedInput = false


})

function removeSelected() {
    var checkedNumber = getNumberOfSelectedAnswers()

    if (checkedNumber === mapQuestions[index].multiple) {
        $('#questions .right .answer').each((i) => {
            if ($('#questions .right .answer').eq(i).hasClass('selected')) {
                $('#questions .right .answer').eq(i).removeClass('selected')

                return false
            }
        })
    }
}

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
                if ($('.answer-btn').hasClass('input')) {
                    mapAnswers.answers[index].answer.push($('.answer-btn').find('input').val())
                }
                else {
                    mapAnswers.answers[index].answer.push($('.answer-btn').eq(i).text())
                }
            }
        })
        if (mapQuestions[index].sortable) {
            $('.answer-sortable').each((i) => {
                mapAnswers.answers[index].answer.push($('.answer-sortable').eq(i).text())
            })
        }
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


$(document).on("click", ".answers-arrow-down", function(e) {
    const question = mapQuestions[index]
    const parent = $(e.target).parent().parent()

    $(e.target).parent().parent().before(parent.next())

    for (var i = 0; i < question.answers.length; i++) {
        $('#questions .right .wrapper').eq(i).find('.answers-arrow').remove()

        if (i === 0) {
            $('#questions .right .wrapper').eq(i).append(`
               <a class="answers-arrow answers-arrow-down"><img class="" src="https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/icon-arrow-right.png" alt="" /></a>
            `)
        }
        else if (i !== 0 && i !== question.answers.length - 1) {
            $('#questions .right .wrapper').eq(i).append(`
               <a class="answers-arrow answers-arrow-down"><img class="" src="https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/icon-arrow-right.png" alt="" /></a>
               <a class="answers-arrow answers-arrow-up"><img class="" src="https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/icon-arrow-right.png" alt="" /></a>
            `)
        }
        else if (i === question.answers.length - 1) {
            $('#questions .right .wrapper').eq(i).append(`
               <a class="answers-arrow answers-arrow-up"><img class="" src="https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/icon-arrow-right.png" alt="" /></a>
            `)
        }
    }
})
$(document).on("click", ".answers-arrow-up", function(e) {
    const question = mapQuestions[index]
    const parent = $(e.target).parent().parent()
    $(e.target).parent().parent().after(parent.prev())

    for (var i = 0; i < question.answers.length; i++) {
        $('#questions .right .wrapper').eq(i).find('.answers-arrow').remove()

        if (i === 0) {
            $('#questions .right .wrapper').eq(i).append(`
               <a class="answers-arrow answers-arrow-down"><img class="" src="https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/icon-arrow-right.png" alt="" /></a>
            `)
        }
        else if (i !== 0 && i !== question.answers.length - 1) {
            $('#questions .right .wrapper').eq(i).append(`
               <a class="answers-arrow answers-arrow-down"><img class="" src="https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/icon-arrow-right.png" alt="" /></a>
               <a class="answers-arrow answers-arrow-up"><img class="" src="https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/icon-arrow-right.png" alt="" /></a>
            `)
        }
        else if (i === question.answers.length - 1) {
            $('#questions .right .wrapper').eq(i).append(`
               <a class="answers-arrow answers-arrow-up"><img class="" src="https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/icon-arrow-right.png" alt="" /></a>
            `)
        }
    }
})

function changeQuestionElement(heightContainer, newIndex) {
    const saveIndex = newIndex || index
    const question = mapQuestions[saveIndex]

    $('#questions .right').empty()



    $('#questions').css('background-image', `url(https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/bg-q-${index + 1}.jpg)`)
    $('#sur-title-questions').html(question.sur_title)
    $('#title-questions').html(question.title)
    if ($(window).width() < 640 && question.sub_title_small)
        $('#sub-title-questions').html(question.sub_title_small)
    else
        $('#sub-title-questions').html(question.sub_title)

    if (question.sortable) {
        $('#questions .right').attr('id', 'sortable')
        $( "#sortable" ).sortable({
            cancel: ".sortable-hint"
        });
        $( "#sortable" ).disableSelection();
        if ($(window).width() > 640) {
            for (var i = 0; i < question.answers.length; i++) {
                if (i === 0) {
                    $('#questions .right').append(`<div class="sortable-hint first">
                        <span>La plus importante</span>
                    </div>`)
                }
                $('#questions .right').append(`<div class="wrapper sortable-container">
                <div class="answer answer-sortable" href="""></div>
                </div>`)

                $('#questions .right .answer').eq(i).html(question.answers[i])

            if (i === question.answers.length - 1) {
                    $('#questions .right').append(`<div class="sortable-hint last">
                        <span>La moins importante</span>
                    </div>`)
                }
            }
        }
        else {
            $('#questions .right').append(`<div class="sortable-hint first">
                        <span>La plus importante</span>
                    </div>`)
            for (var i = 0; i < question.answers.length; i++) {
                if (i === 0) {

                    $('#questions .right').append(`<div class="wrapper sortable-container">
                <a class="answers-arrow answers-arrow-down"><img class="" src="https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/icon-arrow-right.png" alt="" /></a>
                <div class="answer answer-sortable" href="""></div>
                </div>`)
                }
                else if (i !== 0 && i !== question.answers.length - 1) {
                    $('#questions .right').append(`<div class="wrapper sortable-container">
                <a class="answers-arrow answers-arrow-down"><img class="" src="https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/icon-arrow-right.png" alt="" /></a>
                <a class="answers-arrow answers-arrow-up"><img class="" src="https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/icon-arrow-right.png" alt="" /></a>
                <div class="answer answer-sortable" href="""></div>
                </div>`)
                }
                else if (i === question.answers.length - 1) {

                    $('#questions .right').append(`<div class="wrapper sortable-container">
                <a class="answers-arrow answers-arrow-up"><img class="" src="https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/spa/2020-Enquete-nationale-175ans/icon-arrow-right.png" alt="" /></a>
                <div class="answer answer-sortable" href="""></div>
                </div>`)
                }

                $('#questions .right .answer').eq(i).html(question.answers[i])

            }
            $('#questions .right').append(`<div class="sortable-hint last">
                        <span>La moins importante</span>
                    </div>`)
        }
        adaptAnswerHeight(heightContainer)
    }
    else {
        $('#questions .right').removeAttr('id')
        for (var i = 0; i < question.answers.length; i++) {
            if (question.input && i === question.input) {
                $('#questions .right').append(`<div class="wrapper"><a class="answer answer-btn input" href="""></a></div>`)
                $('#questions .right .answer').eq(i).html(`<span>${question.answers[i]}</span><div class="container-input"><input type="text" placeholder="..." class="input-answer" /></div>`)
            }
            else {
                $('#questions .right').append(`<div class="wrapper"><a class="answer answer-btn" href="""></a></div>`)
                $('#questions .right .answer').eq(i).html(question.answers[i])
            }

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


            $('.nps-answer').each((i) => {
                if ($('.nps-answer').eq(i).hasClass('selected')) {
                    mapAnswers.nps = i + 1;
                }
            })
            sendData()


            $('.fixed-nav').css('width', '100% !important');
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
