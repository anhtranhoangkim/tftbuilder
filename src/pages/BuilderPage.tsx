import { Avatar, Box, Grid, Stack } from '@mui/material'
import { ChampionAvatar } from '../components/ChampionAvatar'
import { PanelCard } from '../components/PanelCard'
import { TraitRow } from '../components/TraitRow'
import { boardCells, traitRows } from '../data/mockData'

export function BuilderPage() {
  return (
    <Grid container spacing={2.2}>
      <Grid size={{ xs: 12, md: 8 }}>
        <PanelCard title="Team Builder" subtitle="Drag & drop champions (UI placeholder)">
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 1.1 }}>
            {boardCells.map((cell) => (
              <Box
                key={cell.id}
                sx={{
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  border: '1px solid #253045',
                  borderRadius: 1.4,
                  bgcolor: '#0b1220',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': { transform: 'scale(1.03)', transition: 'all 0.2s ease', borderColor: '#334155' },
                }}
              >
                {cell.champion && (
                  <>
                    <ChampionAvatar champion={cell.champion} size={40} />
                    <Stack direction="row" spacing={0.4} sx={{ position: 'absolute', right: 4, bottom: 4 }}>
                      {cell.items.map((item) => (
                        <Avatar key={item} sx={{ width: 16, height: 16, bgcolor: '#312e81', fontSize: 9 }}>
                          {item}
                        </Avatar>
                      ))}
                    </Stack>
                  </>
                )}
              </Box>
            ))}
          </Box>
        </PanelCard>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <PanelCard title="Active Traits" subtitle="Counts and thresholds">
          <Stack spacing={1}>
            {traitRows.map((trait) => (
              <TraitRow key={trait.name} trait={trait} />
            ))}
          </Stack>
        </PanelCard>
      </Grid>
    </Grid>
  )
}
