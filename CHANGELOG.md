# История изменений (Changelog)

Все значимые изменения проекта описаны в этом файле. Формат основан на [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Поскольку у проекта пока нет версий релизов, записи сгруппированы по датам.
## 2026-11-16
• Опциональные бортики для откидных крышек. Добавлен переключатель «Включить бортики» (Enable lips), который добавляет внутренние бортики к откидной крышке. При активации становятся доступны отдельные настройки допуска посадки и высоты бортика (по аналогии с обычной крышкой). Конструкция бортиков позволяет им входить внутрь коробки без ущерба для шарнирного механизма и геометрии его крепления. При выключенном переключателе крышка остаётся плоской.
• Настройка высоты канта муфты. Появился отдельный параметр для регулировки высоты канта (бортика) выдвижной муфты независимо от остальных габаритов крышки.
• Удаление отдельных сегментов перегородок. В визуальный редактор перегородок добавлен режим «Удалить произвольный сегмент» (Remove arbitrary divider). Клик по перегородке в этом режиме удаляет только участок между ближайшими пересечениями со стенками или другими перегородками, оставляя остальную часть целой.
	• После удаления сегмента кнопка выравнивания «Равномерно» (Evenly) блокируется, чтобы защитить изменённую разметку от случайного сброса. Разблокировать её можно только через «Очистить всё» (Clear all).
	• Все пользовательские разрывы сохраняются в файле проекта и учитываются при генерации финальной геометрии коробки.

## 2026-11-15

### Добавлено
- **Регулируемое скругление углов коробки.** В группе Walls вкладки Box появился ползунок радиуса скругления (0–20 мм с шагом 0,5 мм; максимальное значение ограничивается габаритами основания коробки). Радиус скругляет внешние вертикальные углы корпуса и учитывается при построении совместимой геометрии крышки. Для кожуха и крышки-колпака также используются подходящие скруглённые профили: внутренние углы повторяют форму коробки с учётом толщины стенок и посадочного зазора. В старых сохранённых проектах, где значение радиуса отсутствует, углы остаются прямыми.
- **Накладная крышка-колпак Cap.** Добавлен отдельный тип закрытия `Cap` наряду с крышкой с посадочным бортиком `Lid`, выдвижным кожухом `Sleeve` и откидной крышкой. Колпак надевается сверху на коробку и имеет полость с нижней стороны. Его внутренние размеры рассчитываются с учётом размеров коробки, толщины стенок и посадочного допуска. Внешний профиль углов повторяет заданный радиус скругления коробки.

### Изменено
- **Обновлён README.** Описание возможностей и руководство пользователя дополнены сведениями о четырёх типах закрытия, настройке радиуса скругления, актуальном рабочем процессе Box/Lid/Print, менеджере проектов, автоматическом размещении деталей и проверке целостности STL-моделей.

## 2026-10-27

### Изменено
- **Переработан интерфейс приложения.** Добавлены тёмная тема, верхняя панель и три вкладки боковой панели: Box, Lid и Print. Калькуляторы объёма, отсеков и разделителей перенесены в диалог Start from… на вкладке Box. Управление проектами, обмен ссылками и импорт/экспорт JSON перенесены в меню проекта и меню `⋯`. Настройки Box и Lid сгруппированы в сворачиваемые секции с краткими описаниями. Длинные пояснения заменены подсказками. Выбор типа закрытия объединён в переключатель None / Lid / Sleeve / Hinged. Ползунки ширины, глубины и высоты имеют разные цвета. Экспорт отдельных деталей перенесён на вкладку Print, где также добавлен выбор материала PLA / PETG / ABS для оценки массы. Информация об авторах и лицензии закреплена внизу боковой панели. Поведение генератора при этом не менялось.
- **Добавлена отдельная страница менеджера проектов.** Карточки показывают изометрический эскиз коробки в реальных пропорциях, размеры, количество отсеков, тип закрытия и дату сохранения. Доступны открытие, дублирование и удаление проектов. Текущий проект отмечается как открытый в редакторе; для несохранённой работы отображается отдельная карточка с возможностью задать имя и сохранить проект. Добавлены поиск по имени или размеру, сортировка по дате или имени, создание проекта, импорт JSON и экспорт всей библиотеки. 3D-сцена остаётся загруженной при переходе в менеджер.
- **Добавлен визуальный редактор разделителей с видом сверху.** Разделители можно перемещать мышью или клавишами со стрелками, добавлять по ширине и глубине, равномерно распределять и удалять. Режим Visual / Numbers позволяет задавать координаты в миллиметрах. Для каждой ячейки отображается полезный размер. Разделители нельзя перемещать за соседние. Старые счётчики количества разделителей и отдельные ползунки их положения заменены новым редактором.
- **Добавлен изометрический вид с размерными линейками.** Переключатель Perspective / Isometric находится в 3D-просмотре, а выбранный режим запоминается. Изометрический режим использует ортографическую камеру с фиксированным углом и автоматически подбирает масштаб. Перетаскивание перемещает сцену, не вращая камеру. Для коробки и расположенных рядом деталей отображаются размерные линейки. В перспективном режиме сохраняются свободное вращение камеры и прежний масштаб.
- **Выемки для пальцев на наружных стенках теперь можно отключить.** Переключатель Notch outer walls позволяет вырезать пазы только в разделителях, сохраняя наружные стенки сплошными. Отдельный переключатель Notch divider walls управляет выемками в разделителях. Если оба переключателя выключены, выемки не создаются. Добавлены проверки целостности сетки для новых сочетаний параметров.
- **Разделители могут быть ниже верхнего края коробки.** При наличии разделителей появляется ползунок Divider height, задающий высоту от дна. По умолчанию разделители доходят до края коробки и следуют за её высотой. Если задать меньшую высоту, стенки коробки продолжаются выше разделителей. Геометрия остаётся единой и герметичной; выемки и посадочный бортик учитывают высоту разделителей.
- **Функция Resize box to fill plate заменена автоматическим размещением деталей.** На вкладке Print появился переключатель Auto-arrange parts. Предпросмотр размещает коробку и крышку/кожух рядом на столе, проверяя разные варианты расположения и поворот деталей на 90°. Предупреждения различают ситуацию, когда деталь не помещается сама по себе, и ситуацию, когда детали помещаются по отдельности, но не вместе. Раскладка предпросмотра не меняет экспортируемые STL.
- **Для выемок добавлена настройка Rounded bottom.** Она превращает прямоугольную выемку в U-образную, скругляя нижние углы. Радиус зависит от ширины паза. Настройка применяется к наружным стенкам и разделителям; контур вырезается цельной формой для сохранения чистой сетки.
- **Добавлен переключатель Cutouts in the dividers.** Он позволяет применять выбранный паттерн отверстий также к стенкам-разделителям. Отверстия не пересекают наружные стенки, дно, верхний край разделителя, другие разделители и выемки для пальцев. Слишком узкие или низкие разделители остаются сплошными.
- **Добавлен переключатель Cutouts in the floor.** Он позволяет отключить вырезы в дне и оставить его ровным и сплошным, сохранив паттерн на стенках.
- **Лицензия изменена с MPL 2.0 на Apache 2.0.** Добавлены файлы `LICENSE` и `NOTICE`; в `package.json` указаны лицензия и автор. Версии, опубликованные до этой даты, остаются доступными на условиях MPL 2.0.

### Исправлено
- **Задняя стенка оставалась сплошной после отключения откидной крышки.** При переключении с Hinged на None или Sleeve флаг петли мог оставаться включённым в настройках. Теперь задняя стенка сохраняется сплошной только при реально включённой откидной крышке.
- **Калькуляторы Start from… выдавали неточные размеры отсеков.** Координаты разделителей теперь рассчитываются от внутренней поверхности стенки до центральной линии разделителя и хранятся с точностью до двух знаков. Калькулятор Items учитывает фактическую толщину разделителей. Итоговые размеры больше не округляются до целых миллиметров; добавлены проверки точности.

## 2026-09-28

### Изменено
- **Переключение режима размеров корректно учитывает допуск посадки.** При переходе в режим Interior размеры коробки увеличиваются на величину допуска, а при возврате в Exterior этот зазор вычитается. Переключение туда и обратно без изменения других параметров не меняет итоговые размеры.

### Исправлено
- **Слишком низкое ограничение внешних размеров.** В режиме Exterior максимальные значения ширины, глубины и высоты больше не уменьшаются на толщину стенок и внутренний допуск. Ограничение соответствует размеру стола принтера.
- **Накопление погрешности вычислений.** Производные размеры в режиме Interior округляются до двух знаков после запятой, а размеры в 3D-просмотре отображаются с точностью до одного знака.

### Добавлено
- **Режим ввода внутренних размеров.** Переключатель Dimensions are позволяет задавать не внешние габариты, а целевые размеры внутренней полости. Внешние размеры рассчитываются автоматически с учётом толщины стенок. Ползунок Tolerance (по умолчанию 0,3 мм) добавляет зазор. При изменении допуска или толщины стенок заданный размер полости сохраняется, а внешний размер пересчитывается. В сохранённых проектах `width`, `depth` и `height` по-прежнему содержат внешние размеры; режим и допуск хранятся отдельно.

## 2026-07-20

### Исправлено
- **При расчёте полезной высоты учитывается бортик крышки.** Если включена крышка с посадочным бортиком, её глубина вычитается из значения Usable interior, а калькулятор Generate with Compartments учитывает эту высоту при расчёте коробки. Это предотвращает давление крышки на содержимое. Откидные крышки и кожухи не затронуты.

## 2026-07-17

### Исправлено
- **Выемки для пальцев больше не пересекаются с пересекающимися разделителями.** При разделителях по осям X и Z стенки разбиваются на отдельные участки между пересечениями, и для каждого участка создаётся своя выемка. Она отступает от разделителей, углов и соединений на 0,5 мм. Положение Slot Position % рассчитывается внутри каждого участка; ширина ограничивается самым узким участком.

### Добавлено
- **Выемки в разделителях можно отключить.** Флажок Notch divider walls too позволяет оставлять разделители сплошными, вырезая пазы только в наружных стенках. Для старых проектов сохраняется прежнее поведение.
- Добавлены две конфигурации проверки `check:stl` для сетки разделителей X+Z и режима выемок только в наружных стенках.

## 2026-07-16

### Добавлено
- **Координаты разделителей в миллиметрах.** Ползунки разделителей X/Z показывают координату в миллиметрах рядом с процентным значением. Под каждой группой отображаются полезные размеры отсеков с учётом толщины разделителя.
- **Дополнительные пояснения в панели управления.** Уточнено, что ширина, глубина и высота на вкладке Box являются внешними размерами. Добавлены пояснения к толщине стенок, фаскам, разделителям, калькуляторам Generator, высоте бортика и диаметру петли.

## 2026-07-14

### Добавлено
- **Выемки для пальцев.** Вкладка Box получила раздел Finger Slots. Выемки прорезаются сверху вниз, чтобы было удобно доставать карты, монеты, жетоны и другие плоские предметы. X Walls отвечает за левую и правую стенки и разделители X; Z Walls — за переднюю и заднюю стенки и разделители Z; Both включает оба направления. Настраиваются ширина, глубина и положение. Выемки ограничены внутренней областью, не затрагивают углы и фаски и заканчиваются над дном. При включённых петлях задняя стенка остаётся сплошной. Паттерны отверстий учитывают положение выемок.
- **Проверка целостности полигональной сетки.** Добавлен валидатор `src/utils/meshValidator.ts`, который проверяет открытые и неманифолдные рёбра, перевёрнутые и дублирующиеся грани, треугольники нулевой площади и неправильно ориентированные оболочки. Проверка выполняется командой `pnpm run check:stl`, git-хуком перед отправкой изменений и в CI перед публикацией GitHub Pages. Экспорт STL в приложении также проверяет сетку и запрашивает подтверждение перед скачиванием модели с ошибками.
- **Ссылки для обмена проектами.** Команда Copy Share Link кодирует проект во фрагменте URL `#p=…`. При открытии ссылки проект загружается в браузере. Данные не отправляются на сервер.
- **Резервное копирование библиотеки проектов.** Команда Export All Projects сохраняет всю библиотеку в один JSON-файл. Импорт объединяет проекты с локальной библиотекой; проекты с одинаковыми именами перезаписываются. Импорт одного проекта также поддерживается.

### Исправлено
- **Откидная крышка экспортировалась с неманифолдной сеткой.** Крепёжный элемент петли смещён на 0,3 мм, чтобы он надёжно пересекался с корпусом и не создавал совпадающих рёбер с цилиндрической частью петли.

## 2026-07-13

### Исправлено
- **Исправлен экспорт STL коробок с паттернами отверстий.** Экспортёр теперь сваривает вершины с высокой точностью и самостоятельно исправляет T-образные соединения. Исправлена ориентация граней фасок, удалены дублирующиеся контрольные точки и устранены микроскопические смещения в треугольных вырезах. Сочетания паттернов, фасок, разделителей и петель проходят автоматическую проверку герметичности сетки.

### Добавлено
- **Паттерны вырезов на стенках и дне коробки.** На вкладке Box доступны круги, квадраты, ромбы, шестиугольники, треугольники и пазы. Отверстия в стенках не затрагивают верхний край, дно и углы с фасками. При включённых петлях задняя стенка остаётся сплошной. Вырезы в дне ограничены внутренней областью, а под разделителями сохраняются сплошные полосы для надёжного соединения с дном.
- **Паттерны вырезов на боковых и задней стенках кожуха.** Ранее паттерн применялся только к верхней и нижней пластинам кожуха; теперь он также прорезает боковые и заднюю стенки. Отверстия обходят края, переднее отверстие, выемку для пальцев и текст.

## 2026-07-12

### Изменено
- **README приведён в соответствие с приложением.** Обновлены инструкции по установке через pnpm, описание вкладок, типов крышек, фасок, паттернов, профилей стола принтера, сохранения и обмена проектами, а также оценки расхода материала.

### Исправлено
- **Сборка и публикация GitHub Pages.** В workflow используется Node.js 24 вместо Node.js 20, поскольку актуальный pnpm требует Node.js не ниже 22.13. Версия pnpm закреплена в `package.json`, а сборочный скрипт esbuild добавлен в список разрешённых скриптов установки.

## 2026-07-10

### Исправлено
- **Открытые рёбра в экспортируемых STL.** Детали, построенные через CSG (кожух и крышки с текстом), проходят исправление сетки и триангуляцию при экспорте. Элементы петель строятся без булевых операций, которые создавали трудноустранимые тонкие дефекты. Экспортируемые детали проходят проверку на отсутствие открытых рёбер.
- **Плавающая панель экспорта больше не мешает управлению 3D-просмотром.** Область вокруг карточек и кнопок не перехватывает мышь.
- **Откидные крышки закрывались неправильной стороной.** Теперь они моделируются как плоские пластины в закрытой ориентации; текст расположен на верхней поверхности. Для откидных крышек скрыты настройки высоты бортика и допуска.
- **Крышка не подходила к коробкам с несимметричными разделителями.** Выемки в бортике теперь зеркально ориентируются с учётом того, что крышка переворачивается при установке.

### Изменено
- **Защёлкивающиеся петли без штифтов.** Вместо отдельного штифта используются конические выступы оси на крышке, которые защёлкиваются в С-образные элементы на коробке. Для сборки достаточно нажать крышку вниз; для снятия — потянуть вверх. Настройка диаметра отверстия заменена диаметром оси (по умолчанию Ø3 мм).
- Вкладки панели управления закреплены вверху боковой панели при прокрутке.
- **Плавающая панель экспорта.** Кнопка над предпросмотром экспортирует все детали и показывает общую оценку расхода PLA. При раскрытии доступны карточки отдельных деталей с размерами и кнопками экспорта. Состояние панели сохраняется между сеансами.
- **Обновлена вкладка Settings.** В ней находятся настройки стола принтера, проекты и обмен. Можно выбрать профиль принтера или задать пользовательский размер стола. Если деталь не помещается даже после поворота, отображается предупреждение. Стол показан в масштабе в 3D-сцене; размер стола сохраняется между сеансами.
- Шаг ползунков ширины, глубины и высоты коробки уменьшен с 1 до 0,5 мм.
- **Общие параметры крышки и кожуха.** Предпросмотр в сборе, допуск посадки и текст/emoji теперь настраиваются одинаково для обоих типов. Добавлена возможность размещать текст на верхней стенке кожуха. Отдельными остаются параметры, специфичные для выбранного типа закрытия.
- Имена экспортируемых STL-файлов получают безопасный для файловой системы префикс с названием проекта.

### Добавлено
- **Предпросмотр в сборе.** Переключатель на вкладке Lid показывает закрытую крышку, собранные петли или коробку, задвинутую в кожух. На экспорт STL этот режим не влияет.
- **Панель деталей под 3D-просмотром.** Для каждой печатаемой детали показываются размеры, оценка массы PLA по объёму сетки и кнопка экспорта STL.
- Отображение размеров и подсказка по управлению камерой в 3D-просмотре.
- **Режим выдвижного кожуха.** Вместо крышки можно создать кожух с открытой передней стороной, в который задвигается коробка. Закрытая задняя стенка служит ограничителем. Настраиваются допуск скольжения и выемка для извлечения коробки.
- **Именованные проекты.** Проекты можно сохранять в браузере, загружать и удалять.
- **Обмен проектами в формате JSON.** Текущий проект можно экспортировать в JSON и импортировать для точного восстановления настроек.
- **Толщина разделителей.** Внутренние разделители могут быть тоньше наружных стенок. Толщина ограничена диапазоном от 0,4 мм до толщины наружной стенки; выемки в крышке соответствуют толщине разделителей.
- Добавлены пояснения к ползункам допуска крышки и кожуха: меньшее значение означает более плотную посадку.
- **Поворот текста.** Текст на крышке и кожухе можно поворачивать на 0°, 90°, 180° или 270°. При повороте на 90°/270° текст располагается вдоль глубины детали.
- **Паттерны вырезов для экономии филамента.** Круги, квадраты, ромбы, шестиугольники, треугольники и пазы прорезаются в крышке или верхней и нижней стенках кожуха. Настраиваются размер и расстояние между элементами. Ряды смещаются, треугольники чередуются вершиной вверх и вниз. Вокруг текста и выемки для пальцев сохраняются сплошные области. По краям, возле бортика, отверстия и задней стенки оставляются перемычки. Экспортёр дополнен механизмом закрытия граничных контуров для герметизации тонких зазоров после сложных CSG-операций.

### Изменено
- **Компоновка приложения.** Панель управления закреплена справа и прокручивается независимо; 3D-просмотр занимает оставшуюся область окна. Панель деталей располагается поверх предпросмотра, информация об авторах перенесена в боковую панель. На небольших экранах предпросмотр и панель управления располагаются вертикально.
- **Автосохранение рабочего состояния.** Текущие настройки автоматически сохраняются при каждом изменении. Вместо ручного сохранения текущего состояния используются именованные проекты и кнопка Reset to Defaults.

## 2026-02-19

### Добавлено
- **Цилиндрические петли.** Необязательные печатаемые петли вдоль заднего края (от 1 до 3 штук) с настраиваемыми диаметрами цилиндра и штифта. Штифты печатаются отдельно.
- **Фаски.** Фаски на внешних вертикальных рёбрах коробки; применяются к коробке и крышке.

## 2026-02-13

### Добавлено
- Первый выпуск: генератор параметрических коробок с интерактивным 3D-просмотром и экспортом STL.
- Настройка размеров коробки, толщины стенок и внутренних разделителей по осям X/Z.
- Крышка с посадкой с натягом, настройкой высоты бортика и допуска, гравировкой или рельефным текстом.
- Инструменты: калькулятор объёма, калькулятор отсеков, оптимизатор размещения на столе принтера и редактор разделителей.
- Сохранение текущего проекта в браузере.
- Публикация на GitHub Pages.

---

# Changelog

This file records all significant project changes. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Since the project does not yet use versioned releases, entries are grouped by date.

## 2026-11-16

### Added
- **Optional lips for hinged lids.** A new **Enable lips** toggle adds inner lips to the hinged lid. When enabled, separate controls expose the lip fit tolerance and lip height, following the corresponding settings of the regular **Lid** type. The lips are designed to fit inside the box while retaining the hinge mechanism and its mounting geometry. With the toggle off, the hinged lid remains the original flat design.
- **Adjustable sleeve rim height.** Added a dedicated height control for the rim/lip of the sliding sleeve (муфта), allowing its height to be adjusted independently of the other lid dimensions.
- **Removal of individual divider segments.** The visual divider editor now has a **Remove arbitrary divider** mode. After enabling it, clicking a divider segment removes only the portion between its nearest wall or divider intersections. The rest of the divider remains intact. After a custom segment is removed, **Evenly** is disabled to prevent the editor from redistributing the modified layout; it becomes available again only after **Clear all**.
- **Divider-removal state is retained with the project.** Custom gaps in the divider layout are part of the project configuration and are reflected in the generated box geometry.

## 2026-11-15

### Added
- **Adjustable box corner radius.** A radius slider was added to the Walls group on the Box tab (0–20 mm in 0.5 mm increments; the maximum is limited by the box base dimensions). It rounds the outer vertical box corners and is accounted for when generating compatible lid geometry. The sleeve and cap also use matching rounded profiles: their inner corners follow the box shape while accounting for wall thickness and fit clearance. Older saved projects without a radius value retain square corners.
- **Slip-on cap (Cap).** Added a separate `Cap` closure type alongside the friction-fit `Lid`, sliding `Sleeve`, and hinged lid. The cap fits over the box and has a cavity on its underside. Its internal dimensions account for the box dimensions, wall thickness, and fit tolerance. Its outer corner profile follows the box corner radius.

### Changed
- **README updated.** The feature overview and user guide now describe the four closure types, corner-radius settings, the current Box/Lid/Print workflow, project manager, automatic part arrangement, and STL integrity checks.

## 2026-10-27

### Changed
- **Application interface redesigned.** Added a dark theme, top bar, and three sidebar tabs: Box, Lid, and Print. Volume, compartment, and divider calculators moved into the Start from… dialog on the Box tab. Project management, share links, and JSON import/export moved into the project menu and the `⋯` menu. Box and Lid settings are grouped into collapsible sections with short descriptions; longer explanations were replaced with tooltips. Closure selection is now a None / Lid / Sleeve / Hinged switch. Width, depth, and height sliders use different colours. Individual-part export moved to the Print tab, which also offers PLA / PETG / ABS material selection for weight estimates. Author and licence information is pinned to the bottom of the sidebar. Generator behaviour was not changed.
- **Dedicated project manager page added.** Cards show an isometric sketch in real proportions, dimensions, compartment count, closure type, and save date. Projects can be opened, duplicated, and deleted. The current project is marked as open in the editor; unsaved work has its own card with naming and save controls. Added search by name or size, sorting by date or name, project creation, JSON import, and full-library export. The 3D scene remains loaded when navigating to the manager.
- **Top-down visual divider editor added.** Dividers can be moved with the mouse or arrow keys, added along width and depth, evenly distributed, and removed. Visual / Numbers mode allows coordinates to be entered in millimetres. Each cell displays its usable dimensions. Dividers cannot be moved past their neighbours. The old divider-count fields and separate position sliders were replaced by the editor.
- **Isometric view with dimension guides added.** A Perspective / Isometric switch is available in the 3D viewer and the selected mode is remembered. Isometric mode uses an orthographic camera with a fixed angle and automatic framing. Dragging pans the scene without rotating the camera. Dimension guides are shown for the box and nearby parts. Perspective mode retains free camera rotation and the previous zoom behaviour.
- **Finger notches on outer walls can be disabled.** The Notch outer walls toggle allows notches to be cut only into dividers, leaving outer walls solid. A separate Notch divider walls toggle controls notches in dividers. If both are off, no notches are generated. Added mesh-integrity checks for the new parameter combinations.
- **Divider height can be lower than the box rim.** When dividers are present, the Divider height slider sets their height from the floor. By default, dividers reach the top of the box and follow its height. A lower value leaves the outer walls extending above them. The geometry remains a single watertight mesh; notches and the lid lip account for divider height.
- **Automatic part arrangement replaces Resize box to fill plate.** The Print tab now has an Auto-arrange parts toggle. The preview tests different layouts and 90° rotations to place the box and lid/sleeve on the printer plate. Warnings distinguish a part that cannot fit by itself from parts that fit individually but not together. Preview arrangement does not change exported STL files.
- **Rounded bottom option added for finger notches.** Rounded bottom turns a rectangular notch into a U-shaped cutout with rounded lower corners. The radius depends on notch width. It applies to outer walls and dividers; each cutout is generated as one continuous shape to preserve mesh quality.
- **Cutouts in the dividers toggle added.** The selected cutout pattern can also be applied to divider walls. Holes avoid outer walls, the floor, divider top edges, other dividers, and finger notches. Dividers that are too narrow or low remain solid.
- **Cutouts in the floor toggle added.** This allows floor cutouts to be disabled while retaining the wall pattern.
- **Licence changed from MPL 2.0 to Apache 2.0.** Added `LICENSE` and `NOTICE`; the licence and author are specified in `package.json`. Versions published before this date remain available under MPL 2.0.

### Fixed
- **Rear wall remained solid after disabling the hinged lid.** When switching from Hinged to None or Sleeve, the hinge flag could remain enabled in settings. The rear wall is now kept solid only when the hinged lid is actually enabled.
- **Start from… calculators returned inaccurate compartment dimensions.** Divider coordinates are now calculated from the inner wall surface to the divider centreline and stored to two decimal places. The Items calculator accounts for actual divider thickness. Final dimensions are no longer rounded to whole millimetres; precision checks were added.

## 2026-09-28

### Changed
- **Switching dimension modes now handles fit tolerance correctly.** Switching to Interior mode increases the box dimensions by the tolerance; switching back to Exterior subtracts the same clearance. Switching back and forth without changing other parameters leaves the final dimensions unchanged.

### Fixed
- **Outer dimensions were capped too low.** In Exterior mode, maximum width, depth, and height are no longer reduced by wall thickness and interior tolerance. The limit now matches the printer plate size.
- **Accumulating floating-point error.** Derived dimensions in Interior mode are rounded to two decimal places, and dimensions in the 3D viewer are displayed to one decimal place.

### Added
- **Internal-dimension entry mode.** The Dimensions are switch allows users to enter target internal cavity dimensions instead of outer dimensions. Outer dimensions are calculated automatically using wall thickness. The Tolerance slider (0.3 mm by default) adds clearance. When tolerance or wall thickness changes, the requested cavity size is preserved and the outer size is recalculated. Saved projects continue to store `width`, `depth`, and `height` as outer dimensions; the mode and tolerance are stored separately.

## 2026-07-20

### Fixed
- **Usable interior height now accounts for the lid lip.** When a friction-fit lid is enabled, its lip depth is subtracted from the Usable interior value, and Generate with Compartments accounts for that height when sizing the box. This prevents the lid from pressing against the contents. Hinged lids and sleeves are unaffected.

## 2026-07-17

### Fixed
- **Finger notches no longer overlap intersecting dividers.** With dividers on both X and Z axes, walls are split into segments between intersections and each segment receives its own notch. Notches are offset 0.5 mm from dividers, corners, and joints. Slot Position % is calculated within each segment; notch width is limited by the narrowest segment.

### Added
- **Notches in dividers can be disabled.** The Notch divider walls too checkbox leaves dividers solid while cutting notches only into outer walls. Older projects retain the previous behaviour.
- Added two `check:stl` configurations for X+Z divider layouts and outer-wall-only notches.

## 2026-07-16

### Added
- **Divider coordinates in millimetres.** X/Z divider sliders show the coordinate in millimetres alongside the percentage. Each group displays usable compartment dimensions, accounting for divider thickness.
- **Additional control-panel explanations.** Clarified that width, depth, and height on the Box tab are outer dimensions. Added explanations for wall thickness, chamfers, dividers, Generator calculators, lip height, and hinge diameter.

## 2026-07-14

### Added
- **Finger notches.** The Box tab gained a Finger Slots section. Notches are cut down from the top to make it easier to remove cards, coins, tokens, and other flat objects. X Walls controls the left/right walls and X dividers; Z Walls controls the front/back walls and Z dividers; Both enables both directions. Width, depth, and position are configurable. Notches stay within the inner area, avoid corners and chamfers, and end above the floor. When hinges are enabled, the rear wall remains solid. Cutout patterns account for notch positions.
- **Polygon mesh integrity validator.** Added `src/utils/meshValidator.ts` to check open and non-manifold edges, flipped and duplicate faces, zero-area triangles, and incorrectly oriented shells. Run it with `pnpm run check:stl`; it also runs from a git hook before changes are pushed and in CI before GitHub Pages deployment. The in-app STL exporter validates meshes and asks for confirmation before downloading a model with errors.
- **Project sharing links.** Copy Share Link encodes a project in the URL fragment (`#p=…`). Opening the link loads the project in the browser. Project data is not sent to a server.
- **Project-library backups.** Export All Projects saves the entire library to one JSON file. Import merges projects with the local library; projects with matching names are overwritten. Importing a single project is also supported.

### Fixed
- **Hinged lid exported with a non-manifold mesh.** The hinge mount was shifted by 0.3 mm so it reliably intersects the body and no longer creates coincident edges with the cylindrical hinge section.

## 2026-07-13

### Fixed
- **STL export for boxes with cutout patterns.** The exporter now welds vertices at high precision and repairs T-junctions. Chamfer face orientation was corrected, duplicate breakpoints were removed, and tiny offsets in triangular cutouts were eliminated. Pattern, chamfer, divider, and hinge combinations pass automated watertightness checks.

### Added
- **Cutout patterns on box walls and floor.** The Box tab supports circles, squares, diamonds, hexagons, triangles, and slots. Wall holes avoid the top rim, floor, and chamfered corners. When hinges are enabled, the rear wall remains solid. Floor cutouts stay inside the cavity, with solid strips under dividers to bond them to the floor.
- **Cutout patterns on sleeve side and rear walls.** Patterns previously affected only the sleeve's top and bottom plates; they now also cut the side and rear walls. Holes avoid the edges, front opening, finger notch, and text.

## 2026-07-12

### Changed
- **README brought up to date.** Installation instructions now use pnpm. The guide describes tabs, lid types, chamfers, cutout patterns, printer-plate presets, project save/share, and material-use estimates.

### Fixed
- **GitHub Pages build and deployment.** The workflow now uses Node.js 24 instead of Node.js 20 because current pnpm requires Node.js 22.13 or later. The pnpm version is pinned in `package.json`, and the esbuild install script is allowlisted.

## 2026-07-10

### Fixed
- **Open edges in exported STL files.** CSG-built parts (sleeves and text lids) now undergo mesh repair and triangulation during export. Hinge elements are built without boolean operations that produced difficult thin defects. Exported parts are checked for open edges.
- **Floating export panel blocked 3D navigation.** Empty space around the cards and buttons no longer captures the mouse.
- **Hinged lids closed on the wrong side.** They are now modelled as flat plates in their closed orientation, with text on the top face. Lip-height and fit-tolerance settings are hidden for hinged lids.
- **Lids did not fit boxes with asymmetric dividers.** Lip notches are now mirrored to account for the lid being flipped during installation.

### Changed
- **Pinless snap hinges.** Tapered axle stubs on the lid snap into C-shaped clips on the box. Press down to assemble and pull up to remove; no separate pin is needed. The pin-hole diameter control was replaced with axle diameter (3 mm by default).
- Sidebar tabs remain pinned to the top while scrolling.
- **Floating export panel.** A button above the preview exports all parts and shows estimated total PLA usage. Expanded cards provide dimensions and individual STL export. The panel's expanded/collapsed state persists between sessions.
- **Settings tab updated.** Printer plate settings, projects, and sharing are grouped there. Choose a printer preset or custom plate dimensions. Warnings appear if a part cannot fit even when rotated. The plate is drawn to scale in the 3D scene, and its dimensions persist between sessions.
- Box width, depth, and height sliders now use 0.5 mm steps instead of 1 mm.
- **Shared lid and sleeve settings.** Assembled preview, fit tolerance, and text/emoji settings are shared by both types. Text on the sleeve's top wall is also supported. Only type-specific settings remain separate.
- Exported STL filenames receive a filesystem-safe project-name prefix.

### Added
- **Assembled preview.** The Lid tab toggle shows the closed lid, assembled hinges, or the box inserted into the sleeve. This affects the preview only, not STL exports.
- **Parts panel below the 3D viewer.** Each printable part shows dimensions, estimated PLA weight based on mesh volume, and an STL export button.
- Dimension labels and camera-control hints in the 3D viewer.
- **Sliding sleeve mode.** Instead of a lid, create a sleeve with an open front into which the box slides. The closed rear wall acts as a stop. Sliding clearance and an optional finger grip are configurable.
- **Named projects.** Save, load, and delete projects in the browser.
- **JSON project sharing.** Export the current project as JSON and import it to restore the exact settings.
- **Divider thickness.** Internal dividers can be thinner than outer walls. Thickness is limited to 0.4 mm through the outer-wall thickness; lid notches match divider thickness.
- Help text for lid and sleeve tolerance sliders: a lower value means a tighter fit.
- **Text rotation.** Rotate lid/sleeve text by 0°, 90°, 180°, or 270°. At 90°/270°, text runs along the depth of the part.
- **Filament-saving cutout patterns.** Circles, squares, diamonds, hexagons, triangles, and slots can be cut through the lid or the sleeve's top and bottom walls. Size and spacing are configurable. Rows are staggered and triangles alternate point-up and point-down. Solid areas are preserved around text and finger grips, along edges, near the lip, and at the rear wall. The exporter includes boundary-loop capping to seal narrow gaps after complex CSG operations.

### Changed
- **Application layout.** The control panel is fixed on the right and scrolls independently; the 3D viewer uses the remaining window area. The parts panel overlays the preview, and author information moved to the sidebar. On smaller screens, the preview and controls stack vertically.
- **Automatic work-state saving.** Current settings are saved whenever they change. Named projects and Reset to Defaults replace manual saving of the current state.

## 2026-02-19

### Added
- **Cylindrical hinges.** Optional printable hinges along the rear edge (1–3) with configurable barrel and pin diameters. Pins are printed separately.
- **Chamfers.** Chamfers on the outer vertical box edges; applied to both the box and lid.

## 2026-02-13

### Added
- First release: a parametric box generator with interactive 3D preview and STL export.
- Configure box dimensions, wall thickness, and internal dividers along the X/Z axes.
- Friction-fit lid with adjustable lip height and tolerance, plus engraved or raised text.
- Tools: volume calculator, compartment calculator, printer-plate arrangement optimizer, and divider editor.
- Save the current project in the browser.
- Deployment to GitHub Pages.
