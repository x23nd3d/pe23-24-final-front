const colorClasses = [
  ["Navy", "Navy"],
  ["Black", "Black"],
  ["JetBlack", "Jet Black"],
  ["Charcoal", "Charcoal"],
  ["PearlGray", "Pearl Gray"],
  ["SmokeGray", "Smoke Gray"],
  ["AirForce", "Air Force"],
  ["DustyOlive", "Dusty Olive"],
  ["CamelotGray", "Camelot Gray"],
  ["SuperLightIndigo", "Super Light Indigo"],
  ["Stone", "Stone"],
  ["Khaki", "Khaki"],
  ["GrayHarbor", "Gray Harbor"],
  ["BlueBlazer", "Blue Blazer"],
  ["DuffleBag", "Duffle Bag"],
  ["Kalamata", "Kalamata"],
  ["DarkBlue", "Dark Blue"],
  ["Denim", "Denim"],
  ["Mauz", "Mauz"],
  ["MidnightNavy", "Midnight Navy"],
  ["White", "White"],
  ["Night Blue", "NightBlue"],
  ["Nero", "Nero"],
  ["WhiteNight", "White Night"],
  ["MarroneBrown", "Marrone Brown"],
  ["Coastal", "Coastal"],
  ["BlackDial", "Black Dial"],
  ["BlackGold", "Black/Gold"],
  ["Gray", "Gray"],
  ["BlueSilver", "Blue/Silver"],
  ["TwoTone", "Two Tone"],
  ["Silver", "Silver"],
  ["ShinyEndura", "Shiny Endura"],
  ["GoldBrownGradient", "Gold/Brown Gradient"],
  ["Brown", "Brown"],
  ["FlowBoneRed", "Flow/Bone/Red"],
]

const colorsMap = new Map(colorClasses);

export default function colorize (color) {
    for (const [key, value] of colorsMap.entries()) {
      if (value === color) {
        return key;
      }
    }
  }