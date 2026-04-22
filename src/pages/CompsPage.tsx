import { Box, Chip, List, ListItem, Stack, Typography } from '@mui/material'
import { ChampionAvatar } from '../components/ChampionAvatar'
import { PanelCard } from '../components/PanelCard'
import { TierChip } from '../components/TierChip'
import { teamComps } from '../data/mockData'

export function CompsPage() {
  return (
    <PanelCard title="Team Compositions" subtitle="Popular comp blueprints and stats">
      <List disablePadding>
        {teamComps.map((comp) => (
          <ListItem
            key={comp.name}
            disablePadding
            sx={{
              py: 1.5,
              borderBottom: '1px solid #1f2937',
              '&:last-child': { borderBottom: 'none' },
            }}
          >
            <Stack spacing={1.2} sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 700 }}>{comp.name}</Typography>
                <TierChip tier={comp.tier} />
              </Box>
              <Stack direction="row" spacing={0.7}>
                {comp.champions.map((champion) => (
                  <ChampionAvatar key={champion.name} champion={champion} size={32} />
                ))}
              </Stack>
              <Stack direction="row" spacing={0.7}>
                {comp.traits.map((trait) => (
                  <Chip key={trait} label={trait} size="small" sx={{ bgcolor: '#1e293b', color: 'text.secondary' }} />
                ))}
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {comp.stats}
              </Typography>
            </Stack>
          </ListItem>
        ))}
      </List>
    </PanelCard>
  )
}
