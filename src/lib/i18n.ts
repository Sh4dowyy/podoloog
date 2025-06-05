export type Language = 'et' | 'ru';

export const translations = {
  et: {
    // Navigation
    home: 'Avaleht',
    products: 'Tooted',
    biomechanics: 'Biomehaanika',
    services: 'Teenused',
    pricing: 'Hinnad',
    reviews: 'Arvustused',
    credentials: 'Diplomid ja hinnangud',
    admin: 'Admin',
    profile: 'Profiil',
    account: 'Konto',
    socials: 'Sotsiaalmeedia',
    login: 'Logi sisse',
    logout: 'Logi välja',
    
    // Header
    name: 'Alla Hüvenen',
    profession: 'Podoloog',
    
    // Auth
    signIn: 'Logi sisse',
    signOut: 'Logi välja',
    signUp: 'Registreeru',
    continueWithGoogle: 'Jätka Google\'iga',
    email: 'E-post',
    password: 'Parool',
    confirmPassword: 'Kinnita parool',
    forgotPassword: 'Unustasid parooli?',
    dontHaveAccount: 'Pole kontot?',
    alreadyHaveAccount: 'On juba konto?',
    createAccount: 'Loo konto',
    signInToManage: 'Logi sisse portfoolio sisu haldamiseks',
    backToPortfolio: 'Tagasi portfooliosse',
    
    // Admin Dashboard
    welcome: 'Tere tulemast!',
    adminDashboard: 'Admini paneel',
    dashboardDescription: 'Halda oma portfoolio sisu ja seadeid',
    blogManagement: 'Blogi haldamine',
    blogDescription: 'Loo ja redigeeri oma blogi postitusi',
    profileSettings: 'Profiili seaded',
    profileDescription: 'Uuenda oma konto teavet',
    analytics: 'Analüütika',
    analyticsDescription: 'Vaata oma saidi statistikat',
    
    // Profile Settings
    accountInformation: 'Konto teave',
    displayName: 'Kuvatav nimi',
    bio: 'Elulugu',
    website: 'Veebileht',
    location: 'Asukoht',
    saveChanges: 'Salvesta muudatused',
    
    // Blog Management
    blogPosts: 'Blogi postitused',
    newPost: 'Uus postitus',
    title: 'Pealkiri',
    author: 'Autor',
    date: 'Kuupäev',
    status: 'Olek',
    actions: 'Tegevused',
    published: 'Avaldatud',
    draft: 'Mustand',
    edit: 'Redigeeri',
    delete: 'Kustuta',
    
    // Common
    loading: 'Laadimine...',
    error: 'Viga',
    success: 'Edukalt',
    cancel: 'Tühista',
    confirm: 'Kinnita',
    
    // Todo Demo
    myTasks: 'Minu ülesanded',
    addNewTask: 'Lisa uus ülesanne',
    taskCompleted: 'Ülesanne täidetud',
    
    // Sample blog posts
    samplePost1Title: 'Jalahigistuse ennetamine suvel',
    samplePost1Excerpt: 'Praktilised nõuanded jalahigistuse vähendamiseks ja jalgade tervena hoidmiseks kuuma ilmaga.',
    samplePost2Title: 'Küünte hooldus: alusharidus',
    samplePost2Excerpt: 'Õppige, kuidas hoida küüsi terved ja kaunis. Põhilised nõuanded igapäevaseks hoolduseks.',
    samplePost3Title: 'Millal pöörduda podoloogi poole?',
    samplePost3Excerpt: 'Märgid ja sümptomid, mis näitavad, et on aeg spetsialistile pöörduda.',
  },
  ru: {
    // Navigation
    home: 'Главная',
    products: 'Продукция',
    biomechanics: 'Биомеханика',
    services: 'Услуги',
    pricing: 'Цены',
    reviews: 'Отзывы',
    credentials: 'Дипломы и заслуги',
    admin: 'Админ',
    profile: 'Профиль',
    account: 'Аккаунт',
    socials: 'Соцсети',
    login: 'Вход',
    logout: 'Выйти',
    
    // Header
    name: 'Алла Хювенен',
    profession: 'Подолог',
    
    // Auth
    signIn: 'Войти',
    signOut: 'Выйти',
    signUp: 'Регистрация',
    continueWithGoogle: 'Продолжить с Google',
    email: 'Email',
    password: 'Пароль',
    confirmPassword: 'Подтвердите пароль',
    forgotPassword: 'Забыли пароль?',
    dontHaveAccount: 'Нет аккаунта?',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    createAccount: 'Создать аккаунт',
    signInToManage: 'Войдите для управления содержимым портфолио',
    backToPortfolio: 'Вернуться к портфолио',
    
    // Admin Dashboard
    welcome: 'Добро пожаловать!',
    adminDashboard: 'Панель администратора',
    dashboardDescription: 'Управляйте содержимым и настройками вашего портфолио',
    blogManagement: 'Управление блогом',
    blogDescription: 'Создавайте и редактируйте записи в блоге',
    profileSettings: 'Настройки профиля',
    profileDescription: 'Обновите информацию о вашем аккаунте',
    analytics: 'Аналитика',
    analyticsDescription: 'Просматривайте статистику вашего сайта',
    
    // Profile Settings
    accountInformation: 'Информация об аккаунте',
    displayName: 'Отображаемое имя',
    bio: 'О себе',
    website: 'Веб-сайт',
    location: 'Местоположение',
    saveChanges: 'Сохранить изменения',
    
    // Blog Management
    blogPosts: 'Статьи блога',
    newPost: 'Новая статья',
    title: 'Заголовок',
    author: 'Автор',
    date: 'Дата',
    status: 'Статус',
    actions: 'Действия',
    published: 'Опубликовано',
    draft: 'Черновик',
    edit: 'Редактировать',
    delete: 'Удалить',
    
    // Common
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    cancel: 'Отменить',
    confirm: 'Подтвердить',
    
    // Todo Demo
    myTasks: 'Мои задачи',
    addNewTask: 'Добавить новую задачу',
    taskCompleted: 'Задача выполнена',
    
    // Sample blog posts
    samplePost1Title: 'Профилактика потливости ног летом',
    samplePost1Excerpt: 'Практические советы по снижению потливости ног и поддержанию здоровья стоп в жаркую погоду.',
    samplePost2Title: 'Уход за ногтями: основы',
    samplePost2Excerpt: 'Узнайте, как поддерживать ногти здоровыми и красивыми. Основные советы по ежедневному уходу.',
    samplePost3Title: 'Когда обратиться к подологу?',
    samplePost3Excerpt: 'Признаки и симптомы, которые указывают на необходимость обращения к специалисту.',
  },
};

export type TranslationKey = keyof typeof translations.et;

export const getLanguageFlag = (lang: Language): string => {
  switch (lang) {
    case 'et':
      return '🇪🇪';
    case 'ru':
      return '🇷🇺';
    default:
      return '🇪🇪';
  }
};

export const getLanguageName = (lang: Language): string => {
  switch (lang) {
    case 'et':
      return 'Eesti';
    case 'ru':
      return 'Русский';
    default:
      return 'Eesti';
  }
}; 