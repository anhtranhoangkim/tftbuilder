import { Avatar, Box, LinearProgress, Typography } from '@mui/material'
import type { TraitInfo } from '../data/mockData'

type TraitRowProps = {
  trait: TraitInfo
}

const tierColors = {
  gold: '#f59e0b',
  silver: '#94a3b8',
  bronze: '#b45309',
} as const

export function TraitRow({ trait }: TraitRowProps) {
  const progress = (trait.count / trait.target) * 100

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 1,
        borderRadius: 2,
        bgcolor: 'rgba(15, 23, 42, 0.7)',
        border: '1px solid #1e293b',
      }}
    >
      <Avatar sx={{ width: 28, height: 28, bgcolor: '#1f2937', fontSize: 12 }}>{trait.icon}</Avatar>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {trait.name}
          </Typography>
          <Typography variant="caption" sx={{ color: tierColors[trait.tier], fontWeight: 700 }}>
            {trait.count}/{trait.target}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            mt: 0.5,
            height: 6,
            borderRadius: 999,
            bgcolor: '#0f172a',
            '& .MuiLinearProgress-bar': { bgcolor: tierColors[trait.tier] },
          }}
        />
      </Box>
      <Typography sx={{ fontWeight: 700, color: tierColors[trait.tier] }}>{trait.count}</Typography>
    </Box>
  )
}
