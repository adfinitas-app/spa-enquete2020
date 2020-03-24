var mapAnswers = {
    answers: [
        {answer: []},
        {answer: []},
        {answer: []},
        {answer: []},
        {answer: []},
        {answer: []},
        {answer: []},
        {answer: []},
        {answer: []}
    ],
    nps: 0
}

var mapQuestions = [
    {

        sur_title: null,
        title: 'Dans quelle tranche <br />d’âge vous situez-vous&nbsp;?',
        sub_title: '*Vous avez moins de 18 ans&nbsp;? Nous sommes désolés de ne pouvoir accepter<br />vos réponses, cette enquête étant strictement réservée aux personnes majeures.',
        answers: [
            '18 – 30 ans',
            '31 – 45 ans',
            '46 – 60 ans',
            '61 – 75 ans',
            '76 ans et plus'
        ],
        multiple: 1,
        sortable: false
    },
    {

        sur_title: null,
        title: 'Possédez-vous un ou plusieurs<br />animaux de compagnie&nbsp;?<br />et si oui, LE(S)QUEL(S)&nbsp;?',
        sub_title: '(Plusieurs réponses possibles)',
        answers: [
            'Non, je ne possède pas d’animal',
            'Oui, chien',
            'Oui, chat',
            'Oui, NAC (Nouveaux Animaux de Compagnie)',
            'Oui, équidé',
            'Autre, précisez'
        ],
        multiple: 7,
        sortable: false,
        input: 5,
    },
    {

        sur_title: null,
        title: 'Êtes-vous Déjà allé(e) dans<br />un refuge pour animaux<br />abandonnés ou maltraités&nbsp;?\n',
        sub_title: null,
        answers: [
            'Oui',
            'Non',
        ],
        multiple: 1,
        sortable: false
    },
    {

        sur_title: null,
        title: 'Parmi ces différentes<br />pratiques, quelles sont celles<br />qui vous révoltent le plus&nbsp;?',
        sub_title: '(3 choix maximum)',
        answers: [
            'Les abandons<br />d’animaux',
            'Les actes de cruauté<br />envers les animaux',
            'L’exploitation des animaux<br />sauvages dans les cirques',
            'La corrida',
            'L’élevage d’animaux<br />pour leur fourrure',
            'L’expérimentation animale',
            'L’élevage intensif',
            'Le commerce<br />d’animaux sur Internet',
        ],
        multiple: 3,
        sortable: false
    },
    {

        sur_title: null,
        sub_title: null,
        title: 'AvEz-vous déjà contacté<br />la SPA ou la gendarmerie pour<br />signaler un cas de maltraitance<br />sur un animal&nbsp;?',
        answers: [
            'Oui',
            'Non',
        ],
        multiple: 1,
        sortable: false
    },
    {

        sur_title: 'La SPA dispose de 12 dispensaires où les personnes en situation de<br />précarité peuvent faire soigner gratuitement leur animal de compagnie. ',
        title: 'Que pensez-vous de cette<br />mission&nbsp;?',
        sub_title: null,
        answers: [
            'Je la trouve essentielle car<br />elle offre un accès aux soins<br />vétérinaires à des animaux<br />qui en seraient privés',
            'Je n’ai pas d’avis<br />sur cette mission\n',
            'Je ne la trouve pas utile\n',
        ],
        multiple: 1,
        sortable: false
    },
    {

        sur_title: null,
        title: 'À votre avis, quelles solutions<br />seraient les plus efficaces pour<br />lutter contre les abandons&nbsp;? ',
        sub_title: '(2 choix maximum)',
        answers: [
            'Permis de détention d’un<br />animal de compagnie<br />comme en Belgique',
            'Durcissement des peines pour<br />abandon ou mauvais traitement',
            'Interdiction de la vente<br />d’animaux en animalerie',
            'Interdiction de la vente<br />d’animaux sur Internet',
        ],
        multiple: 2,
        sortable: false
    },
    {

        sur_title: null,
        title: 'Pensez-vous qu’en France,<br />les peines* à l’encontre de ceux <br />qui abandonnent ou maltraitent les<br />animaux sont suffisantes&nbsp;?',
        sub_title: '*Aujourd’hui les actes de maltraitance envers les animaux sont passibles<br />de 2 ans d’emprisonnement et jusqu’à 30 000 € d’amende.',
        answers: [
            'Oui',
            'Non',
        ],
        multiple: 1,
        sortable: false
    },
    {

        sur_title: null,
        title: 'Quelle doit être selon vous<br />l’action prioritaire de la SPA&nbsp;?',
        sub_title: 'Positionnez votre réponse de la plus importante à la moins importante.<br />(Cliquez et maintenez votre souris pour déplacer votre réponse)',
        sub_title_small: 'Positionnez votre réponse de la plus importante à la moins importante.<br />(Cliquez sur les fléches pour trier les choix)',
        answers: [
            'Le sauvetage des animaux abandonnés<br />ou maltraités et la recherche d’un<br />nouveau foyer aimant dans le cadre<br />d’une adoption responsable',
            'L’éducation des jeunes générations<br />au respect des animaux',
            'La lutte contre les<br />trafics d’animaux ',
            'La rénovation de nos 62 refuges<br />pour offrir les meilleures conditions<br />d’accueil possibles aux animaux<br />que nous recueillons ',
            'Les actions auprès des pouvoirs<br />publics en faveur de la cause animale',
        ],
        multiple: 0,
        sortable: true
    }
]
