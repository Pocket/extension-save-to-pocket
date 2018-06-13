# Deviations

Here we outline the changes made from the standard create-react-app ejection.  Primary reasons for ejection as:
- Multiple entry points
- Writing Multiple files to disk
- YAML processing of manifest (is this neccesary?)

## Webpack

Most webpack changes revolve around supporting additional files required when loading the extension.

### Development
- Removed index.js requirement
// TODO: - Added requirement for keys.json
- Updating Paths
- Adding new entry points
- Adjusting location of output
- Adjusting name of output