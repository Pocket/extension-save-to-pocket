# Rename folders to allow for case-sensitive file systems based on refactor to new update/structure-improvements
# NB: This is a temporary hack around renaming, we need a permanent solution

if [ -z "${CI}" ]; then
  mv src/containers/save/recommendations/* src/Containers/Save/Recommendations
  mv src/containers/save/*.js src/Containers/Save
  mv src/containers/options/* src/Containers/Options
  mv src/containers/background/* src/Containers/Background
  mv src/containers/auth/* src/Containers/Auth
  mv src/common/_locales src/Common
  rm -rf src/Common/api
  mv src/common/api src/Common
  mv src/common/*.js src/Common
else
  mv src/containers/auth src/containers/Auth
  mv src/containers/background src/containers/Background
  mv src/containers/options src/containers/Options
  mv src/containers/save src/containers/Save
  mv src/containers/save/recommendations src/containers/Save/Recommendations
  mv src/containers/save/survey src/containers/Save/Survey
  mv src/containers/save/toolbar src/containers/Save/Toolbar
  mv src/containers/sites src/containers/Sites
  mv src/containers src/Containers
  mv src/common src/Common
  mv src/components src/Components
fi