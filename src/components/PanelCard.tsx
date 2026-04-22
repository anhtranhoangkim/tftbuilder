import { Card, CardContent, Stack, Typography, type CardProps } from '@mui/material'

type PanelCardProps = CardProps & {
  title?: string
  subtitle?: string
}

export function PanelCard({ title, subtitle, children, sx, ...cardProps }: PanelCardProps) {
  return (
    <Card sx={{ bgcolor: 'background.paper', ...sx }} {...cardProps}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        {(title || subtitle) && (
          <Stack sx={{ mb: 1.8 }}>
            {title && (
              <Typography variant="h6" sx={{ fontSize: 19, fontWeight: 700 }}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
                {subtitle}
              </Typography>
            )}
          </Stack>
        )}
        {children}
      </CardContent>
    </Card>
  )
}
