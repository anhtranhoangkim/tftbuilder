import { Chip } from '@mui/material'

type TierChipProps = {
  tier: 'S' | 'A' | 'B'
}

const tierStyles = {
  S: { bgcolor: '#f59e0b', color: '#111827' },
  A: { bgcolor: '#60a5fa', color: '#111827' },
  B: { bgcolor: '#a78bfa', color: '#111827' },
}

export function TierChip({ tier }: TierChipProps) {
  return (
    <Chip
      size="small"
      label={`${tier} Tier`}
      sx={{
        fontWeight: 700,
        height: 23,
        ...tierStyles[tier],
      }}
    />
  )
}
