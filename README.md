# MyResume
    Колпикова Ксения Денисовна
    Группа: M32071
    Тема: Резюме
Я реализовала сайт, в котором, помимо моего резюме, выполнено:

1.Подписка на события загрузки страницы и выведена в подвал статистическая информация о скорости загрузки

2.«Активное» состояние меню 
 
3.Отдельная страница с Web-формой, в которой пользователь с помощью предложенных параметров мог бы создать таблицу по некоему шаблону

4.Добавление «живых» данных на уже имеющийся прототип. В качестве поставщика данных использовала сервис с Mock данными: https://jsonplaceholder.typicode.com. В качестве данных, которые предоставляет сервис из примера, я выбрала "Альбомы и фотографии"
(Поля: title (название), thumbnailUrl (ссылка на маленькое изображение), url (ссылка на изображение))

    + Инициализовала обращение к поставщику данных используя Fetch API
    + После получения ответа, скрыла preloader, десериализовала данные в JSON объект и отрендерила полученные данные.
    + Добавила обработку ошибок
    
5.Работа с библиотеками D3 (Streamgrath) и Semantic UI
