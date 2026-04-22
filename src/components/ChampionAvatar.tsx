import { Avatar, Tooltip } from '@mui/material'
import type { Champion } from '../data/mockData'

type ChampionAvatarProps = {
  champion: Champion
  size?: number
}

export function ChampionAvatar({ champion, size = 36 }: ChampionAvatarProps) {
  return (
    <Tooltip title={`${champion.name} • ${champion.cost}g`} arrow>
      <Avatar
        sx={{
          width: size,
          height: size,
          fontSize: size * 0.35,
          bgcolor: champion.color,
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        {champion.initials}
      </Avatar>
    </Tooltip>
  )
}
