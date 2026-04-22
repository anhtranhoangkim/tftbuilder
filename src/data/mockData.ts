export type Champion = {
  name: string
  initials: string
  cost: number
  color: string
  traits: string[]
}

export type TraitInfo = {
  name: string
  count: number
  target: number
  tier: 'gold' | 'silver' | 'bronze'
  icon: string
}

export type CompCard = {
  name: string
  champions: Champion[]
  traits: string[]
  tier: 'S' | 'A' | 'B'
  winRate: string
}

const championPool: Champion[] = [
  { name: 'Yone', initials: 'Y', cost: 3, color: '#2563eb', traits: ['Edgelord', 'Crowd Diver'] },
  { name: 'Akali', initials: 'A', cost: 4, color: '#7c3aed', traits: ['K/DA', 'Executioner'] },
  { name: 'Zed', initials: 'Z', cost: 4, color: '#4f46e5', traits: ['Crowd Diver', 'Edgelord'] },
  { name: 'Qiyana', initials: 'Q', cost: 4, color: '#0ea5e9', traits: ['True Damage', 'Crowd Diver'] },
  { name: 'Viego', initials: 'V', cost: 4, color: '#8b5cf6', traits: ['Pentakill', 'Edgelord'] },
  { name: 'Karthus', initials: 'K', cost: 4, color: '#6366f1', traits: ['Pentakill', 'Executioner'] },
  { name: 'Ahri', initials: 'Ah', cost: 4, color: '#ec4899', traits: ['K/DA', 'Spellweaver'] },
  { name: 'Ekko', initials: 'E', cost: 3, color: '#06b6d4', traits: ['True Damage', 'Sentinel'] },
  { name: 'Neeko', initials: 'N', cost: 3, color: '#14b8a6', traits: ['K/DA', 'Sentinel'] },
  { name: 'Yasuo', initials: 'Ya', cost: 1, color: '#0ea5e9', traits: ['True Damage', 'Edgelord'] },
  { name: 'Jinx', initials: 'J', cost: 2, color: '#3b82f6', traits: ['Punk', 'Rapidfire'] },
  { name: 'Lucian', initials: 'L', cost: 5, color: '#9333ea', traits: ['Jazz', 'Rapidfire'] },
]

export const champions = championPool

export const trendingComps: CompCard[] = [
  {
    name: 'Edgelord Diver',
    champions: [championPool[0], championPool[2], championPool[3], championPool[4]],
    traits: ['Edgelord', 'Crowd Diver', 'Pentakill'],
    tier: 'S',
    winRate: '56.1%',
  },
  {
    name: 'K/DA Spellweaver',
    champions: [championPool[1], championPool[6], championPool[8], championPool[7]],
    traits: ['K/DA', 'Spellweaver', 'Sentinel'],
    tier: 'A',
    winRate: '54.3%',
  },
  {
    name: 'Pentakill Executioner',
    champions: [championPool[5], championPool[4], championPool[2], championPool[11]],
    traits: ['Pentakill', 'Executioner', 'Rapidfire'],
    tier: 'A',
    winRate: '53.8%',
  },
  {
    name: 'True Damage Tempo',
    champions: [championPool[3], championPool[7], championPool[9], championPool[10]],
    traits: ['True Damage', 'Sentinel', 'Rapidfire'],
    tier: 'B',
    winRate: '52.4%',
  },
]

export const traitRows: TraitInfo[] = [
  { name: 'Edgelord', count: 3, target: 5, tier: 'gold', icon: 'E' },
  { name: 'Crowd Diver', count: 2, target: 4, tier: 'silver', icon: 'C' },
  { name: 'K/DA', count: 2, target: 3, tier: 'silver', icon: 'K' },
  { name: 'Pentakill', count: 1, target: 3, tier: 'bronze', icon: 'P' },
  { name: 'Sentinel', count: 2, target: 4, tier: 'bronze', icon: 'S' },
]

export const topComps = [
  {
    name: 'Edgelord Tempo',
    champions: [championPool[0], championPool[2], championPool[4], championPool[9]],
    tier: 'S' as const,
    stats: '56.0% • 4.18',
  },
  {
    name: 'K/DA Flex',
    champions: [championPool[1], championPool[6], championPool[8], championPool[7]],
    tier: 'A' as const,
    stats: '54.4% • 4.34',
  },
  {
    name: 'Pentakill Board',
    champions: [championPool[5], championPool[4], championPool[2], championPool[11]],
    tier: 'A' as const,
    stats: '53.6% • 4.46',
  },
  {
    name: 'Jazz Rapidfire',
    champions: [championPool[11], championPool[10], championPool[6], championPool[7]],
    tier: 'B' as const,
    stats: '51.8% • 4.61',
  },
]

export const teamComps = [
  {
    name: 'Edgelord Assassins',
    champions: [championPool[0], championPool[2], championPool[3], championPool[4]],
    traits: ['Edgelord 3', 'Crowd Diver 2', 'Pentakill 2'],
    stats: 'Avg Place 4.08 • Top4 61%',
    tier: 'S' as const,
  },
  {
    name: 'K/DA Midrange',
    champions: [championPool[1], championPool[6], championPool[8], championPool[7]],
    traits: ['K/DA 3', 'Sentinel 2', 'Spellweaver 2'],
    stats: 'Avg Place 4.33 • Top4 57%',
    tier: 'A' as const,
  },
  {
    name: 'Pentakill Frontline',
    champions: [championPool[5], championPool[4], championPool[2], championPool[11]],
    traits: ['Pentakill 3', 'Executioner 2', 'Rapidfire 2'],
    stats: 'Avg Place 4.45 • Top4 54%',
    tier: 'A' as const,
  },
  {
    name: 'Tempo Rapidfire',
    champions: [championPool[10], championPool[11], championPool[7], championPool[9]],
    traits: ['Rapidfire 3', 'Jazz 2', 'Sentinel 2'],
    stats: 'Avg Place 4.72 • Top4 50%',
    tier: 'B' as const,
  },
]

export const championExplorer = championPool

export const boardCells = Array.from({ length: 28 }, (_, index) => {
  const championIndexes = [2, 4, 8, 11, 15, 18, 20, 24]
  const pick = championIndexes.indexOf(index)

  if (pick > -1) {
    const champion = championPool[pick]
    return {
      id: index,
      champion,
      items: [`${pick + 1}`, `${pick + 2}`].slice(0, pick % 2 === 0 ? 2 : 1),
    }
  }

  return { id: index, champion: null, items: [] as string[] }
})
