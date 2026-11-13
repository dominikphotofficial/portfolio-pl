export interface NavLinkItem {
  num?: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface LangItem {
  code: string;
  label: string;
  hreflang: string;
  origin: string;
  active?: boolean;
}

export const SITE_DOMAIN = 'https://pl.dominikphotofficial.lt';
export const MAIN_LT_DOMAIN = 'https://portfolio.dominikphotofficial.lt';
export const LOGO_URL = 'https://iili.io/fjNLbs4.png';

export const LANGS: LangItem[] = [
  { code: 'LT', label: 'LT', hreflang: 'lt', origin: 'https://portfolio.dominikphotofficial.lt' },
  { code: 'EN', label: 'EN', hreflang: 'en', origin: 'https://en.dominikphotofficial.lt' },
  { code: 'PL', label: 'PL', hreflang: 'pl', origin: 'https://pl.dominikphotofficial.lt', active: true },
  { code: 'RU', label: 'RU', hreflang: 'ru', origin: 'https://ru.dominikphotofficial.lt' },
  { code: 'KR', label: 'KR', hreflang: 'ko', origin: 'https://kr.dominikphotofficial.lt' },
];

export const PRIMARY_NAV: NavLinkItem[] = [
  { num: '01', label: 'Prace', href: '/' },
  { num: '02', label: 'Frozen Time', href: '/frozen-time.html' },
  { num: '03', label: 'O nas', href: '/about.html' },
  { num: '04', label: 'Biografia', href: '/biography.html' },
  { num: '05', label: 'Usługi', href: `${MAIN_LT_DOMAIN}/services.html`, external: true },
  { num: '06', label: 'Kontakt', href: '/contacts.html' },
];

export const SECONDARY_NAV: NavLinkItem[] = [
  { label: 'Polityka prywatności', href: '/privacy-policy.html' },
  { label: 'Regulamin', href: '/terms-of-service.html' },
];

export const HERO_SLIDES = [
  {
    src: 'https://i.postimg.cc/B60zcQNx/street-nature-01.jpg',
    alt: 'DP.PORTFOLIO — Światło i natura w parku Ąžuolynas',
  },
  {
    src: 'https://i.postimg.cc/PfSbZTLR/IMG-9538.jpg',
    alt: 'DP.PORTFOLIO — Žeimenos Žirgai w porannym świetle',
  },
  {
    src: 'https://i.postimg.cc/YSRMtRps/autoshow-kaunas-107.jpg',
    alt: 'DP.PORTFOLIO — Autoshow Kaunas w obiektywie',
  },
];

export const HOME_CONTENT = {
  heroTitle: 'DP.PORTFOLIO',
  heroDescriptors: 'PRZESTRZEŃ · ŚWIATŁO · EMOCJA',
  scrollCue: 'PRZEWIŃ',
  tfp: {
    kicker: 'Rejestracja TFP',
    title: 'Twórcze sesje na zasadach współpracy',
    description:
      'Szukasz wyjątkowych kadrów do swojego portfolio lub chcesz zrealizować oryginalny pomysł wizualny? Zgłoś swój udział w otwartych sesjach TFP.',
    ctaLabel: 'Zarezerwuj sesję TFP',
    ctaHref: `${MAIN_LT_DOMAIN}/tfp-booking.html`,
  },
  servicesBoard: {
    kicker: 'Usługi',
    title: 'Sesje fotograficzne i wideo',
    description:
      'Realizujemy kameralne sesje portretowe, dynamiczne reportaże motoryzacyjne oraz autorskie filmy wizerunkowe na terenie Litwy i Polski.',
    features: [
      'Mini, Standard oraz Maksi pakiety fotograficzne',
      'Reportaże motoryzacyjne, wydarzenia i sesje w plenerze',
      'Reżyseria i produkcja filmów krótkometrażowych',
    ],
    ctaLabel: 'Zobacz pakiety',
    ctaHref: `${MAIN_LT_DOMAIN}/services.html`,
    image: 'https://i.postimg.cc/Jnv9KRSs/IMG-7441.jpg',
    imageAlt: 'Sesje fotograficzne i produkcja wideo DP.PORTFOLIO',
  },
  zeimenosBoard: {
    kicker: 'Projekt partnerski',
    title: 'Žeimenos Žirgai',
    description:
      'Autorska seria fotografii konnej i reportażu z malowniczych terenów nad rzeką Żejmianą. Cisza natury, ruch i bliska więź jeźdźca z koniem.',
    tags: 'Jazda konna · Fotografia plenerowa · Nad Żejmianą',
    ctaLabel: 'Otwórz album',
    ctaHref: '/albums/zeimenos-zirgai.html',
    secondaryLabel: 'Kontakt z projektem',
    secondaryHref: '/contacts.html',
    image: 'https://i.postimg.cc/PqvGXfk5/zirgai-zeimenos-02.jpg',
    imageAlt: 'Žeimenos Žirgai — projekt partnerski DP.PORTFOLIO',
  },
  albumsHeader: {
    label: 'Wybrane serie',
  },
};

export const ABOUT_CONTENT = {
  kicker: 'O projekcie',
  title: 'Wizja & Estetyka',
  lead: 'DP.PORTFOLIO to przestrzeń twórcza łącząca fotografię dokumentalną, portretową, motoryzacyjną oraz kino autorskie pod szyldem DP | CORPORATION.',
  image: 'https://i.postimg.cc/Jnv9KRSs/IMG-7441.jpg',
  imageAlt: 'DP.PORTFOLIO — wizja i estetyka pracy z kadrem',
  pillars: [
    {
      num: '01',
      title: 'Przestrzeń',
      text: 'Każde miejsce ma własny rytm — od monumentalnych pałaców Łotwy i Litwy, przez podwórka Warszawy, aż po leśne ścieżki Ąžuolynas. Szukamy architektury i pejzażu, które dopełniają historię kadru.',
    },
    {
      num: '02',
      title: 'Światło',
      text: 'Pracujemy przede wszystkim ze światłem zastanym — złotą godziną, zimowym odbiciem śniegu i miękkim cieniem parkowych alei. Pozwala to zachować naturalną głębię i brak sztuczności.',
    },
    {
      num: '03',
      title: 'Emocja i Kolaboracje',
      text: 'Wierzymy w wymianę perspektyw. Polska edycja DP.PORTFOLIO otwiera miejsce na międzynarodowe kolaboracje, czego przykładem jest wspólny album z Wanią Honcharukiem z Warszawy.',
    },
  ],
  corpTitle: 'DP | CORPORATION',
  corpText:
    'Niezależna inicjatywa kreatywna założona przez Dominika Šuškeviča. Łączy archiwum fotografii artystycznej, produkcję krótkometrażowego kina („Frozen Time: What If”) oraz otwarte projekty dokumentalne w Europie Środkowo-Wschodniej.',
};

export const BIOGRAPHY_CONTENT = {
  kicker: 'Dossier autora',
  title: 'Dominik Šuškevič',
  lead: 'Fotograf, twórca wizualny i reżyser projektu DP.PORTFOLIO oraz krótkometrażowego filmu „Frozen Time: What If”.',
  portrait: 'https://i.postimg.cc/GtJB0hqn/Portrait-nuotrauka-1.jpg',
  portraitAlt: 'Dominik Šuškevič — portret autora DP.PORTFOLIO',
  chapters: [
    {
      num: '01',
      title: 'Początki i obserwacja codzienności',
      text: 'Pierwsze serie powstawały podczas długich spacerów po Kownie, Świętej i mniejszych litewskich miejscowościach. Zamiast reżyserowanych póz liczyła się uważność wobec detalu: faktury drewna, światła w oknach dworów oraz ruchu przyrody.',
    },
    {
      num: '02',
      title: 'Dziedzictwo architektoniczne i portret',
      text: 'W kolejnych latach powstały cykle poświęcone zabytkowym rezydencjom i miejscom pamięci — od Pałacu Wielkich Książąt w Wilnie i Dworu w Cirkliškis, przez Dom Miko i Kiprasa Petrauskasów, aż po pałac w Rundāle na Łotwie.',
    },
    {
      num: '03',
      title: 'Kultura motoryzacyjna i dynamika miasta',
      text: 'Równolegle rozwinął się nurt fotografii motoryzacyjnej i miejskiej. Zloty Car Meet Kaunas, Autoshow, klasyczne BMW E36 oraz spotkania NOKA pozwoliły połączyć precyzję geometrii z energią nocnych i wieczornych wydarzeń.',
    },
    {
      num: '04',
      title: 'Kino autorskie i międzynarodowe kolaboracje',
      text: 'Realizacja filmu „Frozen Time: What If” otworzyła nowy rozdział narracji filmowej, a wielojęzyczna platforma DP.PORTFOLIO (LT / EN / PL / RU / KR) umożliwiła współpracę z twórcami z innych krajów — w tym warszawską serię z Wanią Honcharukiem.',
    },
  ],
  filmSpotlight: {
    kicker: 'Wyróżnienie filmowe',
    title: 'Frozen Time: What If',
    text: 'Autorski film krótkometrażowy o zatrzymanym czasie, wyborach i pamięci, zrealizowany z naciskiem na nastrojowe zdjęcia i minimalistyczny montaż.',
    poster: 'https://i.postimg.cc/9FtL9g39/Frozen-Time-poster.png',
    posterAlt: 'Plakat filmu Frozen Time: What If',
    ctaLabel: 'Poznaj projekt filmowy',
    ctaHref: '/frozen-time.html',
  },
};

export const FROZEN_TIME_CONTENT = {
  kicker: 'Projekt filmowy',
  title: 'Frozen Time: What If',
  lead: 'Krótkometrażowa opowieść wizualna o chwili, w której czas przestaje płynąć, a jedno spojrzenie zmienia znaczenie całej przeszłości.',
  poster: 'https://i.postimg.cc/9FtL9g39/Frozen-Time-poster.png',
  posterAlt: 'Oficjalny plakat filmu Frozen Time: What If',
  authorImage: 'https://i.postimg.cc/GtJB0hqn/Portrait-nuotrauka-1.jpg',
  authorAlt: 'Dominik Šuškevič na planie filmu Frozen Time',
  synopsisTitle: 'Zarys fabuły',
  synopsis: [
    '„Frozen Time: What If” bada granicę między wspomnieniem a decyzją. Bohaterowie poruszają się w ciszy przestrzeni, w której każdy gest nabiera ciężaru fotograficznego kadru.',
    'Projekt łączy estetykę fotografii DP.PORTFOLIO z językiem kina — długimi ujęciami, naturalnym światłem oraz oszczędną, precyzyjną kompozycją dźwięku.',
  ],
  specs: [
    { label: 'Reżyseria i zdjęcia', value: 'Dominik Šuškevič' },
    { label: 'Produkcja', value: 'DP | CORPORATION' },
    { label: 'Format', value: 'Film krótkometrażowy' },
    { label: 'Rok premiery', value: '2025 / 2026' },
  ],
};

export const CONTACTS_CONTENT = {
  kicker: 'Kontakt',
  title: 'Porozmawiajmy o projekcie',
  lead: 'Zapraszamy do kontaktu w sprawie współpracy fotograficznej, kolaboracji twórczych na terenie Polski i Litwy oraz zapytań medialnych.',
  email: 'info@dominikphotofficial.lt',
  instagramHandle: '@dominikphotofficial',
  instagramUrl: 'https://www.instagram.com/dominikphotofficial/',
  locations: 'Wilno · Kowno · Warszawa',
  formLabels: {
    name: 'Imię i nazwisko',
    email: 'Adres e-mail',
    subject: 'Temat wiadomości',
    message: 'Treść wiadomości',
    submit: 'Wyślij wiadomość',
    success:
      'Dziękujemy za wiadomość. Przygotowaliśmy podsumowanie — możesz również wysłać je bezpośrednio na adres info@dominikphotofficial.lt.',
  },
};
