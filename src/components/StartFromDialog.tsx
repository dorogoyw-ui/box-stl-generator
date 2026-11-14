import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import { Segmented } from './ui/segmented'
import { SliderField } from './ui/slider-field'
import { BoxParams, clampDivisionThickness } from '@/utils/boxGenerator'
import { frictionLipDepth, layoutFromDepths, layoutFromItemGrid } from '@/utils/boxLayout'
import { useI18n } from '@/i18n/index'

interface StartFromDialogProps {
  params: BoxParams
  onParamsChange: (params: BoxParams) => void
  onClose: () => void
}

type Mode = 'volume' | 'items' | 'divisions'

const fieldCls = 'w-full px-3 py-2 text-sm rounded-md border bg-background focus:outline-none focus:border-ring'

/** One-shot calculators that overwrite the box size/dividers: volume, items, or exact division depths. */
export function StartFromDialog({ params, onParamsChange, onClose }: StartFromDialogProps) {
  const { t } = useI18n()
  const [mode, setMode] = useState<Mode>('volume')

  const [volume, setVolume] = useState(1000) // cubic mm
  const [compartmentCount, setCompartmentCount] = useState(4)
  const [itemWidth, setItemWidth] = useState(50) // mm
  const [itemDepth, setItemDepth] = useState(30) // mm
  const [itemHeight, setItemHeight] = useState(10) // mm
  const [divisionSizes, setDivisionSizes] = useState('51, 45, 29') // mm
  const [divisionWallThickness, setDivisionWallThickness] = useState(2) // mm

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const lipDepth = frictionLipDepth(params)

  const apply = (next: BoxParams) => {
    onParamsChange(next)
    onClose()
  }

  const generateFromVolume = () => {
    // Cube root for roughly cubic proportions, then adjust
    const side = Math.cbrt(volume)
    apply({
      ...params,
      width: Math.round(side * 1.2), // slightly wider
      depth: Math.round(side),
      height: Math.round(side * 0.8), // slightly shorter
    })
  }

  const generateFromCompartments = () => {
    const cols = Math.ceil(Math.sqrt(compartmentCount))
    const rows = Math.ceil(compartmentCount / cols)
    const wall = params.wallThickness
    const grid = layoutFromItemGrid(itemWidth, itemDepth, cols, rows, wall, clampDivisionThickness(params.divisionThickness, wall))

    apply({
      ...params,
      width: grid.width,
      depth: grid.depth,
      height: Math.round((itemHeight + wall + lipDepth) * 100) / 100,
      divisionsX: grid.divisionsX,
      divisionsZ: grid.divisionsZ,
    })
  }

  const divisions = divisionSizes
    .split(',')
    .map(s => parseFloat(s.trim()))
    .filter(n => !isNaN(n) && n > 0)
  const divisionsLayout = layoutFromDepths(divisions, divisionWallThickness)

  const generateFromDivisions = () => {
    if (divisions.length === 0) return
    apply({
      ...params,
      depth: divisionsLayout.depth,
      wallThickness: divisionWallThickness,
      divisionThickness: divisionWallThickness,
      divisionsX: [],
      divisionsZ: divisionsLayout.positions,
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div role="dialog" aria-modal="true" aria-label={t.startFromDialog.title} className="w-full max-w-sm rounded-xl border bg-popover p-5 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">{t.startFromDialog.title}</h2>
          <button onClick={onClose} aria-label={t.startFromDialog.close} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <Segmented
          aria-label={t.startFromDialog.title}
          value={mode}
          onChange={setMode}
          options={[
            { value: 'volume', label: t.startFromDialog.volume },
            { value: 'items', label: t.startFromDialog.items },
            { value: 'divisions', label: t.startFromDialog.divisions },
          ]}
        />

        {mode === 'volume' && (
          <div className="space-y-4">
            <SliderField
              label={t.startFromDialog.volume}
              unit={t.startFromDialog.volumeUnit}
              min={100}
              max={10000}
              step={50}
              value={volume}
              onChange={setVolume}
              format={(v) => (v / 1000).toFixed(1)}
              parse={(s) => Number(s) * 1000}
            />
            <p className="text-xs text-muted-foreground">
              {t.startFromDialog.volumeHint}
            </p>
            <Button className="w-full" onClick={generateFromVolume}>{t.startFromDialog.apply}</Button>
          </div>
        )}

        {mode === 'items' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-1.5 text-xs text-muted-foreground">
                {t.startFromDialog.itemWidth}
                <input type="number" value={itemWidth} onChange={(e) => setItemWidth(Number(e.target.value))} className={fieldCls} />
              </label>
              <label className="space-y-1.5 text-xs text-muted-foreground">
                {t.startFromDialog.itemDepth}
                <input type="number" value={itemDepth} onChange={(e) => setItemDepth(Number(e.target.value))} className={fieldCls} />
              </label>
            </div>
            <SliderField label={t.startFromDialog.itemHeight} unit="mm" min={5} max={50} value={itemHeight} onChange={setItemHeight} />
            <SliderField label={t.startFromDialog.compartments} min={1} max={16} value={compartmentCount} onChange={setCompartmentCount} />
            <p className="text-xs text-muted-foreground">
              {t.startFromDialog.itemsHint}
              {lipDepth > 0 && `, plus the ${params.lidHeight} mm lid lip so items still fit with the lid on`}.
            </p>
            <Button className="w-full" onClick={generateFromCompartments}>{t.startFromDialog.apply}</Button>
          </div>
        )}

        {mode === 'divisions' && (
          <div className="space-y-4">
            <label className="block space-y-1.5 text-xs text-muted-foreground">
              {t.startFromDialog.compartmentDepths}
              <input
                type="text"
                value={divisionSizes}
                onChange={(e) => setDivisionSizes(e.target.value)}
                placeholder={t.startFromDialog.compartmentDepthsPlaceholder}
                className={fieldCls}
              />
            </label>
            <SliderField
              label={t.startFromDialog.wallThickness}
              unit="mm"
              min={1}
              max={5}
              step={0.5}
              value={divisionWallThickness}
              onChange={setDivisionWallThickness}
              hint={t.startFromDialog.wallThicknessHint}
            />
            {divisions.length > 0 && (
              <div className="rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
                {t.startFromDialog.totalOuterDepth} <span className="font-mono text-foreground">{divisionsLayout.depth} mm</span>
                {' '}({divisions.length} {t.startFromDialog.compartmentsCount}{divisions.length === 1 ? '' : 's'} + {divisions.length + 1} {t.startFromDialog.wallsCount})
              </div>
            )}
            <Button className="w-full" onClick={generateFromDivisions} disabled={divisions.length === 0}>{t.startFromDialog.apply}</Button>
          </div>
        )}
      </div>
    </div>
  )
}
