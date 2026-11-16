# Генератор 3D-коробок (3D Box Generator)

Веб-приложение для проектирования параметрических коробок и крышек под 3D-печать. Настраивайте габариты, внутренние отсеки, толщину стенок, скругления, вырезы и оформление крышки, проверяйте модель в интерактивном 3D-просмотре и экспортируйте детали в STL.

Приложение работает локально в браузере: параметры и проекты сохраняются в браузере пользователя. Интерфейс этого форка переведён на русский язык; доступно переключение на английский.

**Попробовать онлайн:** https://dorogoyw-ui.github.io/box-stl-generator/

## Возможности

- **Интерактивный 3D-просмотр** — модель обновляется при изменении параметров. Доступны свободный перспективный вид и фиксированный изометрический вид с размерными линейками. Колесо мыши управляет масштабом, перетаскивание — вращением или панорамированием в зависимости от режима.
- **Параметрическая коробка** — настройка ширины, глубины и высоты, толщины стенок и дна. Размеры можно задавать по внешнему габариту или по требуемому размеру внутренней полости; допуск учитывается автоматически.
- **Регулируемое скругление углов** — отдельный ползунок радиуса скругления вертикальных углов. Скругление применяется к корпусу коробки и согласуется с геометрией крышки, кожуха или колпака, чтобы детали подходили друг к другу.
- **Визуальный редактор разделителей** — вид коробки сверху, перетаскивание разделителей, добавление и удаление, равномерное распределение и ручной ввод координат. Для каждой ячейки показывается полезный размер в миллиметрах.
- **Настраиваемые разделители** — регулируемая толщина и высота; разделители могут быть ниже стенок коробки.
- **Выемки для пальцев** — пазы в наружных стенках и/или разделителях для удобного извлечения содержимого. Настраиваются оси, ширина, глубина и положение; доступно скруглённое U-образное дно.
- **Паттерны вырезов** — круглые, квадратные, ромбовидные, шестиугольные, треугольные отверстия и продолговатые пазы. Паттерны можно применять к стенкам коробки, дну, разделителям и крышке/кожуху с отдельными настройками там, где они предусмотрены.
- **Четыре варианта закрытия**
  - **Lid — крышка с бортиком:** крышка с внутренним посадочным бортиком; настраиваются высота бортика и допуск посадки.
  - **Cap — накладная крышка-колпак:** крышка надевается сверху на коробку; геометрия внутренних стенок учитывает габариты коробки и посадочный зазор.
  - **Sleeve — выдвижной кожух (пенал):** коробка задвигается в кожух с открытым торцом; настраиваются зазор скольжения и выемка для захвата.
  - **Hinged — откидная крышка:** плоская крышка на защёлкивающихся петлях; доступно от 1 до 3 петель, отдельные штифты и винты для сборки не требуются.
- **Текст на крышке** — добавление надписи, гравировка или рельефное нанесение, настройка размера и глубины, поворот на 0°, 90°, 180° или 270°. Поддерживается ввод кириллицы средствами браузерного рендеринга текста.
- **Стартовые калькуляторы (Start from…)** — создание коробки по целевому объёму, габаритам и количеству предметов либо по заданным размерам отсеков.
- **Проверка размещения на столе принтера** — готовые профили популярных принтеров и пользовательские размеры стола. Автоматическая раскладка размещает коробку и крышку рядом, при необходимости поворачивая детали на 90°, и проверяет, помещаются ли они вместе.
- **Проекты и обмен** — сохранение проектов в браузере, поиск, сортировка, дублирование и удаление. Проект можно передать ссылкой или JSON-файлом; всю библиотеку проектов можно экспортировать и восстановить из резервной копии.
- **Экспорт STL и оценка материала** — отдельный STL для каждой детали, имена файлов формируются с учётом названия проекта и размеров. Показываются габариты и приблизительный расход пластика для PLA, PETG или ABS.
- **Проверка целостности сетки** — геометрия экспортируемых моделей проверяется на открытые и неманифолдные рёбра и другие распространённые дефекты сетки.

## Начало работы

Требуются Node.js версии 22.13 или новее и pnpm.

```bash
pnpm install
pnpm run dev
```

Откройте адрес, указанный в терминале (обычно `http://localhost:5173`).

### Сборка и проверка

```bash
pnpm run build    # проверка типов и production-сборка в dist/
pnpm run preview  # локальный просмотр production-сборки
pnpm run check:stl # проверка целостности экспортируемых STL-моделей
```

Пуши в ветку `main` автоматически публикуются на GitHub Pages через workflow `deploy.yml`.

## Использование

### Верхняя панель

- **Название проекта** — открывает менеджер проектов. Стрелка рядом с названием открывает быстрое меню сохранения, загрузки и создания проекта.
- **Меню «⋯»** — копирование ссылки для обмена, экспорт текущего проекта в JSON, экспорт всей библиотеки и импорт JSON-файла.
- **Export** — экспорт текущей коробки и включённой крышки/кожуха в STL.

### Вкладка «Коробка» (Box)

- **Start from…** — создание исходной конфигурации по объёму, предметам или заданным размерам отсеков.
- **Dimensions** — переключение между внешними размерами и размерами внутренней полости. В режиме внутренней полости можно задать дополнительный допуск.
- **Dividers** — визуальное размещение разделителей, их координаты, толщина и высота.
- **Walls** — толщина стенок и радиус скругления углов. Радиус задаётся ползунком с шагом 0,5 мм; допустимое значение автоматически ограничивается размерами коробки.
- **Details / Cutouts** — выемки для пальцев и паттерны отверстий. Для выемок можно выбирать наружные стенки и разделители, а также скруглённое дно. Для паттернов доступны настройки формы, размера и расстояния между элементами; предусмотрены отдельные параметры для дна и разделителей.

### Вкладка «Крышка» (Lid)

Выберите **None**, **Lid**, **Cap**, **Sleeve** или **Hinged**. Переключатель предварительного просмотра в сборе показывает закрытую коробку или коробку внутри кожуха; это режим просмотра и он не меняет экспортируемую геометрию.

- **Посадка (Fit)** — допуск и высота бортика для крышки с бортиком; для кожуха — собственный зазор скольжения.
- **Петли (Hinge)** — для откидной крышки выбирается количество петель (1–3) и параметры шарнира.
- **Вырезы (Cutouts)** — паттерны на верхней поверхности крышки или стенках кожуха.
- **Текст (Text)** — надпись, размер, глубина, гравировка или рельефное нанесение, поворот на 0°/90°/180°/270°.

### Вкладка «Печать» (Print)

- **Printer plate** — выбор пресета принтера или ввод размеров стола вручную. Предупреждения показывают, если деталь или комплект деталей не помещается на стол.
- **Auto-arrange parts** — автоматическое размещение коробки и крышки рядом на столе предпросмотра. При необходимости деталь поворачивается на четверть оборота; на экспортируемые STL это не влияет.
- **Material and parts** — выбор PLA, PETG или ABS, размеры деталей, оценка массы и скачивание STL.

### Менеджер проектов

Менеджер открывается нажатием на название проекта. Карточки показывают эскиз, размеры, число отсеков, тип крышки и дату сохранения. Проекты можно открывать, дублировать, удалять, искать и сортировать. Здесь же доступны создание проекта, импорт JSON и экспорт всей библиотеки.

### Управление 3D-просмотром

- **Перспективный вид:** левая кнопка мыши — вращение; правая кнопка — панорамирование; колесо мыши — приближение и отдаление.
- **Изометрический вид:** угол камеры зафиксирован; перетаскивание — панорамирование; колесо мыши — масштабирование.

## Технологии

- React, TypeScript и Vite
- Three.js, React Three Fiber и Drei
- `@jscad/modeling` для параметрической CAD-геометрии
- Tailwind CSS и shadcn/ui

История значимых изменений находится в [CHANGELOG.md](CHANGELOG.md).

## Лицензия

Проект распространяется по лицензии **Apache License 2.0**.

---

# 3D Box Generator

A web application for designing parametric boxes and lids for 3D printing. Configure dimensions, compartments, wall thickness, corner radii, cutouts, and lid details; inspect the model in an interactive 3D viewer and export parts as STL files.

The application runs locally in your browser. Parameters and projects are stored in the user's browser. This fork's interface is available in Russian and English.

**Try it online:** https://dorogoyw-ui.github.io/box-stl-generator/

## Features

- **Interactive 3D viewer** — the model updates as parameters change. Use a free-perspective view or a fixed isometric view with dimension guides. The mouse wheel controls zoom; dragging rotates or pans depending on the view.
- **Parametric box** — configure width, depth, height, wall thickness, and floor thickness. Dimensions can be entered as outer dimensions or as the required internal cavity size; clearance is handled automatically.
- **Adjustable corner radius** — set the radius of the vertical box corners. The radius is coordinated with the lid, sleeve, and cap geometry so mating parts can fit together.
- **Visual divider editor** — top-down box layout with draggable dividers, add/remove controls, even distribution, and manual coordinate entry. Each compartment displays its usable dimensions in millimetres.
- **Configurable dividers** — adjust divider thickness and height; dividers can be lower than the outer walls.
- **Finger slots** — add recesses to outer walls and/or dividers to make contents easier to remove. Configure axes, width, depth, and position; a rounded U-shaped bottom is available.
- **Cutout patterns** — circular, square, diamond, hexagonal, triangular, and elongated-slot patterns. Patterns can be applied to box walls, the floor, dividers, and lids/sleeves, with separate options where available.
- **Four closure types**
  - **Lid — friction-fit lid:** a lid with an inner lip; configure lip height and fit tolerance.
  - **Cap — slip-on cap:** fits over the top of the box; its inner walls account for the box dimensions and fit clearance.
  - **Sleeve — sliding sleeve:** the box slides into a sleeve with an open end; configure sliding clearance and an optional finger grip.
  - **Hinged — hinged lid:** a flat lid on snap-fit hinges; choose 1–3 hinges, with no separate pins or screws required.
- **Hinged-lid lips (optional)** — enable inner lips on the hinged lid and configure their fit clearance and height. When disabled, the hinged lid remains flat; hinge hardware remains in place when lips are enabled.
- **Sleeve lip height** — adjust the rim/lip height of the sleeve independently.
- **Custom divider removal** — enable the remove-divider mode and click a divider segment in the visual layout to remove only the section between its nearest wall/divider intersections. After a segment is removed, **Evenly** is disabled until **Clear all** is used.
- **Lid text** — add engraved or raised text, configure size and depth, and rotate it by 0°, 90°, 180°, or 270°. Cyrillic text is supported through browser text rendering.
- **Starter calculators (Start from…)** — create a box from a target volume, item dimensions/count, or specified compartment dimensions.
- **Printer plate fit** — choose a preset for a popular printer or enter a custom plate size. Automatic arrangement places the box and lid/sleeve side by side, tests 90° rotations, and checks whether all parts fit together.
- **Projects and sharing** — save projects in the browser; search, sort, duplicate, and delete them. Share a project using a link or JSON file, and export or restore the entire project library.
- **STL export and material estimate** — export each part separately. Filenames include the project name and dimensions. View part dimensions and estimated material usage for PLA, PETG, or ABS.
- **Mesh integrity checks** — exported geometry is checked for open and non-manifold edges and other common mesh defects.

## Getting started

Requires Node.js 22.13 or later and pnpm.

```bash
pnpm install
pnpm run dev
```

Open the address shown in the terminal (usually `http://localhost:5173`).

### Build and validation

```bash
pnpm run build     # type-check and production build in dist/
pnpm run preview   # preview the production build locally
pnpm run check:stl # validate exported STL meshes
```

Pushes to the `main` branch are automatically deployed to GitHub Pages using the `deploy.yml` workflow.

## Usage

### Top bar

- **Project name** — opens the project manager. The arrow next to the name opens a quick menu for saving, loading, and creating projects.
- **⋯ menu** — copy a share link, export the current project as JSON, export the entire library, or import a JSON file.
- **Export** — export the current box and enabled lid/sleeve as STL files.

### Box tab

- **Start from…** — create an initial configuration from volume, items, or specified compartment dimensions.
- **Dimensions** — switch between outer dimensions and internal cavity dimensions. In internal mode, an additional clearance can be specified.
- **Dividers** — visually position dividers, edit their coordinates, thickness, and height, and distribute them evenly. Use **Remove arbitrary divider** to enter segment-removal mode, then click the desired segment in the visual layout. Only the segment between the nearest intersections is removed. **Evenly** remains disabled after a custom removal until **Clear all** is pressed.
- **Walls** — configure wall thickness and corner radius. The radius slider uses 0.5 mm increments and is automatically limited by the box dimensions.
- **Details / Cutouts** — configure finger slots and cutout patterns. Finger slots can target outer walls and/or dividers and can have a rounded bottom. Pattern shape, size, and spacing are configurable, with separate floor and divider options.

### Lid tab

Choose **None**, **Lid**, **Cap**, **Sleeve**, or **Hinged**. The assembled-preview toggle shows the closed lid or the box inside the sleeve; this affects the preview only, not exported geometry.

- **Fit** — fit tolerance and lip height for a friction-fit lid; sliding clearance and sleeve rim height for a sleeve.
- **Hinges** — choose 1–3 hinges and configure the hinge parameters for a hinged lid.
- **Hinged-lid lips** — use **Enable lips** to add inner lips to a hinged lid. When enabled, the lip fit tolerance and lip height controls become available. The lips are shaped to fit inside the box while preserving the hinge hardware.
- **Cutouts** — patterns on the top surface of a lid or on sleeve walls.
- **Text** — configure the inscription, size, depth, engraving/raised mode, and rotation (0°/90°/180°/270°).

### Print tab

- **Printer plate** — choose a printer preset or enter custom plate dimensions. Warnings indicate when a part or the complete set does not fit.
- **Auto-arrange parts** — automatically place the box and lid side by side on the preview plate. Parts may be rotated by 90°; this does not affect exported STL files.
- **Material and parts** — choose PLA, PETG, or ABS, view part dimensions and estimated weight, and download STL files.

### Project manager

Open the manager by selecting the project name. Cards show a preview, dimensions, compartment count, lid type, and save date. Projects can be opened, duplicated, deleted, searched, and sorted. The manager also supports creating projects, importing JSON, and exporting the entire library.

### 3D viewer controls

- **Perspective view:** left mouse button rotates; right mouse button pans; the wheel zooms in and out.
- **Isometric view:** camera angle is fixed; dragging pans; the wheel changes zoom.

## Technologies

- React, TypeScript, and Vite
- Three.js, React Three Fiber, and Drei
- `@jscad/modeling` for parametric CAD geometry
- Tailwind CSS and shadcn/ui

See [CHANGELOG.md](CHANGELOG.md) for the history of significant changes.

## License

This project is distributed under the **Apache License 2.0**.
