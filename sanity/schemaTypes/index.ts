import { pageHero } from './shared/pageHero'
import { richText } from './shared/richText'
import { homePage } from './homePage'
import { activitiesPage } from './activitiesPage'
import { stayingPage } from './stayingPage'
import { islandPage } from './islandPage'
import { ritualsPage } from './ritualsPage'
import { contactPage } from './contactPage'

export const schemaTypes = [
  // Shared objects
  pageHero,
  richText,
  // Page singletons
  homePage,
  activitiesPage,
  stayingPage,
  islandPage,
  ritualsPage,
  contactPage,
]
