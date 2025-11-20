# NPM Scripts Guide

## IP Update Scripts

Added to both `back/package.json` and `front/package.json` for easy access.

### Backend Scripts

From `back/` directory:

```bash
# Update IP to localhost (local dev)
npm run update-ip:local

# Update IP to network IP (network access)
npm run update-ip:network

# Default (uses localhost)
npm run update-ip
```

### Frontend Scripts

From `front/` directory:

```bash
# Update IP to localhost (local dev)
npm run update-ip:local

# Update IP to network IP (network access)
npm run update-ip:network

# Default (uses localhost)
npm run update-ip
```

## Usage Examples

### Local Development
```bash
# From backend directory
cd back
npm run update-ip:local
npm start

# From frontend directory
cd front
npm run update-ip:local
npm run dev
```

### Network Access
```bash
# From backend directory
cd back
npm run update-ip:network
npm start

# From frontend directory
cd front
npm run update-ip:network
npm run dev
```

## All Available Scripts

### Backend (`back/package.json`)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run production` - Start in production mode
- `npm run update-ip` - Update IP (defaults to localhost)
- `npm run update-ip:local` - Set to localhost
- `npm run update-ip:network` - Set to network IP

### Frontend (`front/package.json`)
- `npm run dev` - Start development server
- `npm run dev:network` - Start dev server on network (0.0.0.0)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run start:network` - Start production on network
- `npm run lint` - Run linter
- `npm run update-ip` - Update IP (defaults to localhost)
- `npm run update-ip:local` - Set to localhost
- `npm run update-ip:network` - Set to network IP

## Quick Reference

| Command | Location | Result |
|---------|----------|--------|
| `npm run update-ip:local` | back/ or front/ | Sets localhost |
| `npm run update-ip:network` | back/ or front/ | Sets network IP |
| `npm run update-ip` | back/ or front/ | Default (localhost) |

## Tips

- ✅ Run from either directory - both work the same
- ✅ Always restart servers after updating IP
- ✅ Use `--local` for development
- ✅ Use `--network` for mobile/network testing

