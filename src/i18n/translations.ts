export type Language = 'en' | 'ru'

export interface Translations {
  common: {
    untitled: string
    save: string
    newProject: string
    delete: string
    export: string
    import: string
    cancel: string
    confirm: string
    back: string
    search: string
    name: string
    size: string
    dimensions: string
    mm: string
  }
  topBar: {
    title: string
    openProjectManager: string
    projectMenu: string
    more: string
    nameThisProject: string
    projectName: string
    newProject: string
    copyShareLink: string
    linkCopied: string
    exportProjectJson: string
    exportAllProjects: string
    importJson: string
    deleteProject: string
  }
  app: {
    exportAll: string
    exportStl: string
    perspective: string
    isometric: string
    dragToPan: string
    dragToRotate: string
    scrollToZoom: string
    solidVolume: string
    compartments: string
    lidLipIncluded: string
    dividerThicknessHint: string
    compartment: string
    wontFitPlate: string
    madeBy: string
    sourceOnGithub: string
    license: string
  }
  controlPanel: {
    tabBox: string
    tabLid: string
    tabPrint: string
    dimensions: string
    width: string
    depth: string
    height: string
    wallThickness: string
    interiorTolerance: string
    dimensionMode: string
    exterior: string
    interior: string
    usableInterior: string
    outerSize: string
    dividers: string
    addDivider: string
    fingerSlots: string
    none: string
    xWalls: string
    zWalls: string
    both: string
    cutouts: string
    pattern: string
    cutoutSize: string
    cutoutSpacing: string
    cutoutSpacingHint: string
    lidStyle: string
    lidStyleNone: string
    lidStyleFriction: string
    lidStyleSleeve: string
    lidStyleHinged: string
    lidStyleCap: string
    patternNone: string
    patternCircles: string
    patternSquares: string
    patternDiamonds: string
    patternHexagons: string
    patternTriangles: string
    patternSlots: string
    fit: string
    fitTolerance: string
    fitToleranceHint: string
    fitToleranceHintSleeve: string
    lipHeight: string
    lipHeightHint: string
    fingerCutout: string
    hinge: string
    numberOfHinges: string
    barrelDiameter: string
    barrelDiameterHint: string
    axleDiameter: string
    axleDiameterHint: string
    hingeInstructions: string
    text: string
    textOrEmoji: string
    textSize: string
    textDepth: string
    textStyle: string
    engraved: string
    embossed: string
    rotation: string
    textHintSleeve: string
    textHintLid: string
    textSolidPatch: string
    printerPlate: string
    printerPreset: string
    plateWidth: string
    plateDepth: string
    plateFitWarning: string
    plateFitWarningTogether: string
    plateFitOk: string
    plateFitOkSingle: string
    autoArrange: string
    autoArrangeHint: string
    materialAndParts: string
    filament: string
    partBox: string
    partLid: string
    partSleeve: string
    previewInPlace: string
    previewInPlaceHint: string
    startFrom: string
    startFromHint: string
    walls: string
    chamfer: string
    details: string
    closure: string
    closureNone: string
    closureLid: string
    closureSleeve: string
    closureHinged: string
    closureCap: string
    closureNoneDesc: string
    closureLidDesc: string
    closureSleeveDesc: string
    closureHingedDesc: string
    closureCapDesc: string
    previewBoxInsideSleeve: string
    previewLidInPlace: string
    tolerance: string
    hingeCount: string
    lidCutouts: string
    textRotation: string
    plateWidthLabel: string
    plateDepthLabel: string
    weightHint: string
    noSlotsNoCutouts: string
    boxColor: string
    lidColor: string
    cutoutPattern: string
    dividerHeight: string
    fullHeight: string
    dividerHeightHint: string
    notchDescription: string
    notchOuterWalls: string
    notchDividerWalls: string
    nothingToNotch: string
    turnOnOuterOrDivider: string
    roundedBottom: string
    slotWidth: string
    slotDepth: string
    slotDepthHint: string
    slotPosition: string
    slotPositionHint: string
    wallCutoutDescription: string
    floorCutouts: string
    dividerCutouts: string
    backWallHingeHint: string
    textRotationHint: string
    roundedCorners: string
    roundedCornersHint: string
    interiorToleranceHint: string
    chamferHint: string
    hingeBackWallHint: string
    turnOnOuterOrAddDividers: string
    interiorLabel: string
    compartment: string
    compartments: string
    lidLipIncluded: string
    dividerThicknessHint: string
  }
  startFromDialog: {
    title: string
    close: string
    volume: string
    items: string
    divisions: string
    volumeUnit: string
    volumeHint: string
    apply: string
    itemWidth: string
    itemDepth: string
    itemHeight: string
    compartments: string
    lidLipIncluded: string
    dividerThicknessHint: string
    itemsHint: string
    compartmentDepths: string
    compartmentDepthsPlaceholder: string
    wallThickness: string
    wallThicknessHint: string
    totalOuterDepth: string
    compartmentsCount: string
    wallsCount: string
  }
  dividerEditor: {
    visual: string
    numbers: string
    dragDivider: string
    dragDividerHint: string
    widthDivider: string
    depthDivider: string
    fromLeft: string
    fromFront: string
    noDividers: string
    clearSizes: string
    alongWidth: string
    alongDepth: string
    spaceEvenly: string
    clearAll: string
    removeDivider: string
    front: string
  }
  projectsView: {
    workbench: string
    projects: string
    importJson: string
    exportAll: string
    newProject: string
    searchPlaceholder: string
    recent: string
    name: string
    unsavedChanges: string
    currentBox: string
    update: string
    save: string
    inTheEditor: string
    saved: string
    duplicate: string
    open: string
    backToEditor: string
    saveFirstProject: string
    saveFirstProjectHint: string
    noProjectsMatch: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      untitled: 'Untitled',
      save: 'Save',
      newProject: 'New project',
      delete: 'Delete',
      export: 'Export',
      import: 'Import',
      cancel: 'Cancel',
      confirm: 'Confirm',
      back: 'Back',
      search: 'Search',
      name: 'Name',
      size: 'Size',
      dimensions: 'Dimensions',
      mm: 'mm',
    },
    topBar: {
      title: '3D Box Generator',
      openProjectManager: 'Open project manager',
      projectMenu: 'Project menu',
      more: 'More',
      nameThisProject: 'Name this project',
      projectName: 'Project name',
      newProject: 'New project',
      copyShareLink: 'Copy share link',
      linkCopied: 'Link copied',
      exportProjectJson: 'Export project JSON',
      exportAllProjects: 'Export all projects',
      importJson: 'Import JSON',
      deleteProject: 'Delete project',
    },
    app: {
      exportAll: 'Export all',
      exportStl: 'Export STL',
      perspective: 'Perspective',
      isometric: 'Isometric',
      dragToPan: 'drag to pan · scroll to zoom',
      dragToRotate: 'drag to rotate · scroll to zoom',
      scrollToZoom: 'scroll to zoom',
      solidVolume: 'Solid volume — real prints use less with infill',
      compartments: 'compartments',
      lidLipIncluded: 'lid lip included',
      dividerThicknessHint: 'Thickness of the internal dividers. Capped at the wall thickness',
      compartment: 'compartment',
      wontFitPlate: "won't fit the",
      madeBy: 'Made by',
      sourceOnGithub: 'Source on GitHub',
      license: 'Apache 2.0',
    },
    controlPanel: {
      tabBox: 'Box',
      tabLid: 'Lid',
      tabPrint: 'Print',
      dimensions: 'Dimensions',
      width: 'Width',
      depth: 'Depth',
      height: 'Height',
      wallThickness: 'Wall thickness',
      interiorTolerance: 'Interior tolerance',
      dimensionMode: 'Dimension mode',
      exterior: 'Exterior',
      interior: 'Interior',
      usableInterior: 'Usable interior',
      outerSize: 'Outer size',
      dividers: 'Dividers',
      addDivider: 'Add divider',
      fingerSlots: 'Finger slots',
      none: 'None',
      xWalls: 'X walls',
      zWalls: 'Z walls',
      both: 'Both',
      cutouts: 'Cutouts',
      pattern: 'Pattern',
      cutoutSize: 'Cutout size',
      cutoutSpacing: 'Cutout spacing',
      cutoutSpacingHint: 'Wider spacing means a stronger part; larger cutouts save more filament.',
      lidStyle: 'Lid style',
      lidStyleNone: 'None',
      lidStyleFriction: 'Friction',
      lidStyleSleeve: 'Sleeve',
      lidStyleHinged: 'Hinged',
      lidStyleCap: 'Coupling',
      patternNone: 'None',
      patternCircles: 'Circles',
      patternSquares: 'Squares',
      patternDiamonds: 'Diamonds',
      patternHexagons: 'Hexagons',
      patternTriangles: 'Triangles',
      patternSlots: 'Slots',
      fit: 'Fit',
      fitTolerance: 'Fit tolerance',
      fitToleranceHint: "Gap between the lid's lip and the box walls. Lower is tighter; raise it if the lid is hard to put on.",
      fitToleranceHintSleeve: 'Gap between the box and the sleeve interior. Lower is tighter; raise it if the box is hard to slide.',
      lipHeight: 'Lip height',
      lipHeightHint: 'How far the lid\'s inner lip reaches down into the box. A taller lip grips better but takes interior space.',
      fingerCutout: 'Finger cutout at the opening',
      hinge: 'Hinge',
      numberOfHinges: 'Number of hinges',
      barrelDiameter: 'Barrel diameter',
      barrelDiameterHint: 'Outer diameter of the hinge knuckles on the box\'s back edge.',
      axleDiameter: 'Axle diameter',
      axleDiameterHint: 'Diameter of the snap axles on the lid. Thicker is stronger but needs more force to click in.',
      hingeInstructions: 'Press the lid\'s axle stubs straight down into the box knuckles until they click. Pull straight up to remove.',
      text: 'Text',
      textOrEmoji: 'Text or emoji',
      textSize: 'Text size',
      textDepth: 'Text depth',
      textStyle: 'Text style',
      engraved: 'Engraved',
      embossed: 'Embossed',
      rotation: 'Rotation',
      textHintSleeve: 'Engraved or embossed on the top wall of the sleeve.',
      textHintLid: 'Engraved or embossed on the top of the lid.',
      textSolidPatch: 'Text always keeps a solid patch around it.',
      printerPlate: 'Printer plate',
      printerPreset: 'Printer preset',
      plateWidth: 'Plate width (mm)',
      plateDepth: 'Plate depth (mm)',
      plateFitWarning: "won't fit this plate, even rotated.",
      plateFitWarningTogether: 'each fit this plate, but not together. Print them one at a time.',
      plateFitOk: 'The box and lid fit the plate together.',
      plateFitOkSingle: 'The box fits the plate.',
      autoArrange: 'Auto-arrange parts',
      autoArrangeHint: 'Lays the box and lid out next to each other on the plate in the preview, turning a part a quarter turn only when that is what makes it fit.',
      materialAndParts: 'Material and parts',
      filament: 'Filament',
      partBox: 'Box',
      partLid: 'Lid',
      partSleeve: 'Sleeve',
      previewInPlace: 'Preview in place',
      previewInPlaceHint: 'Show the lid assembled on the box in the viewer (exported geometry is never affected).',
      startFrom: 'Start from',
      startFromHint: 'Use an existing project as a starting point for this one.',
      walls: 'Walls',
      chamfer: 'Chamfer',
      details: 'Details',
      closure: 'Closure',
      closureNone: 'None',
      closureLid: 'Lid',
      closureSleeve: 'Sleeve',
      closureHinged: 'Hinged',
      closureCap: 'Coupling',
      closureNoneDesc: 'Open top.',
      closureLidDesc: 'A cap that sits on top of the box.',
      closureSleeveDesc: 'An open-front cover the box slides in and out of, like a matchbox drawer.',
      closureHingedDesc: 'A flat lid that snaps onto hinge knuckles on the back edge. Nothing extra to print.',
      closureCapDesc: 'A closed-top cap with four walls that fits over the outside of the box.',
      previewBoxInsideSleeve: 'Preview box inside sleeve',
      previewLidInPlace: 'Preview lid in place',
      tolerance: 'tolerance',
      hingeCount: 'hinge',
      lidCutouts: 'Cutouts',
      textRotation: 'Rotation',
      plateWidthLabel: 'Plate width (mm)',
      plateDepthLabel: 'Plate depth (mm)',
      weightHint: 'Weights are for a solid part; real prints use less with infill.',
      noSlotsNoCutouts: 'No slots · no cutouts',
      boxColor: 'Box color',
      lidColor: 'Lid color',
      cutoutPattern: 'Cutout pattern',
      dividerHeight: 'Divider height',
      fullHeight: 'full',
      dividerHeightHint: 'Measured from the floor. Full height is flush with the box top; lower dividers stay below the rim.',
      notchDescription: 'Notches cut down from the top edge so you can pinch cards or flat items out of each compartment.',
      notchOuterWalls: 'Notch outer walls',
      notchDividerWalls: 'Notch divider walls',
      nothingToNotch: 'Nothing to notch yet.',
      turnOnOuterOrDivider: 'Turn on the outer walls or the divider walls.',
      roundedBottom: 'Rounded bottom',
      slotWidth: 'Slot width',
      slotDepth: 'Slot depth',
      slotDepthHint: 'How far down from the top edge the notch reaches. It always stops just above the floor.',
      slotPosition: 'Slot position',
      slotPositionHint: 'Where each notch sits along its open span; 50% is centred.',
      wallCutoutDescription: 'Holes cut through the side walls and floor to save filament.',
      floorCutouts: 'Cutouts in the floor',
      dividerCutouts: 'Cutouts in the dividers',
      backWallHingeHint: 'The back wall stays solid to support the hinge.',
      textRotationHint: 'At 90° or 270° the text runs along the depth instead of the width.',
      roundedCorners: 'Round box and coupling corners',
      roundedCornersHint: 'Radius of the box outer corners. The coupling inner corners automatically match the box, accounting for wall thickness and clearance. 0 = square corners.',
      interiorToleranceHint: 'Extra clearance added to the cavity on top of the size you enter. Raise it for loose contents, lower it for a snug fit.',
      chamferHint: '45° bevel on the four outer vertical edges. Cosmetic only; 0 keeps square corners.',
      hingeBackWallHint: 'With a hinge, the back wall stays solid.',
      turnOnOuterOrAddDividers: 'Turn on the outer walls, or add dividers on these axes.',
      interiorLabel: 'inside',
      compartment: 'compartment',
      compartments: 'compartments',
      lidLipIncluded: 'lid lip included',
      dividerThicknessHint: 'Thickness of the internal dividers. Capped at the wall thickness',
    },
    startFromDialog: {
      title: 'Start from…',
      close: 'Close',
      volume: 'Volume',
      items: 'Items',
      divisions: 'Divisions',
      volumeUnit: 'cm³',
      volumeHint: 'Sets the outer width, depth and height to roughly match this volume. The usable interior ends up a bit smaller once walls are subtracted.',
      apply: 'Apply',
      itemWidth: 'Item width (mm)',
      itemDepth: 'Item depth (mm)',
      itemHeight: 'Item height',
      compartments: 'Compartments',
      lidLipIncluded: 'Lid lip included',
      dividerThicknessHint: 'Thickness of the internal dividers. Capped at the wall thickness',
      itemsHint: 'Sizes are the clear space each item needs. Walls and dividers are added on top',
      compartmentDepths: 'Compartment depths (mm), front to back',
      compartmentDepthsPlaceholder: '51, 48, 30',
      wallThickness: 'Wall thickness',
      wallThicknessHint: 'Used for both the outer walls and the dividers.',
      totalOuterDepth: 'Total outer depth',
      compartmentsCount: 'compartments',
      wallsCount: 'walls',
    },
    dividerEditor: {
      visual: 'Visual',
      numbers: 'Numbers',
      dragDivider: 'Drag a divider to move it.',
      dragDividerHint: 'Numbers in each cell are clear sizes in mm.',
      widthDivider: 'Width divider',
      depthDivider: 'Depth divider',
      fromLeft: 'from left',
      fromFront: 'from front',
      noDividers: 'No dividers.',
      clearSizes: 'Clear sizes:',
      alongWidth: 'Along width',
      alongDepth: 'Along depth',
      spaceEvenly: 'Space evenly',
      clearAll: 'Clear all',
      removeDivider: 'Remove divider',
      front: 'front',
    },
    projectsView: {
      workbench: 'Workbench',
      projects: 'Projects',
      importJson: 'Import JSON',
      exportAll: 'Export all',
      newProject: 'New project',
      searchPlaceholder: 'Search by name or size, e.g. 120',
      recent: 'Recent',
      name: 'Name',
      unsavedChanges: 'Unsaved changes',
      currentBox: 'Current box',
      update: 'Update',
      save: 'Save',
      inTheEditor: 'In the editor',
      saved: 'Saved',
      duplicate: 'Duplicate',
      open: 'Open',
      backToEditor: 'Back to editor',
      saveFirstProject: 'Save your first project',
      saveFirstProjectHint: 'Name the current box above to keep it here. Projects live in this browser; export them to back up or move devices.',
      noProjectsMatch: 'No projects match "{query}".',
    },
  },
  ru: {
    common: {
      untitled: 'Без названия',
      save: 'Сохранить',
      newProject: 'Новый проект',
      delete: 'Удалить',
      export: 'Экспорт',
      import: 'Импорт',
      cancel: 'Отмена',
      confirm: 'Подтвердить',
      back: 'Назад',
      search: 'Поиск',
      name: 'Имя',
      size: 'Размер',
      dimensions: 'Размеры',
      mm: 'мм',
    },
    topBar: {
      title: 'Генератор 3D коробок',
      openProjectManager: 'Открыть менеджер проектов',
      projectMenu: 'Меню проекта',
      more: 'Ещё',
      nameThisProject: 'Назовите этот проект',
      projectName: 'Название проекта',
      newProject: 'Новый проект',
      copyShareLink: 'Копировать ссылку',
      linkCopied: 'Ссылка скопирована',
      exportProjectJson: 'Экспортировать проект в JSON',
      exportAllProjects: 'Экспортировать все проекты',
      importJson: 'Импортировать JSON',
      deleteProject: 'Удалить проект',
    },
    app: {
      exportAll: 'Экспортировать всё',
      exportStl: 'Экспортировать STL',
      perspective: 'Перспектива',
      isometric: 'Изометрия',
      dragToPan: 'перетаскивание для панорамирования · прокрутка для масштабирования',
      dragToRotate: 'перетаскивание для вращения · прокрутка для масштабирования',
      scrollToZoom: 'прокрутка для масштабирования',
      solidVolume: 'Объём сплошного материала — реальные печати используют меньше с заполнением',
      compartments: 'отсеков',
      lidLipIncluded: 'губка крышки включена',
      dividerThicknessHint: 'Толщина внутренних перегородок. Ограничена толщиной стенок',
      compartment: 'отсек',
      wontFitPlate: 'не поместится на',
      madeBy: 'Создано',
      sourceOnGithub: 'Исходный код на GitHub',
      license: 'Apache 2.0',
    },
    controlPanel: {
      tabBox: 'Коробка',
      tabLid: 'Крышка',
      tabPrint: 'Печать',
      dimensions: 'Размеры',
      width: 'Ширина',
      depth: 'Глубина',
      height: 'Высота',
      wallThickness: 'Толщина стенок',
      interiorTolerance: 'Внутренний допуск',
      dimensionMode: 'Режим размеров',
      exterior: 'Внешний',
      interior: 'Внутренний',
      usableInterior: 'Полезный внутренний объём',
      outerSize: 'Внешний размер',
      dividers: 'Перегородки',
      addDivider: 'Добавить перегородку',
      fingerSlots: 'Пальцевые вырезы',
      none: 'Нет',
      xWalls: 'Стены X',
      zWalls: 'Стены Z',
      both: 'Обе',
      cutouts: 'Вырезы',
      pattern: 'Узор',
      cutoutSize: 'Размер выреза',
      cutoutSpacing: 'Шаг вырезов',
      cutoutSpacingHint: 'Больший шаг означает более прочную деталь; большие вырезы экономят больше пластика.',
      lidStyle: 'Стиль крышки',
      lidStyleNone: 'Нет',
      lidStyleFriction: 'Трение',
      lidStyleSleeve: 'Чехол',
      lidStyleHinged: 'На петлях',
      lidStyleCap: 'Муфта',
      patternNone: 'Нет',
      patternCircles: 'Круги',
      patternSquares: 'Квадраты',
      patternDiamonds: 'Ромбы',
      patternHexagons: 'Шестиугольники',
      patternTriangles: 'Треугольники',
      patternSlots: 'Пазы',
      fit: 'Посадка',
      fitTolerance: 'Допуск посадки',
      fitToleranceHint: 'Зазор между губкой крышки и стенками коробки. Меньше — туже; увеличьте, если крышка трудно надевается.',
      fitToleranceHintSleeve: 'Зазор между коробкой и внутренней частью чехла. Меньше — туже; увеличьте, если коробка трудно двигается.',
      lipHeight: 'Высота губки',
      lipHeightHint: 'Насколько внутренняя губка крышки заходит в коробку. Более высокая губка держится лучше, но занимает место.',
      fingerCutout: 'Вырез под палец',
      hinge: 'Петля',
      numberOfHinges: 'Количество петель',
      barrelDiameter: 'Диаметр barrel',
      barrelDiameterHint: 'Внешний диаметр шарниров петли на заднем крае коробки.',
      axleDiameter: 'Диаметр оси',
      axleDiameterHint: 'Диаметр защёлкивающихся осей на крышке. Толще — прочнее, но нужно больше усилия для защёлкивания.',
      hingeInstructions: 'Нажмите на оси прямо вниз в шарниры коробки до щелчка. Тяните прямо вверх для снятия.',
      text: 'Текст',
      textOrEmoji: 'Текст или эмодзи',
      textSize: 'Размер текста',
      textDepth: 'Глубина текста',
      textStyle: 'Стиль текста',
      engraved: 'Гравировка',
      embossed: 'Рельеф',
      rotation: 'Поворот',
      textHintSleeve: 'Гравировка или рельеф на верхней стенке чехла.',
      textHintLid: 'Гравировка или рельеф на верхней части крышки.',
      textSolidPatch: 'Текст всегда сохраняет сплошную область вокруг себя.',
      printerPlate: 'Печатная пластина',
      printerPreset: 'Пресет принтера',
      plateWidth: 'Ширина пластины (мм)',
      plateDepth: 'Глубина пластины (мм)',
      plateFitWarning: 'не поместится на эту пластину, даже при повороте.',
      plateFitWarningTogether: 'каждая помещается на эту пластину, но не вместе. Печатайте по одной.',
      plateFitOk: 'Коробка и крышка помещаются на пластину вместе.',
      plateFitOkSingle: 'Коробка помещается на пластину.',
      autoArrange: 'Авторасположение деталей',
      autoArrangeHint: 'Располагает коробку и крышку рядом на пластине в превью, поворачивая деталь на 90° только когда это необходимо для размещения.',
      materialAndParts: 'Материал и детали',
      filament: 'Пластик',
      partBox: 'Коробка',
      partLid: 'Крышка',
      partSleeve: 'Чехол',
      previewInPlace: 'Предпросмотр на месте',
      previewInPlaceHint: 'Показать крышку собранной на коробке в просмотрщике (экспортируемая геометрия не затрагивается).',
      startFrom: 'Начать с',
      startFromHint: 'Использовать существующий проект как отправную точку для этого.',
      walls: 'Стенки',
      chamfer: 'Фаска',
      details: 'Детали',
      closure: 'Тип крышки',
      closureNone: 'Нет',
      closureLid: 'Крышка',
      closureSleeve: 'Чехол',
      closureHinged: 'На петлях',
      closureCap: 'Муфта',
      closureNoneDesc: 'Открытый верх.',
      closureLidDesc: 'Крышка, которая сидит сверху коробки.',
      closureSleeveDesc: 'Кожух с открытым передом, в который коробка выдвигается, как ящик спичек.',
      closureHingedDesc: 'Плоская крышка, которая защёлкивается на петлях на заднем крае. Ничего дополнительного печатать не нужно.',
      closureCapDesc: 'Закрытый сверху колпак с четырьмя стенками, который надевается снаружи на коробку.',
      previewBoxInsideSleeve: 'Предпросмотр коробки внутри чехла',
      previewLidInPlace: 'Предпросмотр крышки на месте',
      tolerance: 'допуск',
      hingeCount: 'петля',
      lidCutouts: 'Вырезы',
      textRotation: 'Поворот',
      plateWidthLabel: 'Ширина пластины (мм)',
      plateDepthLabel: 'Глубина пластины (мм)',
      weightHint: 'Веса указаны для сплошной детали; реальные печати используют меньше с заполнением.',
      noSlotsNoCutouts: 'Нет пазов · нет вырезов',
      boxColor: 'Цвет коробки',
      lidColor: 'Цвет крышки',
      cutoutPattern: 'Узор вырезов',
      dividerHeight: 'Высота перегородки',
      fullHeight: 'полная',
      dividerHeightHint: 'Измеряется от дна. Полная высота совпадает с верхом коробки; укороченные перегородки остаются ниже края.',
      notchDescription: 'Вырезы от верхнего края, чтобы можно было захватывать карточки или плоские предметы в каждом отсеке.',
      notchOuterWalls: 'Вырезать внешние стенки',
      notchDividerWalls: 'Вырезать перегородки',
      nothingToNotch: 'Пока нечего вырезать.',
      turnOnOuterOrDivider: 'Включите вырезы во внешних стенках или перегородках.',
      roundedBottom: 'Скруглённое дно',
      slotWidth: 'Ширина паза',
      slotDepth: 'Глубина паза',
      slotDepthHint: 'Насколько глубоко паз опускается от верхнего края. Он всегда заканчивается выше дна.',
      slotPosition: 'Положение паза',
      slotPositionHint: 'Положение паза вдоль свободного участка; 50% — по центру.',
      wallCutoutDescription: 'Отверстия в боковых стенках и дне для экономии пластика.',
      floorCutouts: 'Вырезы в дне',
      dividerCutouts: 'Вырезы в перегородках',
      backWallHingeHint: 'Задняя стенка остаётся сплошной для крепления петли.',
      textRotationHint: 'При 90° или 270° текст идёт вдоль глубины, а не ширины.',
      roundedCorners: 'Скругление углов коробки и муфты',
      roundedCornersHint: 'Радиус внешних углов коробки. Внутренние углы муфты автоматически подстраиваются под коробку с учётом толщины стенок и зазора. 0 — прямые углы.',
      interiorToleranceHint: 'Дополнительный зазор внутри коробки сверх заданного размера. Увеличьте для свободной посадки, уменьшите для плотной.',
      chamferHint: 'Фаска 45° на четырёх внешних вертикальных рёбрах. Только внешний вид; 0 оставляет прямые углы.',
      hingeBackWallHint: 'При наличии петли задняя стенка остаётся сплошной.',
      turnOnOuterOrAddDividers: 'Включите вырезы во внешних стенках или добавьте перегородки по этим осям.',
      interiorLabel: 'внутр.',
      compartment: 'отсек',
      compartments: 'отсеков',
      lidLipIncluded: 'губка крышки включена',
      dividerThicknessHint: 'Толщина внутренних перегородок. Ограничена толщиной стенок',
    },
    startFromDialog: {
      title: 'Начать с…',
      close: 'Закрыть',
      volume: 'Объём',
      items: 'Предметы',
      divisions: 'Перегородки',
      volumeUnit: 'см³',
      volumeHint: 'Устанавливает внешнюю ширину, глубину и высоту примерно соответствующими этому объёму. Полезный внутренний объём окажется немного меньше после вычитания стенок.',
      apply: 'Применить',
      itemWidth: 'Ширина предмета (мм)',
      itemDepth: 'Глубина предмета (мм)',
      itemHeight: 'Высота предмета',
      compartments: 'Отсеки',
      lidLipIncluded: 'Губка крышки включена',
      dividerThicknessHint: 'Толщина внутренних перегородок. Ограничена толщиной стенок',
      itemsHint: 'Размеры — это чистое пространство, которое нужно каждому предмету. Стенки и перегородки добавляются сверху',
      compartmentDepths: 'Глубины отсеков (мм), спереди назад',
      compartmentDepthsPlaceholder: '51, 48, 30',
      wallThickness: 'Толщина стенок',
      wallThicknessHint: 'Используется как для внешних стенок, так и для перегородок.',
      totalOuterDepth: 'Общая внешняя глубина',
      compartmentsCount: 'отсеков',
      wallsCount: 'стенок',
    },
    dividerEditor: {
      visual: 'Визуально',
      numbers: 'Числа',
      dragDivider: 'Перетащите перегородку для перемещения.',
      dragDividerHint: 'Числа в каждой ячейке — чистые размеры в мм.',
      widthDivider: 'Перегородка по ширине',
      depthDivider: 'Перегородка по глубине',
      fromLeft: 'от левой',
      fromFront: 'от передней',
      noDividers: 'Нет перегородок.',
      clearSizes: 'Чистые размеры:',
      alongWidth: 'По ширине',
      alongDepth: 'По глубине',
      spaceEvenly: 'Равномерно',
      clearAll: 'Очистить всё',
      removeDivider: 'Удалить перегородку',
      front: 'перед',
    },
    projectsView: {
      workbench: 'Рабочее место',
      projects: 'Проекты',
      importJson: 'Импортировать JSON',
      exportAll: 'Экспортировать всё',
      newProject: 'Новый проект',
      searchPlaceholder: 'Поиск по имени или размеру, напр. 120',
      recent: 'Недавние',
      name: 'Имя',
      unsavedChanges: 'Несохранённые изменения',
      currentBox: 'Текущая коробка',
      update: 'Обновить',
      save: 'Сохранить',
      inTheEditor: 'В редакторе',
      saved: 'Сохранён',
      duplicate: 'Дублировать',
      open: 'Открыть',
      backToEditor: 'Назад к редактору',
      saveFirstProject: 'Сохраните свой первый проект',
      saveFirstProjectHint: 'Назовите текущую коробку выше, чтобы сохранить её здесь. Проекты хранятся в этом браузере; экспортируйте их для резервного копирования или переноса на другие устройства.',
      noProjectsMatch: 'Нет проектов, соответствующих "{query}".',
    },
  },
}
