import de from './de/messages.json'
import en from './en/messages.json'
import es from './es/messages.json'
import es_419 from './es_419/messages.json'
import fr from './fr/messages.json'
import it from './it/messages.json'
import ja from './ja/messages.json'
import ko from './ko/messages.json'
import nl from './nl/messages.json'
import pl from './pl/messages.json'
import pt_BR from './pt_BR/messages.json'
import pt_PT from './pt_PT/messages.json'
import ru from './ru/messages.json'
import zh_CN from './zh_CN/messages.json'
import zh_TW from './zh_TW/messages.json'

function getCurrentLanguageCode() {
  var language = navigator.languages
    ? navigator.languages[0]
    : navigator.language || navigator.userLanguage

  language = typeof language !== 'undefined' ? language.toLowerCase() : 'en'

  if (language.indexOf('en') === 0) return 'en' // English
  if (language.indexOf('de') === 0) return 'de' // German
  if (language.indexOf('fr') === 0) return 'fr' // French
  if (language.indexOf('it') === 0) return 'it' // Italian
  if (language.indexOf('es_419') === 0) return 'es_419' // Spanish (Latin America and Caribbean)
  if (language.indexOf('es') === 0) return 'es' // Spanish
  if (language.indexOf('ja') === 0) return 'ja' // Japanese
  if (language.indexOf('ru') === 0) return 'ru' // Russian
  if (language.indexOf('ko') === 0) return 'ko' // Korean
  if (language.indexOf('nl') === 0) return 'nl' // Dutch
  if (language.indexOf('pl') === 0) return 'pl' // Polish
  if (language.indexOf('pt_BR') === 0) return 'pt_BR' // Portuguese Brazil
  if (language.indexOf('pt_PT') === 0) return 'pt_PT' // Portuguese Portugal
  if (language.indexOf('zh_CN') === 0) return 'zh_CN' // Chinese Simplified
  if (language.indexOf('zh_TW') === 0) return 'zh_TW' // Chinese Traditional
  return 'en' // Default is English
}

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

export function localize(string) {
  return currentStrings[string]?.message
}
