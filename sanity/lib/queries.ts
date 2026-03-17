const imageFields = `
  asset->{ _id, url, metadata { lqip, dimensions } },
  alt, hotspot, crop
`

export const HOME_PAGE_QUERY = /* groq */ `
  *[_type == "homePage" && _id == "homePage"][0]{
    hero { image { ${imageFields} }, title, subtitle },
    poeticParagraphs,
    secondParagraphs,
    pullQuote,
    mapCta { heading, description },
    firstImage { ${imageFields} },
    secondImage { ${imageFields} },
  }
`

export const ACTIVITIES_PAGE_QUERY = /* groq */ `
  *[_type == "activitiesPage" && _id == "activitiesPage"][0]{
    hero { image { ${imageFields} }, title, subtitle },
    intro,
    waterSection {
      heading,
      items[] { _key, image { ${imageFields} }, title, description }
    },
    landSection {
      heading,
      items[] { _key, image { ${imageFields} }, title, description }
    },
    regionSection {
      heading,
      places[] { _key, name, description },
      image { ${imageFields} }
    },
    fireSection {
      heading, text,
      closingImage { ${imageFields} }
    },
  }
`

export const STAYING_PAGE_QUERY = /* groq */ `
  *[_type == "stayingPage"][0]{
    hero { image { ${imageFields} }, title, subtitle },
    intro,
    buildingImages[] { _key, ${imageFields} },
    sleepingSection {
      heading,
      paragraphs,
      image { ${imageFields} }
    },
    sharedSpacesSection { heading, paragraphs },
    galleryImages[] { _key, ${imageFields} },
    groupSpacesSection { heading, paragraphs },
    closingImage { ${imageFields} },
  }
`

export const ISLAND_PAGE_QUERY = /* groq */ `
  *[_type == "islandPage"][0]{
    hero { image { ${imageFields} }, title, subtitle },
    intro,
    climateSection { heading, paragraphs, image { ${imageFields} } },
    mountainsSection { heading, paragraphs, image { ${imageFields} } },
    wildlifeSection { heading, paragraphs, image { ${imageFields} } },
  }
`

export const RITUALS_PAGE_QUERY = /* groq */ `
  *[_type == "ritualsPage" && _id == "ritualsPage"][0]{
    hero { image { ${imageFields} }, title, subtitle },
    intro,
    midImage { ${imageFields} },
    secondParagraphs,
    shapedTogetherSection {
      heading, paragraphs,
      image { ${imageFields} }
    },
    gatheringsSection { heading, paragraphs, pullQuote },
  }
`

export const CONTACT_PAGE_QUERY = /* groq */ `
  *[_type == "contactPage"][0]{
    hero { image { ${imageFields} }, title, subtitle },
    introText,
  }
`
