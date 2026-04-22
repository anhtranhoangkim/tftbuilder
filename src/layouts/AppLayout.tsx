import SearchIcon from '@mui/icons-material/Search'
import {
  AppBar,
  Avatar,
  Box,
  Container,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { label: 'Meta', path: '/meta' },
  { label: 'Comps', path: '/comps' },
  { label: 'Builder', path: '/builder' },
  { label: 'Champions', path: '/champions' },
]

export function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const currentTab = navItems.findIndex((item) => location.pathname.startsWith(item.path))

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 4 }}>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          bgcolor: 'rgba(11, 15, 26, 0.92)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #1f2937',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 2, minHeight: 74 }}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ fontWeight: 700, letterSpacing: 0.4, textDecoration: 'none', color: 'text.primary' }}
            >
              TFT Builder
            </Typography>

            <Tabs
              value={currentTab === -1 ? false : currentTab}
              onChange={(_, value: number) => navigate(navItems[value].path)}
              textColor="inherit"
              indicatorColor="primary"
              sx={{
                ml: 2,
                flex: 1,
                minHeight: 44,
                '& .MuiTab-root': {
                  minHeight: 44,
                  textTransform: 'none',
                  color: 'text.secondary',
                  fontWeight: 600,
                },
              }}
            >
              {navItems.map((item) => (
                <Tab key={item.path} label={item.label} />
              ))}
            </Tabs>

            <TextField
              size="small"
              placeholder="Search comps or champions"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                width: 240,
                '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' },
              }}
            />
            <Avatar sx={{ width: 34, height: 34, bgcolor: '#1f2937' }}>K</Avatar>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </Box>
  )
}
