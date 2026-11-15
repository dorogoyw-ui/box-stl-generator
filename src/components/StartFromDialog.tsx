import { useEffect } from 'react'
import { X, CreditCard, HardDrive, Wrench, BatteryFull, CircleDot, Package, Gem, Layers } from 'lucide-react'
import { BoxParams, clampDivisionThickness } from '@/utils/boxGenerator'
import { useI18n } from '@/i18n/index'

interface StartFromDialogProps {
  params: BoxParams
  onParamsChange: (params: BoxParams) => void
  onClose: () => void
}

const presets = [
  // Dimensions and construction values are taken from the user's reference screenshots.
  { id: 'sd', icon: CreditCard, en: 'SD cards', ru: 'SD-карты', subEn: '12 SD cards in slots', subRu: '12 SD-карт в ячейках', width: 54, depth: 36, height: 18, cols: 12, rows: 1, wall: 1.6, divider: 1.6, bottom: 1.2, radius: 3, lid: false },
  { id: 'micro', icon: HardDrive, en: 'microSD', ru: 'microSD', subEn: '12 microSD cards', subRu: '12 карт microSD в кармане', width: 38, depth: 20, height: 10, cols: 12, rows: 1, wall: 1.6, divider: 1.6, bottom: 1.2, radius: 2, lid: false },
  { id: 'bits', icon: Wrench, en: 'Bit holder', ru: 'Держатель бит', subEn: '1/4” screwdriver bits', subRu: 'Биты 1/4” для шуруповёрта', width: 102, depth: 33, height: 18, cols: 10, rows: 3, wall: 1.6, divider: 1.6, bottom: 1.2, radius: 3, lid: false },
  { id: '18650', icon: BatteryFull, en: '18650 batteries', ru: 'Батарейки 18650', subEn: '8 batteries under a lid', subRu: '8 аккумуляторов под крышкой', width: 89, depth: 46, height: 68, cols: 4, rows: 2, wall: 2, divider: 2, bottom: 2, radius: 4, lid: true },
  { id: 'aa', icon: CircleDot, en: 'AA and AAA', ru: 'AA и AAA', subEn: 'Batteries by compartments', subRu: 'Батарейки по отсекам', width: 87, depth: 70, height: 40, cols: 5, rows: 4, wall: 1.6, divider: 1.6, bottom: 1.2, radius: 4, lid: false },
  { id: 'organizer', icon: Package, en: 'Organizer', ru: 'Органайзер', subEn: 'Screws and nuts, with lid', subRu: 'Винты и гайки, с крышкой', width: 150, depth: 100, height: 35, cols: 4, rows: 3, wall: 2, divider: 1.6, bottom: 2, radius: 5, lid: true },
  { id: 'jewelry', icon: Gem, en: 'Jewelry box', ru: 'Шкатулка', subEn: 'A box with a lid for small items', subRu: 'Коробка с крышкой для мелочей', width: 120, depth: 80, height: 40, cols: 3, rows: 2, wall: 2.4, divider: 2, bottom: 2.4, radius: 0, lid: true },
  { id: 'cards', icon: Layers, en: 'Playing cards', ru: 'Карты', subEn: 'Deck of 54 cards', subRu: 'Колода на 54 карты', width: 70, depth: 95, height: 24, cols: 1, rows: 1, wall: 2, divider: 2, bottom: 2, radius: 3, lid: true },
] as const

export function StartFromDialog({ params, onParamsChange, onClose }: StartFromDialogProps) {
  const { t } = useI18n()
  const isRu = t.startFromDialog.volumeUnit.toLowerCase().includes('см')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const choosePreset = (preset: typeof presets[number]) => {
    const positions = (count: number) => Array.from({ length: count - 1 }, (_, i) => ((i + 1) / count) * 100)
    const divisionThickness = clampDivisionThickness(preset.divider, preset.wall)
    onParamsChange({
      ...params,
      width: preset.width,
      depth: preset.depth,
      height: preset.height,
      dimensionMode: 'exterior',
      wallThickness: preset.wall,
      bottomThickness: preset.bottom,
      divisionThickness,
      divisionsX: positions(preset.cols),
      divisionsZ: positions(preset.rows),
      includeLid: preset.lid,
      includeHinge: false,
      lidStyle: 'lid',
      boxCornerRadius: preset.radius,
      chamferSize: 0,
      boxPattern: 'none',
      fingerSlotAxes: 'none',
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div role="dialog" aria-modal="true" aria-label={t.startFromDialog.title} className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border bg-popover p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-base">{isRu ? 'Выберите готовый шаблон' : 'Choose a box template'}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{isRu ? 'Нажмите на вариант — коробка сразу появится в 3D-просмотре' : 'Select a template to generate the box in the 3D preview'}</p>
          </div>
          <button onClick={onClose} aria-label={t.startFromDialog.close} className="rounded p-1 text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {presets.map((preset) => {
            const Icon = preset.icon
            return (
              <button key={preset.id} type="button" onClick={() => choosePreset(preset)} className="group rounded-xl border bg-card p-3 text-left transition hover:border-primary hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring">
                <div className="mb-3 flex aspect-[4/3] items-center justify-center rounded-lg bg-muted/70 text-foreground/80 group-hover:text-primary">
                  <Icon className="h-12 w-12 stroke-[1.35]" />
                </div>
                <div className="text-sm font-semibold leading-tight">{isRu ? preset.ru : preset.en}</div>
                <div className="mt-1 text-[11px] leading-snug text-muted-foreground">{isRu ? preset.subRu : preset.subEn}</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
