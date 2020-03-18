function sendData() {
    const p = extractUrlParams()
    const email = pureField($('#f_email').val())
    const firstname = pureField($('#f_firstname').val())
    const lastname = pureField($('#f_lastname').val())
    const adress = pureField($('#f_adress').val())
    const zipcode = pureField($('#f_zipcode').val())
    const city = pureField($('#f_city').val())
    const country = $('#f_country').find(":selected").val()
    const gender = $('#f_civility').find(":selected").val()
    const phone = getPhone()
    const reserved_code_media = p['reserved_code_media']

    const payload = {
        "reveal_lead": {
            "source": "REGIE_SOURCE",
            "contacts": [
                {
                    "app_id": 		"la-spa.fr",
                    "campaign": 	p['utm_campaign'] || '',
                    "medium": 		p['utm_medium'] || 'ORGANIC',
                    "interface": 	"LP-CLIENT",
                    "email": 		email,
                    "firstname": 	firstname,
                    "lastname": 	lastname,
                    "gender": 		gender,
                    "phone": 		phone,
                }
            ]
        },
        "woopra" : {
            "host": 	"prometer.io",
            "cv_name": 	`${firstname} ${lastname}`,
            "cv_email": email,
            'cv_phone': phone,
            'cv_civility': getCivility(gender),
            'cv_civility_dear': getCivilityDear(gender),
            'cv_gender': gender,
            'cv_firstname': firstname,
            'cv_lastname': lastname,
            /* Variables de l'événement, : préfixe : "ce_" */
            "event": 	"adfinitas_leads",	// Nom de l'événement à tracker si applicable. Non préfixé.
            'ce_email': email,
            'ce_phone': phone,
            'ce_gender': gender,
            'ce_app_id': 'la-spa.fr',
            'ce_campaign_name': p['utm_campaign'] || '',
            'ce_campaign_source': p['utm_source'] || 'DIRECT',
            'ce_campaign_medium': p['utm_medium'] || 'ORGANIC',
            'ce_interface': 'LP-CLIENT'
        },
        "mailjet" : {
            "Email": email,
            "Properties": {
                "firstname": 		firstname,
                "lastname": 		lastname,
                "civility":			getCivility(gender),
                "civility_dear":	getCivilityDear(gender),
                "sexe":				gender,
                'civility_long': getCivilityLong(gender),
                'personnalisation': getPersonnalisation(gender),
                'personnalisation_courte': getPersonnalisationCourte(gender),
                'address1': adress,
                'city': city,
                'postcode': zipcode,
                'country': country,
            },
            "addLists": ['2020-enquete-nationale'],
            "delLists": []
        },
        "db": {
            "schema": "spa_enquete20",
            "db": {
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "phone": phone,
                "civility": getCivility(gender),
                "sexe": gender,
                "name": 	`${firstname} ${lastname}`,
                "language": "fr_FR",
                "reserved_code_media" : reserved_code_media || '',
                'question_1': mapAnswers.answers[0].length > 1 ? mapAnswers.answers[0].join(',') : mapAnswers.answers[0].answer[0] ,
                'question_2': mapAnswers.answers[1].length > 1 ? mapAnswers.answers[1].join(',') : mapAnswers.answers[1].answer[0] ,
                'question_3': mapAnswers.answers[2].length > 1 ? mapAnswers.answers[2].join(',') : mapAnswers.answers[2].answer[0] ,
                'question_4': mapAnswers.answers[3].length > 1 ? mapAnswers.answers[3].join(',') : mapAnswers.answers[3].answer[0] ,
                'question_5': mapAnswers.answers[4].length > 1 ? mapAnswers.answers[4].join(',') : mapAnswers.answers[4].answer[0] ,
                'question_6': mapAnswers.answers[5].length > 1 ? mapAnswers.answers[5].join(',') : mapAnswers.answers[5].answer[0] ,
                'question_7': mapAnswers.answers[6].length > 1 ? mapAnswers.answers[6].join(',') : mapAnswers.answers[6].answer[0] ,
                'question_8': mapAnswers.answers[7].length > 1 ? mapAnswers.answers[7].join(',') : mapAnswers.answers[7].answer[0] ,
                'question_9': mapAnswers.answers[8].length > 1 ? mapAnswers.answers[8].join(',') : mapAnswers.answers[8].answer[0] ,
                'nps': mapAnswers.nps ,
            }
        },
    }

    // console.log(payload)
    makeCorsRequest(payload)
}


/*
 * Debut de la lib
 */

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}
function makeCorsRequest(data) {
    var url = 'https://adfinitas-io.herokuapp.com/api/v1/organization/3a15acaa-ae68-49cf-9244-616cb46067ff/webhook/97ea9471-84a7-4e59-8b06-533b8a483f77';
    var body = JSON.stringify(data);
    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
}

/*
 * Fin de la lib
 */
function getUTM() {
    var p = extractUrlParams();

    if (p['utm_source'] && p['utm_source'] !== "undefined")
        return p['utm_source'];
    else
        return "";
}
function getReservedCodeMedia() {
    var p = extractUrlParams();

    if (p['reserved_code_media'] && p['reserved_code_media'] !== "undefined")
        return p['reserved_code_media'];
    else
        return "";
}
function getNPS() {
    if ($('#form .nps-form a.title').text().length <= 2 ) {
        return $('#form .nps-form a.title').text();
    }
    return "";
}
function getPhone() {
    return $('#f_phone').intlTelInput("getNumber");
}

function getPersonnalisationCourte(gender) {
    return getCivilityLong(gender).toUpperCase() + " " + pureField($('#f_lastname').val().toUpperCase());
}

function getPersonnalisation(gender) {
    return getCivilityDear(gender) + " " + getCivilityLong().toUpperCase() + " " + pureField($('#f_lastname').val().toUpperCase());
}

function getList() {
    var data = [];
    return data;
}

function pureField(string) {
    return (string.replace(/'/g, "%27").replace(/"/g, "&quot;"));
}


function getOptin() {
    if ($('#f_optin').is(":checked")) {
        return "false";
    }
    return "true";
}

function getCivility(gender) {
    if (gender === 'F')
        return "Mme";
    else
        return 'M';
}

function getCivilityDear(gender) {
    if (gender === 'F')
        return "Chère";
    else
        return 'Cher';
}

function getCivilityLong(gender) {
    if (gender === 'F')
        return "Madame";
    else
        return 'Monsieur';
}
