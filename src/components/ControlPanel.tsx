import { useState } from 'react'
import { AlertTriangle, CheckCircle2, Download, Wand2 } from 'lucide-react'
import { Button } from './ui/button'
import { Group } from './ui/group'
import { Segmented } from './ui/segmented'
import { SliderField } from './ui/slider-field'
import { SwitchRow } from './ui/switch'
import { StartFromDialog } from './StartFromDialog'
import { DividerEditor } from './DividerEditor'
import { BoxParams, dividerHeightMm, hasHinge, sleeveOuterDims, capOuterDims, LID_PATTERNS } from '@/utils/boxGenerator'
import { AppSettings } from '@/utils/projectStorage'
import { AXIS_COLORS as AXIS, Closure, closureOf, frictionLipDepth } from '@/utils/boxLayout'
import { FILAMENTS, formatGrams } from '@/utils/filament'
import { useI18n } from '@/i18n/index'

interface ControlPanelProps {
  params: BoxParams
  onParamsChange: (params: BoxParams) => void
  previewInPlace: boolean
  onPreviewInPlaceChange: (value: boolean) => void
  settings: AppSettings
  onSettingsChange: (settings: AppSettings) => void
  boxVolume: number
  lidVolume: number
  onExportBox: () => void
  onExportLid: () => void
  // The box and lid/sleeve fit on the plate at the same time (each may fit alone but not together)
  partsFitTogether: boolean
}

type TabType = 'box' | 'lid' | 'print'

const PRINTER_PRESETS: { label: string; bedX: number; bedY: number }[] = [
  { label: 'Custom', bedX: 0, bedY: 0 },
  { label: 'Bambu Lab X1 / P1S', bedX: 256, bedY: 256 },
  { label: 'Bambu Lab A1', bedX: 256, bedY: 256 },
  { label: 'Bambu Lab A1 Mini', bedX: 180, bedY: 180 },
  { label: 'Prusa MK4 / MK3S+', bedX: 250, bedY: 210 },
  { label: 'Prusa Mini+', bedX: 180, bedY: 180 },
  { label: 'Creality Ender 3', bedX: 220, bedY: 220 },
  { label: 'Creality K1 / K1 Max', bedX: 300, bedY: 300 },
  { label: 'Voron 2.4 (350)', bedX: 350, bedY: 350 },
  { label: 'Voron 0.2', bedX: 120, bedY: 120 },
  { label: 'Elegoo Neptune 4', bedX: 225, bedY: 225 },
]

const fieldCls = 'w-full px-3 py-2 text-sm rounded-md border bg-background focus:outline-none focus:border-ring'
const labelCls = 'text-xs text-muted-foreground'

export function ControlPanel({
  params, onParamsChange, previewInPlace, onPreviewInPlaceChange,
  settings, onSettingsChange, boxVolume, lidVolume, onExportBox, onExportLid, partsFitTogether,
}: ControlPanelProps) {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState<TabType>('box')
  const [startFromOpen, setStartFromOpen] = useState(false)

  const updateParam = (key: keyof BoxParams, value: number | boolean | string) => {
    const next = { ...params, [key]: value }
    // Divider walls can never be thicker than the outer walls
    if (key === 'wallThickness') {
      next.divisionThickness = Math.min(next.divisionThickness, value as number)
    }
    onParamsChange(next)
  }

  // ── Interior-dimension entry mode ───────────────────────────────────────────
  // width/depth/height always store the box's OUTER size (the generator never
  // sees dimensionMode/interiorTolerance). In 'interior' mode the Box tab's
  // sliders instead show/edit the target interior cavity size — the outer size
  // is derived so that cavity = entered value + tolerance. Sides lose two
  // walls; height only loses the floor (the top is open).
  const isInteriorMode = params.dimensionMode === 'interior'
  const wallTerm = (axis: 'width' | 'depth' | 'height') => axis === 'height' ? params.wallThickness : 2 * params.wallThickness
  // Keep stored dims at a sane precision — repeated +/- deltas across mode
  // switches otherwise accumulate binary floating-point noise (e.g. 91.59999999999985)
  const round2 = (n: number) => Math.round(n * 100) / 100

  const dimensionDisplayValue = (axis: 'width' | 'depth' | 'height') =>
    isInteriorMode
      ? Math.max(0, round2(params[axis] - wallTerm(axis) - params.interiorTolerance))
      : params[axis]

  const setDimension = (axis: 'width' | 'depth' | 'height', displayValue: number) => {
    updateParam(axis, isInteriorMode ? round2(displayValue + wallTerm(axis) + params.interiorTolerance) : displayValue)
  }

  // Wall thickness eats into the interior — in interior mode, grow the outer
  // size along with it so the content-size target the user set stays fit.
  const setWallThickness = (value: number) => {
    const deltaWt = value - params.wallThickness
    const next = { ...params, wallThickness: value }
    next.divisionThickness = Math.min(next.divisionThickness, value)
    if (isInteriorMode) {
      next.width = round2(params.width + 2 * deltaWt)
      next.depth = round2(params.depth + 2 * deltaWt)
      next.height = round2(params.height + deltaWt)
    }
    onParamsChange(next)
  }

  // Changing the fit tolerance shifts the outer size by the same delta on
  // every axis, keeping the interior target (the value shown in the field)
  // unchanged while the cavity itself tightens or loosens.
  const setInteriorTolerance = (value: number) => {
    const deltaTol = value - params.interiorTolerance
    onParamsChange({
      ...params,
      interiorTolerance: value,
      width: round2(params.width + deltaTol),
      depth: round2(params.depth + deltaTol),
      height: round2(params.height + deltaTol),
    })
  }

  // Entering interior mode loosens the box by the tolerance (so the cavity
  // reads back exactly what you'd type in); leaving it strips that same gap
  // back out, so a plain "Exterior" box never carries a leftover fit-tolerance
  // gap it can't account for. The two are exact inverses, so toggling back
  // and forth without touching anything else is lossless.
  const setDimensionMode = (mode: 'exterior' | 'interior') => {
    if (mode === params.dimensionMode) return
    const sign = mode === 'interior' ? 1 : -1
    const tol = params.interiorTolerance
    onParamsChange({
      ...params,
      dimensionMode: mode,
      width: Math.max(1, round2(params.width + sign * tol)),
      depth: Math.max(1, round2(params.depth + sign * tol)),
      height: Math.max(1, round2(params.height + sign * tol)),
    })
  }

  // ── Closure: none / lid / sleeve / hinged lid are one choice over three params ──
  const closure = closureOf(params)

  const setClosure = (c: Closure) => {
    if (c === closure) return
    if (c === 'none') onParamsChange({ ...params, includeLid: false })
    else if (c === 'sleeve') onParamsChange({ ...params, includeLid: true, lidStyle: 'sleeve', includeHinge: false })
    else if (c === 'cap') onParamsChange({ ...params, includeLid: true, lidStyle: 'cap', includeHinge: false })
    else onParamsChange({ ...params, includeLid: true, lidStyle: 'lid', includeHinge: c === 'hinged' })
  }

  const isSleeveStyle = closure === 'sleeve'
  const isCapStyle = closure === 'cap'
  // Hinged lids are flat — no lip, no tolerance
  const showTolerance = closure === 'sleeve' || closure === 'cap' || closure === 'lid'
  const toleranceValue = isSleeveStyle || isCapStyle ? params.sleeveTolerance : params.lidTolerance
  const lipDepth = frictionLipDepth(params)

  // ── Plate fit ───────────────────────────────────────────────────────────────
  const bedX = settings.printerBedX
  const bedY = settings.printerBedY
  const fitsPlate = (w: number, d: number) =>
    (w <= bedX && d <= bedY) || (w <= bedY && d <= bedX)

  const sleeve = params.lidStyle === 'cap' ? capOuterDims(params) : sleeveOuterDims(params)
  const footprints: { name: string; w: number; d: number }[] = [
    { name: 'Box', w: params.width, d: params.depth },
  ]
  if (params.includeLid) {
    footprints.push(isSleeveStyle || isCapStyle
      ? { name: isCapStyle ? 'Муфта' : 'Sleeve', w: +sleeve.w.toFixed(1), d: +sleeve.d.toFixed(1) }
      : { name: 'Lid', w: params.width, d: params.depth })
  }
  const oversized = footprints.filter(f => !fitsPlate(f.w, f.d))

  // ── Interior dimensions & compartment maths (readouts) ─────────────────────
  // Box dims are OUTER; interior loses two walls in X/Z and only the floor in Y
  const innerW = Math.max(0, params.width - 2 * params.wallThickness)
  const innerD = Math.max(0, params.depth - 2 * params.wallThickness)
  const innerH = Math.max(0, params.height - params.wallThickness - lipDepth)
  const fmt = (n: number) => String(Math.round(n * 10) / 10)
  const compartments = (params.divisionsX.length + 1) * (params.divisionsZ.length + 1)
  const hasDividers = params.divisionsX.length + params.divisionsZ.length > 0
  const fullDividerHeight = Math.max(0.5, params.height - params.wallThickness)

  const patternLabel = (value: string) => ({
    none: t.controlPanel.patternNone,
    circles: t.controlPanel.patternCircles,
    squares: t.controlPanel.patternSquares,
    diamonds: t.controlPanel.patternDiamonds,
    hexagons: t.controlPanel.patternHexagons,
    triangles: t.controlPanel.patternTriangles,
    slots: t.controlPanel.patternSlots,
  } as Record<string, string>)[value] ?? value
  // Dividers the finger slots can reach: X slots notch dividers along the width, Z slots along the depth
  const hasSlotDividers =
    ((params.fingerSlotAxes === 'x' || params.fingerSlotAxes === 'both') && params.divisionsX.length > 0) ||
    ((params.fingerSlotAxes === 'z' || params.fingerSlotAxes === 'both') && params.divisionsZ.length > 0)
  const fingerLabel = { none: t.controlPanel.none, x: t.controlPanel.xWalls, z: t.controlPanel.zWalls, both: t.controlPanel.both }[params.fingerSlotAxes]

  const renderPatternControls = (
    pattern: BoxParams['boxPattern'], size: number, spacing: number,
    keys: { pattern: keyof BoxParams; size: keyof BoxParams; spacing: keyof BoxParams },
  ) => (
    <>
      <select
        aria-label={t.controlPanel.cutoutPattern}
        value={pattern}
        onChange={(e) => updateParam(keys.pattern, e.target.value)}
        className={fieldCls}
      >
        {LID_PATTERNS.map(({ value }) => (
          <option key={value} value={value}>{patternLabel(value)}</option>
        ))}
      </select>
      {pattern !== 'none' && (
        <>
          <SliderField label={t.controlPanel.cutoutSize} unit="mm" min={3} max={25} step={0.5} value={size}
            onChange={(v) => updateParam(keys.size, v)} />
          <SliderField label={t.controlPanel.cutoutSpacing} unit="mm" min={2} max={15} step={0.5} value={spacing}
            onChange={(v) => updateParam(keys.spacing, v)}
            hint={t.controlPanel.cutoutSpacingHint} />
        </>
      )}
    </>
  )

  const tabs: [TabType, string][] = [['box', t.controlPanel.tabBox], ['lid', t.controlPanel.tabLid], ['print', t.controlPanel.tabPrint]]

  return (
    <div className="px-4 pb-4">
      {/* Tabs — sticky within the sidebar's scroll container */}
      <div className="sticky top-0 z-10 bg-card -mx-4 px-4 mb-4 border-b flex gap-5" role="tablist">
        {tabs.map(([tab, label]) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={`py-3 text-sm border-b-2 -mb-px transition-colors ${
              activeTab === tab
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'box' && (
        <div className="space-y-4">
          <Button variant="secondary" className="w-full justify-start text-muted-foreground" onClick={() => setStartFromOpen(true)}>
            <Wand2 className="mr-2 h-4 w-4" />
            {t.controlPanel.startFrom}
          </Button>

          <div className="space-y-0">
            <Group title={t.common.size} defaultOpen summary={`${fmt(params.width)}×${fmt(params.depth)}×${fmt(params.height)} ${t.common.mm}`}>
              <Segmented
                aria-label={t.controlPanel.dimensionMode}
                value={params.dimensionMode}
                onChange={setDimensionMode}
                options={[
                  { value: 'exterior', label: t.controlPanel.exterior },
                  { value: 'interior', label: t.controlPanel.interior },
                ]}
              />
              {isInteriorMode && (
                <SliderField
                  label={t.controlPanel.interiorTolerance}
                  unit={t.common.mm}
                  min={0}
                  max={10}
                  step={0.1}
                  value={params.interiorTolerance}
                  onChange={setInteriorTolerance}
                  hint={t.controlPanel.interiorToleranceHint}
                />
              )}
              <SliderField
                label={isInteriorMode ? `${t.controlPanel.width}, ${t.controlPanel.interiorLabel}` : t.controlPanel.width}
                unit={t.common.mm}
                color={AXIS.width}
                min={isInteriorMode ? 1 : 10}
                max={isInteriorMode
                  ? Math.max(1, (bedX > 0 ? bedX : 200) - wallTerm('width') - params.interiorTolerance)
                  : (bedX > 0 ? bedX : 200)}
                step={0.5}
                value={dimensionDisplayValue('width')}
                onChange={(value) => setDimension('width', value)}
              />
              <SliderField
                label={isInteriorMode ? `${t.controlPanel.depth}, ${t.controlPanel.interiorLabel}` : t.controlPanel.depth}
                unit={t.common.mm}
                color={AXIS.depth}
                min={isInteriorMode ? 1 : 10}
                max={isInteriorMode
                  ? Math.max(1, (bedY > 0 ? bedY : 200) - wallTerm('depth') - params.interiorTolerance)
                  : (bedY > 0 ? bedY : 200)}
                step={0.5}
                value={dimensionDisplayValue('depth')}
                onChange={(value) => setDimension('depth', value)}
              />
              <SliderField
                label={isInteriorMode ? `${t.controlPanel.height}, ${t.controlPanel.interiorLabel}` : t.controlPanel.height}
                unit={t.common.mm}
                color={AXIS.height}
                min={isInteriorMode ? 1 : 10}
                max={isInteriorMode ? Math.max(1, 200 - wallTerm('height') - params.interiorTolerance) : 200}
                step={0.5}
                value={dimensionDisplayValue('height')}
                onChange={(value) => setDimension('height', value)}
              />
              <div
                className="rounded-md border bg-background/40 px-3 py-2 text-xs text-muted-foreground"
                title={`Sides lose two ${params.wallThickness} mm walls; the height loses the floor${lipDepth > 0 ? ` and the ${params.lidHeight} mm lid lip` : ''}.`}
              >
                {isInteriorMode ? t.controlPanel.outerSize : t.controlPanel.usableInterior}{' '}
                <span className="font-mono text-foreground">
                  {isInteriorMode
                    ? `${fmt(params.width)} × ${fmt(params.depth)} × ${fmt(params.height)}`
                    : `${fmt(innerW)} × ${fmt(innerD)} × ${fmt(innerH)}`}
                </span>{' '}
                {t.common.mm}
                {isInteriorMode && (
                  <> · {t.controlPanel.interiorLabel} <span className="font-mono text-foreground">{fmt(innerW)} × {fmt(innerD)} × {fmt(innerH)}</span></>
                )}
                {lipDepth > 0 && <> · {params.lidHeight} {t.common.mm} {t.controlPanel.lidLipIncluded}</>}
              </div>
            </Group>

            <Group
              title={t.controlPanel.dividers}
              defaultOpen
              summary={`${compartments} ${compartments === 1 ? t.controlPanel.compartment : t.controlPanel.compartments}`}
            >
              <DividerEditor params={params} onChange={(patch) => onParamsChange({ ...params, ...patch })} />
              <SliderField
                label={t.controlPanel.dividers}
                unit={t.common.mm}
                min={0.4}
                max={params.wallThickness}
                step={0.2}
                value={params.divisionThickness}
                onChange={(value) => updateParam('divisionThickness', value)}
                hint={`${t.controlPanel.dividerThicknessHint} (${params.wallThickness} ${t.common.mm}).`}
              />
              {hasDividers && (
                <SliderField
                  label={t.controlPanel.dividerHeight}
                  unit={t.common.mm}
                  min={Math.min(1, fullDividerHeight)}
                  max={fullDividerHeight}
                  step={0.5}
                  value={dividerHeightMm(params)}
                  onChange={(value) => updateParam('dividerHeight', value >= fullDividerHeight - 0.01 ? 0 : value)}
                  suffix={params.dividerHeight <= 0 ? <span>{t.controlPanel.fullHeight}</span> : undefined}
                  hint={t.controlPanel.dividerHeightHint}
                />
              )}
            </Group>

            <Group title={t.controlPanel.walls} summary={`${fmt(params.wallThickness)} ${t.common.mm}`}>
              <SliderField
                label={t.controlPanel.wallThickness}
                unit={t.common.mm}
                min={1}
                max={10}
                step={0.5}
                value={params.wallThickness}
                onChange={setWallThickness}
                hint={isInteriorMode
                  ? 'Thickness of the outer walls and the floor. In inner-cavity mode the outer size grows with it, so the cavity stays put.'
                  : 'Thickness of the outer walls and the floor. Thicker walls shrink the interior; the outer size stays the same.'}
              />
              <SliderField
                label={t.controlPanel.chamfer}
                unit={t.common.mm}
                min={0}
                max={Math.min(params.wallThickness, params.width / 4, params.depth / 4)}
                step={0.5}
                value={params.chamferSize}
                onChange={(value) => updateParam('chamferSize', value)}
                hint={t.controlPanel.chamferHint}
              />
            </Group>

            <Group title={t.controlPanel.details} summary={[
                params.fingerSlotAxes !== 'none' ? `Finger slots: ${fingerLabel}` : null,
                params.boxPattern !== 'none' ? patternLabel(params.boxPattern) : null,
              ].filter(Boolean).join(' · ') || t.controlPanel.noSlotsNoCutouts}>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className={labelCls}>{t.controlPanel.boxColor}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={params.boxColor}
                      onChange={(e) => updateParam('boxColor', e.target.value)}
                      className="h-8 w-12 rounded border p-0.5"
                    />
                    <input
                      type="text"
                      value={params.boxColor}
                      onChange={(e) => {
                        const v = e.target.value
                        if (/^#[0-9a-fA-F]{0,6}$/.test(v) || v === '') updateParam('boxColor', v)
                      }}
                      className={`${fieldCls} !px-2 !py-1 text-xs font-mono`} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>{t.controlPanel.lidColor}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={params.lidColor}
                      onChange={(e) => updateParam('lidColor', e.target.value)}
                      className="h-8 w-12 rounded border p-0.5"
                    />
                    <input
                      type="text"
                      value={params.lidColor}
                      onChange={(e) => {
                        const v = e.target.value
                        if (/^#[0-9a-fA-F]{0,6}$/.test(v) || v === '') updateParam('lidColor', v)
                      }}
                      className={`${fieldCls} !px-2 !py-1 text-xs font-mono`} />
                  </div>
                </div>
              </div>
            </Group>

            <Group
              title={t.controlPanel.cutouts}
              summary={[
                params.fingerSlotAxes !== 'none' ? `Finger slots: ${fingerLabel}` : null,
                params.boxPattern !== 'none' ? patternLabel(params.boxPattern) : null,
              ].filter(Boolean).join(' · ') || t.controlPanel.noSlotsNoCutouts}
            >
              <div className="space-y-2">
                <span className={labelCls} title={t.controlPanel.notchDescription}>
                  {t.controlPanel.fingerSlots}
                </span>
                <Segmented
                  aria-label={t.controlPanel.fingerSlots}
                  value={params.fingerSlotAxes}
                  onChange={(value) => updateParam('fingerSlotAxes', value)}
                  options={[
                    { value: 'none', label: t.controlPanel.none },
                    { value: 'x', label: t.controlPanel.xWalls },
                    { value: 'z', label: t.controlPanel.zWalls },
                    { value: 'both', label: t.controlPanel.both },
                  ]}
                />
                {hasHinge(params) && params.fingerSlotAxes !== 'none' && params.fingerSlotWalls && (
                  <p className="text-xs text-muted-foreground">{t.controlPanel.hingeBackWallHint}</p>
                )}
              </div>
              {params.fingerSlotAxes !== 'none' && (
                <>
                  <SwitchRow
                    label={t.controlPanel.notchOuterWalls}
                    checked={params.fingerSlotWalls}
                    onChange={(v) => updateParam('fingerSlotWalls', v)}
                  />
                  {hasSlotDividers && (
                    <SwitchRow
                      label={t.controlPanel.notchDividerWalls}
                      checked={params.fingerSlotDividers}
                      onChange={(v) => updateParam('fingerSlotDividers', v)}
                    />
                  )}
                  {!params.fingerSlotWalls && !(hasSlotDividers && params.fingerSlotDividers) && (
                    <p className="text-xs text-amber-400">
                      {t.controlPanel.nothingToNotch}{' '}
                      {hasSlotDividers ? t.controlPanel.turnOnOuterOrDivider : t.controlPanel.turnOnOuterOrAddDividers}
                    </p>
                  )}
                  <SwitchRow
                    label={t.controlPanel.roundedBottom}
                    checked={params.fingerSlotRound}
                    onChange={(v) => updateParam('fingerSlotRound', v)}
                  />
                  <SliderField label={t.controlPanel.slotWidth} unit={t.common.mm} min={5} max={60} value={params.fingerSlotWidth}
                    onChange={(value) => updateParam('fingerSlotWidth', value)} />
                  <SliderField label={t.controlPanel.slotDepth} unit={t.common.mm} min={2}
                    max={Math.max(2, params.height - params.wallThickness - 0.5)} step={0.5}
                    value={params.fingerSlotDepth}
                    onChange={(value) => updateParam('fingerSlotDepth', value)}
                    hint={t.controlPanel.slotDepthHint} />
                  <SliderField label={t.controlPanel.slotPosition} unit="%" min={0} max={100} value={params.fingerSlotPosition}
                    onChange={(value) => updateParam('fingerSlotPosition', value)}
                    hint={t.controlPanel.slotPositionHint} />
                </>
              )}

              <div className="space-y-2 pt-1">
                <span className={labelCls} title={t.controlPanel.wallCutoutDescription}>{t.controlPanel.cutoutPattern}</span>
                {renderPatternControls(params.boxPattern, params.boxPatternSize, params.boxPatternSpacing,
                  { pattern: 'boxPattern', size: 'boxPatternSize', spacing: 'boxPatternSpacing' })}
                {params.boxPattern !== 'none' && (
                  <SwitchRow
                    label={t.controlPanel.floorCutouts}
                    checked={params.boxPatternFloor}
                    onChange={(v) => updateParam('boxPatternFloor', v)}
                  />
                )}
                {params.boxPattern !== 'none' && hasDividers && (
                  <SwitchRow
                    label={t.controlPanel.dividerCutouts}
                    checked={params.boxPatternDividers}
                    onChange={(v) => updateParam('boxPatternDividers', v)}
                  />
                )}
                {hasHinge(params) && params.boxPattern !== 'none' && (
                  <p className="text-xs text-muted-foreground">{t.controlPanel.backWallHingeHint}</p>
                )}
              </div>
            </Group>
          </div>
        </div>
      )}

      {activeTab === 'lid' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <span className={labelCls}>{t.controlPanel.closure}</span>
            <Segmented
              aria-label={t.controlPanel.closure}
              value={closure}
              onChange={setClosure}
              options={[
                { value: 'none', label: t.controlPanel.closureNone },
                { value: 'lid', label: t.controlPanel.closureLid },
                { value: 'sleeve', label: t.controlPanel.closureSleeve },
                { value: 'cap', label: t.controlPanel.closureCap },
                { value: 'hinged', label: t.controlPanel.closureHinged },
              ]}
            />
            <p className="text-xs text-muted-foreground">
              {{
                none: t.controlPanel.closureNoneDesc,
                lid: t.controlPanel.closureLidDesc,
                sleeve: t.controlPanel.closureSleeveDesc,
                cap: t.controlPanel.closureCapDesc,
                hinged: t.controlPanel.closureHingedDesc,
              }[closure]}
            </p>
          </div>

          {closure !== 'none' && (
            <>
              <SwitchRow
                label={isSleeveStyle ? t.controlPanel.previewBoxInsideSleeve : t.controlPanel.previewLidInPlace}
                checked={previewInPlace}
                onChange={onPreviewInPlaceChange}
              />

              {isCapStyle && (
                <div className="rounded-md border border-border/60 px-3 py-2">
                  <SwitchRow
                    label={t.controlPanel.fingerCutout}
                    checked={params.sleeveCutout}
                    onChange={(v) => updateParam('sleeveCutout', v)}
                  />
                </div>
              )}

              <div className="space-y-0">
                {showTolerance && (
                  <Group
                    title={t.controlPanel.fit}
                    defaultOpen
                    summary={`${toleranceValue} ${t.common.mm} ${t.controlPanel.tolerance}`}
                  >
                    {showTolerance && (
                      <SliderField
                        label={t.controlPanel.fitTolerance}
                        unit={t.common.mm}
                        min={0.1}
                        max={1}
                        step={0.05}
                        value={toleranceValue}
                        onChange={(value) => updateParam(isSleeveStyle || isCapStyle ? 'sleeveTolerance' : 'lidTolerance', value)}
                        hint={isSleeveStyle || isCapStyle
                          ? t.controlPanel.fitToleranceHintSleeve
                          : t.controlPanel.fitToleranceHint}
                      />
                    )}
                    {closure === 'lid' && (
                      <SliderField
                        label={t.controlPanel.lipHeight}
                        unit={t.common.mm}
                        min={2}
                        max={20}
                        step={0.5}
                        value={params.lidHeight}
                        onChange={(value) => updateParam('lidHeight', value)}
                        hint={t.controlPanel.lipHeightHint}
                      />
                    )}
                    {isSleeveStyle && (
                      <SwitchRow
                        label={t.controlPanel.fingerCutout}
                        checked={params.sleeveCutout}
                        onChange={(v) => updateParam('sleeveCutout', v)}
                      />
                    )}
                    {isCapStyle && (
                      <SliderField label={t.controlPanel.roundedCorners} unit={t.common.mm} min={0} max={Math.min(20, params.wallThickness * 2)} step={0.5}
                        value={params.capCornerRadius} onChange={(value) => updateParam('capCornerRadius', value)}
                        hint={t.controlPanel.roundedCornersHint} />
                    )}
                  </Group>
                )}

                {closure === 'hinged' && (
                  <Group title={t.controlPanel.hinge} defaultOpen summary={`${params.hingeCount} ${t.controlPanel.hingeCount}${params.hingeCount === 1 ? '' : 's'}`}>
                    <SliderField label={t.controlPanel.numberOfHinges} min={1} max={3} value={params.hingeCount}
                      onChange={(value) => updateParam('hingeCount', value)} />
                    <SliderField label={t.controlPanel.barrelDiameter} unit={t.common.mm} min={6} max={14} step={0.5} value={params.hingeDiameter}
                      onChange={(value) => updateParam('hingeDiameter', value)}
                      hint={t.controlPanel.barrelDiameterHint} />
                    <SliderField label={t.controlPanel.axleDiameter} unit={t.common.mm} min={2} max={5} step={0.5} value={params.hingePinDiameter}
                      onChange={(value) => updateParam('hingePinDiameter', value)}
                      hint={t.controlPanel.axleDiameterHint} />
                    <p className="text-xs text-muted-foreground">
                      {t.controlPanel.hingeInstructions}
                    </p>
                  </Group>
                )}

                <Group
                  title={t.controlPanel.lidCutouts}
                  summary={params.lidPattern === 'none' ? t.controlPanel.none : patternLabel(params.lidPattern)}
                >
                  {renderPatternControls(params.lidPattern, params.lidPatternSize, params.lidPatternSpacing,
                    { pattern: 'lidPattern', size: 'lidPatternSize', spacing: 'lidPatternSpacing' })}
                  <p className="text-xs text-muted-foreground">{t.controlPanel.textSolidPatch}</p>
                </Group>

                <Group
                  title={t.controlPanel.text}
                  summary={params.lidText.trim() ? `"${params.lidText.trim()}"` : t.controlPanel.none}
                >
                  <p className="text-xs text-muted-foreground">
                    {isSleeveStyle && !isCapStyle
                      ? t.controlPanel.textHintSleeve
                      : t.controlPanel.textHintLid}
                  </p>
                  <input
                    type="text"
                    aria-label={t.controlPanel.textOrEmoji}
                    value={params.lidText}
                    onChange={(e) => updateParam('lidText', e.target.value)}
                    placeholder={t.controlPanel.textOrEmoji}
                    className={fieldCls}
                  />
                  <SliderField label={t.controlPanel.textSize} unit={t.common.mm} min={8} max={40} value={params.lidTextSize}
                    onChange={(value) => updateParam('lidTextSize', value)} />
                  <SliderField label={t.controlPanel.textDepth} unit={t.common.mm} min={0.3} max={2} step={0.1} value={params.lidTextDepth}
                    onChange={(value) => updateParam('lidTextDepth', value)} />
                  <Segmented
                    aria-label={t.controlPanel.textStyle}
                    value={params.lidTextStyle}
                    onChange={(value) => updateParam('lidTextStyle', value)}
                    options={[
                      { value: 'engraved', label: t.controlPanel.engraved },
                      { value: 'embossed', label: t.controlPanel.embossed },
                    ]}
                  />
                  <div className="space-y-2">
                    <span className={labelCls} title={t.controlPanel.textRotationHint}>{t.controlPanel.textRotation}</span>
                    <Segmented
                      aria-label={t.controlPanel.textRotation}
                      value={params.lidTextRotation}
                      onChange={(value) => updateParam('lidTextRotation', value)}
                      options={[0, 90, 180, 270].map((deg) => ({ value: deg, label: `${deg}°` }))}
                    />
                  </div>
                </Group>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'print' && (
        <div className="space-y-0">
          <Group title={t.controlPanel.printerPlate} defaultOpen summary={`${bedX} × ${bedY} ${t.common.mm}`}>
            <select
              aria-label={t.controlPanel.printerPreset}
              className={fieldCls}
              value={PRINTER_PRESETS.findIndex(p => p.bedX === bedX && p.bedY === bedY)}
              onChange={(e) => {
                const preset = PRINTER_PRESETS[Number(e.target.value)]
                if (preset && preset.bedX > 0) {
                  onSettingsChange({ ...settings, printerBedX: preset.bedX, printerBedY: preset.bedY })
                }
              }}
            >
              {PRINTER_PRESETS.map((preset, i) => (
                <option key={i} value={i}>
                  {preset.label}{preset.bedX > 0 ? ` · ${preset.bedX} × ${preset.bedY}` : ''}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <label className={`space-y-1.5 ${labelCls}`}>
                {t.controlPanel.plateWidthLabel}
                <input type="number" value={bedX} className={fieldCls}
                  onChange={(e) => onSettingsChange({ ...settings, printerBedX: Number(e.target.value) })} />
              </label>
              <label className={`space-y-1.5 ${labelCls}`}>
                {t.controlPanel.plateDepthLabel}
                <input type="number" value={bedY} className={fieldCls}
                  onChange={(e) => onSettingsChange({ ...settings, printerBedY: Number(e.target.value) })} />
              </label>
            </div>
            {oversized.length > 0 ? (
              <div className="flex items-start gap-2 text-xs text-red-400 border border-red-500/40 bg-red-500/10 rounded-md p-3">
                <AlertTriangle className="h-4 w-4 mt-px shrink-0" />
                <p>
                  {oversized.map(f => `${f.name} (${f.w} × ${f.d} ${t.common.mm})`).join(' and ')} {t.controlPanel.plateFitWarning}
                </p>
              </div>
            ) : !partsFitTogether ? (
              <div className="flex items-start gap-2 text-xs text-amber-400 border border-amber-500/40 bg-amber-500/10 rounded-md p-3">
                <AlertTriangle className="h-4 w-4 mt-px shrink-0" />
                <p>
                  {footprints.map(f => f.name).join(' and ')} {t.controlPanel.plateFitWarningTogether}
                </p>
              </div>
            ) : (
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {footprints.length > 1 ? t.controlPanel.plateFitOk : t.controlPanel.plateFitOkSingle}
              </p>
            )}
            <SwitchRow
              label={t.controlPanel.autoArrange}
              checked={settings.autoArrange}
              onChange={(autoArrange) => onSettingsChange({ ...settings, autoArrange })}
            />
            <p className="text-xs text-muted-foreground -mt-2">
              {t.controlPanel.autoArrangeHint}
            </p>
          </Group>

          <Group title={t.controlPanel.materialAndParts} defaultOpen summary={settings.filament}>
            <Segmented
              aria-label={t.controlPanel.filament}
              value={settings.filament}
              onChange={(filament) => onSettingsChange({ ...settings, filament })}
              options={FILAMENTS.map(f => ({ value: f.value, label: f.value }))}
            />
            <div className="rounded-lg border divide-y">
              {([
                { name: t.controlPanel.partBox, dims: `${fmt(params.width)}×${fmt(params.depth)}×${fmt(params.height)}`, volume: boxVolume, onExport: onExportBox },
                ...(params.includeLid
                  ? [{
                      name: isSleeveStyle ? t.controlPanel.partSleeve : t.controlPanel.partLid,
                      dims: isSleeveStyle ? `${fmt(sleeve.w)}×${fmt(sleeve.d)}×${fmt(sleeve.h)}` : `${fmt(params.width)}×${fmt(params.depth)}`,
                      volume: lidVolume,
                      onExport: onExportLid,
                    }]
                  : []),
              ]).map((part) => (
                <div key={part.name} className="flex items-center gap-3 px-3 py-2 text-sm">
                  <span className="w-12">{part.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">{part.dims}</span>
                  <span className="ml-auto font-mono text-xs text-muted-foreground">
                    {part.volume > 0 ? `≈ ${formatGrams(part.volume, settings.filament)} g` : ''}
                  </span>
                  <button
                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
                    aria-label={`${t.app.exportStl} ${part.name}`}
                    title={`${t.app.exportStl} ${part.name}`}
                    onClick={part.onExport}
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">{t.controlPanel.weightHint}</p>
          </Group>
        </div>
      )}

      {startFromOpen && (
        <StartFromDialog
          params={params}
          onParamsChange={onParamsChange}
          onClose={() => setStartFromOpen(false)}
        />
      )}
    </div>
  )
}
