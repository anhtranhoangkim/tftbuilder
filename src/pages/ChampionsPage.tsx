import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { ChampionAvatar } from '../components/ChampionAvatar'
import { PanelCard } from '../components/PanelCard'
import { champions } from '../data/mockData'

export function ChampionsPage() {
  const [query, setQuery] = useState('')

  const filteredChampions = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return champions
    }

    return champions.filter((champion) => {
      return (
        champion.name.toLowerCase().includes(normalized) ||
        champion.traits.some((trait) => trait.toLowerCase().includes(normalized))
      )
    })
  }, [query])

  return (
    <PanelCard title="Champion Explorer" subtitle="Filter by champion name or trait">
      <TextField
        size="small"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Filter champions..."
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 2, maxWidth: 360 }}
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 1.2 }}>
        {filteredChampions.map((champion) => (
          <Tooltip key={champion.name} title={`${champion.name} • Traits: ${champion.traits.join(', ')}`} arrow>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.7,
                p: 1,
                borderRadius: 2,
                '&:hover': { bgcolor: '#1e293b', transform: 'scale(1.03)', transition: 'all 0.2s ease' },
              }}
            >
              <ChampionAvatar champion={champion} size={48} />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {champion.name}
              </Typography>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </PanelCard>
  )
}
