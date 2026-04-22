import { Box, Chip, Stack, Typography } from '@mui/material'
import { ChampionAvatar } from '../components/ChampionAvatar'
import { PanelCard } from '../components/PanelCard'
import { TierChip } from '../components/TierChip'
import { trendingComps } from '../data/mockData'

export function MetaPage() {
  return (
    <PanelCard title="TFT Set Meta Overview" subtitle="Updated daily • Patch 14.x">
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {trendingComps.map((comp) => (
          <PanelCard
            key={comp.name}
            sx={{
              width: { xs: '100%', md: 'calc(50% - 8px)' },
              bgcolor: '#0f172a',
              '&:hover': { transform: 'scale(1.03)', transition: 'all 0.2s ease', borderColor: '#374151' },
            }}
          >
            <Stack spacing={1.2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {comp.name}
              </Typography>
              <Stack direction="row" spacing={0.8}>
                {comp.champions.map((champion) => (
                  <ChampionAvatar key={champion.name} champion={champion} size={34} />
                ))}
              </Stack>
              <Stack direction="row" spacing={0.8}>
                {comp.traits.map((trait) => (
                  <Chip key={trait} label={trait} size="small" sx={{ bgcolor: '#1e293b', color: 'text.secondary' }} />
                ))}
              </Stack>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <TierChip tier={comp.tier} />
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Winrate {comp.winRate}
                </Typography>
              </Box>
            </Stack>
          </PanelCard>
        ))}
      </Box>
    </PanelCard>
  )
}
