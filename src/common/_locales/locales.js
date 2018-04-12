import { getCurrentLanguageCode } from '../helpers'

import de from './de/strings.json'
import en from './en/strings.json'
import es from './es/strings.json'
import es_419 from './es_419/strings.json'
import fr from './fr/strings.json'
import it from './it/strings.json'
import ja from './ja/strings.json'
import ko from './ko/strings.json'
import nl from './nl/strings.json'
import pl from './pl/strings.json'
import pt_BR from './pt_BR/strings.json'
import pt_PT from './pt_PT/strings.json'
import ru from './ru/strings.json'
import zh_CN from './zh_CN/strings.json'
import zh_TW from './zh_TW/strings.json'

function localizedStrings() {
  const localizedCopy = {
    de,
    en,
    es,
    es_419,
    fr,
    it,
    ja,
    ko,
    nl,
    pl,
    pt_BR,
    pt_PT,
    ru,
    zh_CN,
    zh_TW
  }

  const currentLanguage = getCurrentLanguageCode()
  return localizedCopy[currentLanguage] || localizedCopy['en']
}

const currentStrings = localizedStrings()

export function localize(section, string) {
  return currentStrings[section][string]
}
