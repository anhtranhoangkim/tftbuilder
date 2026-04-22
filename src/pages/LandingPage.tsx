import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { PanelCard } from '../components/PanelCard'
import { TraitRow } from '../components/TraitRow'
import { boardCells, traitRows } from '../data/mockData'
import { ChampionAvatar } from '../components/ChampionAvatar'

const features = [
  {
    title: 'Team Builder',
    description: 'Craft and iterate TFT boards quickly with flexible champion placements.',
  },
  {
    title: 'Trait Calculator',
    description: 'Track active synergies and thresholds with instant visual feedback.',
  },
  {
    title: 'Meta Insights',
    description: 'Follow high-performing comps, tiers, and winrate trends by patch.',
  },
]

export function LandingPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Stack spacing={5}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={2} sx={{ textAlign: 'center', maxWidth: 760, width: '100%', alignItems: 'center' }}>
              <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 50 }, fontWeight: 800, lineHeight: 1.05 }}>
                Build Your TFT Team Like a Pro
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Analyze meta, optimize traits, and share builds instantly
              </Typography>
              <Box
                sx={{
                  pt: 1,
                  display: 'flex',
                  gap: 1.5,
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'center',
                }}
              >
                <Button component={RouterLink} to="/builder" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
                  Start Building
                </Button>
                <Button component={RouterLink} to="/meta" variant="outlined" size="large">
                  Explore Meta
                </Button>
              </Box>
            </Stack>
          </Box>

          <Grid container spacing={2.2}>
            {features.map((feature) => (
              <Grid key={feature.title} size={{ xs: 12, md: 4 }}>
                <PanelCard title={feature.title}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {feature.description}
                  </Typography>
                </PanelCard>
              </Grid>
            ))}
          </Grid>

          <PanelCard title="Preview" subtitle="Board planner + trait tracker">
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 1 }}>
                  {boardCells.slice(0, 14).map((cell) => (
                    <Box
                      key={cell.id}
                      sx={{
                        aspectRatio: '1 / 1',
                        border: '1px solid #253045',
                        borderRadius: 1.4,
                        bgcolor: '#0b1220',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {cell.champion && <ChampionAvatar champion={cell.champion} size={34} />}
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack spacing={1}>
                  {traitRows.slice(0, 4).map((trait) => (
                    <TraitRow key={trait.name} trait={trait} />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </PanelCard>

          <PanelCard>
            <Box sx={{ textAlign: 'center', py: 1, display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                Start Climbing Today
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Build sharper boards and adapt to every patch.
              </Typography>
              <Button component={RouterLink} to="/builder" variant="contained" size="large" sx={{ mt: 1 }}>
                Launch Builder
              </Button>
            </Box>
          </PanelCard>

          <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center', pb: 1 }}>
            Not affiliated with Riot Games
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}
