import SearchIcon from '@mui/icons-material/Search'
import {
  Avatar,
  Box,
  Chip,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo, useState, type DragEvent } from 'react'
import { ChampionAvatar } from '../components/ChampionAvatar'
import { PanelCard } from '../components/PanelCard'
import { TraitRow } from '../components/TraitRow'
import { champions, itemPool, type Champion } from '../data/mockData'

type BoardCell = {
  id: number
  champion: Champion | null
  items: string[]
}

type DragPayload =
  | { type: 'champion'; champion: Champion }
  | { type: 'item'; itemName: string }
  | { type: 'boardChampion'; fromCellId: number }

const initialBoard: BoardCell[] = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  champion: null,
  items: [],
}))
const hexRows = [0, 1, 2, 3]
const hexesPerRow = 7
/**
 * Pointy-top regular hex (width < height), matching TFT-style honeycomb when staggered.
 * H = vertex-to-vertex vertical span; W = flat-to-flat horizontal span = H × (√3/2).
 */
const HEX_HEIGHT = 80
const HEX_WIDTH = HEX_HEIGHT * (Math.sqrt(3) / 2)

const POINTY_TOP_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

/** Small gutter between hex cells (px). */
const HEX_GAP = 6

/**
 * With horizontal columnGap, row overlap must loosen too or diagonals look tighter than horizontals.
 * For pointy-top honeycomb, ~ gap × (2/√3) matches neighbor spacing to columnGap (~1.155).
 */
const HEX_ROW_GAP_MATCH = 2 / Math.sqrt(3)

const traitThresholds: Record<string, number> = {
  Edgelord: 5,
  'Crowd Diver': 4,
  'K/DA': 3,
  Pentakill: 5,
  Executioner: 4,
  'True Damage': 4,
  Sentinel: 4,
  Spellweaver: 4,
  Punk: 4,
  Rapidfire: 4,
  Jazz: 3,
}

function getTier(count: number, target: number): 'gold' | 'silver' | 'bronze' {
  const ratio = count / target
  if (ratio >= 0.75) return 'gold'
  if (ratio >= 0.5) return 'silver'
  return 'bronze'
}

export function BuilderPage() {
  const [board, setBoard] = useState<BoardCell[]>(initialBoard)
  const [unitQuery, setUnitQuery] = useState('')
  const [itemQuery, setItemQuery] = useState('')
  const [activeItemCategory, setActiveItemCategory] = useState<'All' | 'Tank' | 'Damage' | 'Utility'>('All')

  const filteredChampions = useMemo(() => {
    const normalized = unitQuery.trim().toLowerCase()
    if (!normalized) return champions
    return champions.filter((champion) => {
      return (
        champion.name.toLowerCase().includes(normalized) ||
        champion.traits.some((trait) => trait.toLowerCase().includes(normalized))
      )
    })
  }, [unitQuery])

  const filteredItems = useMemo(() => {
    return itemPool.filter((item) => {
      const normalized = itemQuery.trim().toLowerCase()
      const matchesQuery = !normalized || item.name.toLowerCase().includes(normalized)
      const matchesCategory = activeItemCategory === 'All' || item.category === activeItemCategory
      return matchesQuery && matchesCategory
    })
  }, [itemQuery, activeItemCategory])

  const activeTraits = useMemo(() => {
    const traitCounts = board.reduce<Record<string, number>>((acc, cell) => {
      if (!cell.champion) return acc
      cell.champion.traits.forEach((trait) => {
        acc[trait] = (acc[trait] ?? 0) + 1
      })
      return acc
    }, {})

    return Object.entries(traitCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => {
        const target = traitThresholds[name] ?? 4
        return { name, count, target, icon: name[0], tier: getTier(count, target) }
      })
  }, [board])

  const setDragData = (event: DragEvent, payload: DragPayload, mode: 'copy' | 'move' = 'copy') => {
    event.dataTransfer.setData('application/json', JSON.stringify(payload))
    event.dataTransfer.effectAllowed = mode
  }

  const clearCell = (cellId: number) => {
    setBoard((currentBoard) =>
      currentBoard.map((currentCell) =>
        currentCell.id === cellId ? { ...currentCell, champion: null, items: [] } : currentCell,
      ),
    )
  }

  const handleDropOnCell = (event: DragEvent, cellId: number) => {
    event.preventDefault()
    const raw = event.dataTransfer.getData('application/json')
    if (!raw) return

    try {
      const payload = JSON.parse(raw) as DragPayload
      if (payload.type === 'champion') {
        setBoard((currentBoard) =>
          currentBoard.map((cell) => (cell.id === cellId ? { ...cell, champion: payload.champion, items: [] } : cell)),
        )
        return
      }

      if (payload.type === 'item') {
        setBoard((currentBoard) =>
          currentBoard.map((cell) => {
            if (cell.id !== cellId) return cell
            if (!cell.champion || cell.items.length >= 3) return cell
            if (cell.items.includes(payload.itemName)) return cell
            return { ...cell, items: [...cell.items, payload.itemName] }
          }),
        )
        return
      }

      if (payload.type === 'boardChampion') {
        setBoard((currentBoard) => {
          const fromCell = currentBoard.find((cell) => cell.id === payload.fromCellId)
          if (!fromCell?.champion) return currentBoard
          if (payload.fromCellId === cellId) return currentBoard

          return currentBoard.map((cell) => {
            if (cell.id === payload.fromCellId) {
              return { ...cell, champion: null, items: [] }
            }
            if (cell.id === cellId) {
              return { ...cell, champion: fromCell.champion, items: fromCell.items }
            }
            return cell
          })
        })
      }
    } catch {
      // Ignore invalid external drag payloads.
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        {/* alignItems: flex-start prevents equal-height columns from stretching the board (which was distorting hex cells). */}
        <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Grid size={{ xs: 12, md: 9 }} sx={{ alignSelf: 'flex-start' }}>
            <PanelCard title="Board" subtitle="Drag units and items into hexes">
              <Box sx={{ overflowX: 'auto', py: 0.5 }}>
                {/*
                  Honeycomb (pointy-top hex, 4×7): width W < height H.
                  - Row: flex + columnGap for a light gutter between neighbors.
                  - Rows 2 & 4: translateX((W + gap)/2) so stagger matches pitched centers.
                  - Row overlap: flush nest is -0.25×H; add HEX_ROW_GAP_MATCH×gap so gutters match columnGap.
                */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: `calc(${HEX_WIDTH * 7.5 + HEX_GAP * 6}px)`,
                    minWidth: `calc(${HEX_WIDTH * 7.5 + HEX_GAP * 6}px)`,
                    '--hex-w': `${HEX_WIDTH}px`,
                    '--hex-h': `${HEX_HEIGHT}px`,
                    '--hex-gap': `${HEX_GAP}px`,
                    '--hex-row-overlap': `calc(var(--hex-h) * -0.25 + var(--hex-gap) * ${HEX_ROW_GAP_MATCH})`,
                    '--hex-offset': `calc((var(--hex-w) + var(--hex-gap)) / 2)`,
                  }}
                >
                  {hexRows.map((rowIndex) => {
                    const rowCells = board.slice(rowIndex * hexesPerRow, rowIndex * hexesPerRow + hexesPerRow)
                    return (
                      <Box
                        key={rowIndex}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          flexShrink: 0,
                          columnGap: 'var(--hex-gap)',
                          height: 'var(--hex-h)',
                          /* Flex column parent: margins do not collapse between rows, so overlap applies reliably. */
                          mt: rowIndex === 0 ? 0 : 'var(--hex-row-overlap)',
                          transform: rowIndex % 2 === 1 ? 'translateX(var(--hex-offset))' : 'none',
                        }}
                      >
                        {rowCells.map((cell) => (
                          <Box
                            className="hex-cell"
                            key={cell.id}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={(event) => handleDropOnCell(event, cell.id)}
                            onContextMenu={(event) => {
                              event.preventDefault()
                              clearCell(cell.id)
                            }}
                            sx={{
                              position: 'relative',
                              flex: '0 0 auto',
                              /* Pointy-top: W < H. */
                              width: 'var(--hex-w)',
                              minWidth: 'var(--hex-w)',
                              maxWidth: 'var(--hex-w)',
                              height: 'var(--hex-h)',
                              minHeight: 'var(--hex-h)',
                              maxHeight: 'var(--hex-h)',
                              overflow: 'hidden',
                              clipPath: POINTY_TOP_CLIP,
                              border: '1px solid #4a5163',
                              bgcolor: '#343a48',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              boxSizing: 'border-box',
                              '&:hover': { borderColor: '#5c6578', bgcolor: '#323845' },
                            }}
                          >
                            {cell.champion && (
                              <Box
                                draggable
                                onDragStart={(event) => setDragData(event, { type: 'boardChampion', fromCellId: cell.id }, 'move')}
                                onDragEnd={(event) => {
                                  if (event.dataTransfer.dropEffect === 'none') {
                                    clearCell(cell.id)
                                  }
                                }}
                                sx={{ display: 'flex' }}
                              >
                                <ChampionAvatar champion={cell.champion} size={36} />
                              </Box>
                            )}
                            {cell.items.length > 0 && (
                              <Box sx={{ position: 'absolute', right: 2, bottom: 8, display: 'flex', gap: 0.35 }}>
                                {cell.items.map((item) => (
                                  <Avatar
                                    key={item}
                                    sx={{ width: 14, height: 14, bgcolor: '#312e81', fontSize: 8 }}
                                  >
                                    {item.slice(0, 1)}
                                  </Avatar>
                                ))}
                              </Box>
                            )}
                          </Box>
                        ))}
                      </Box>
                    )
                  })}
                </Box>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1.2, display: 'block' }}>
                Tip: Right-click a hex to clear it, or drag a unit outside the board to remove it.
              </Typography>
            </PanelCard>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <PanelCard title="Traits" subtitle="Active from current board">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {activeTraits.length === 0 ? (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Add units to see active traits.
                  </Typography>
                ) : (
                  activeTraits.map((trait) => <TraitRow key={trait.name} trait={trait} />)
                )}
              </Box>
            </PanelCard>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <PanelCard title="Units and Items" subtitle="Drag champions or items onto the board">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>Units</Typography>
                <TextField
                  size="small"
                  value={unitQuery}
                  onChange={(event) => setUnitQuery(event.target.value)}
                  placeholder="Search units..."
                  sx={{ width: 220 }}
                  slotProps={{
                    input: {
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 18 }} />,
                    },
                  }}
                />
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(9, minmax(0, 1fr))', gap: 0.8 }}>
                {filteredChampions.map((champion) => (
                  <Box
                    key={champion.name}
                    draggable
                    onDragStart={(event) => setDragData(event, { type: 'champion', champion })}
                    sx={{ display: 'flex', justifyContent: 'center', cursor: 'grab' }}
                  >
                    <ChampionAvatar champion={champion} size={38} />
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>Items</Typography>
                <TextField
                  size="small"
                  value={itemQuery}
                  onChange={(event) => setItemQuery(event.target.value)}
                  placeholder="Search items..."
                  sx={{ width: 220 }}
                  slotProps={{
                    input: {
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 18 }} />,
                    },
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap', mb: 1.2 }}>
                {(['All', 'Tank', 'Damage', 'Utility'] as const).map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    size="small"
                    onClick={() => setActiveItemCategory(category)}
                    sx={{
                      bgcolor: activeItemCategory === category ? '#334155' : '#1f2937',
                      color: 'text.primary',
                    }}
                  />
                ))}
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 0.8 }}>
                {filteredItems.map((item) => (
                  <Box
                    key={item.id}
                    draggable
                    onDragStart={(event) => setDragData(event, { type: 'item', itemName: item.name })}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.4, cursor: 'grab' }}
                  >
                    <Avatar sx={{ width: 34, height: 34, bgcolor: item.color, fontSize: 11 }}>{item.short}</Avatar>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 10 }}>
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </PanelCard>
      </Grid>
    </Grid>
  )
}
