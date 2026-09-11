export type FontFamilyOption = {
  value: string;
  label: string;
  stack: string;
  language?: "latin" | "myanmar";
  featured?: boolean;
};

type MyanmarFontDefinition = readonly [file: string, label: string, featured: boolean];

const myanmarFontDefinitions: readonly MyanmarFontDefinition[] = [
  [
    "KayPhoDu-Bold.ttf",
    "KayPhoDu Bold",
    true
  ],
  [
    "KayPhoDu-Medium.ttf",
    "KayPhoDu Medium",
    false
  ],
  [
    "KayPhoDu-Regular.ttf",
    "KayPhoDu Regular",
    true
  ],
  [
    "KayPhoDu-SemiBold.ttf",
    "KayPhoDu SemiBold",
    false
  ],
  [
    "Masterpiece-Lakwel.ttf",
    "Masterpiece Lakwel",
    false
  ],
  [
    "Masterpiece-Spring- Rev.ttf",
    "Masterpiece Spring Rev",
    false
  ],
  [
    "MasterpieceCTL.ttf",
    "Masterpiece CTL",
    false
  ],
  [
    "MasterpieceStadium.ttf",
    "Masterpiece Stadium",
    false
  ],
  [
    "MasterpieceTawWin.ttf",
    "Masterpiece TawWin",
    false
  ],
  [
    "MasterpieceUniHand.ttf",
    "Masterpiece UniHand",
    false
  ],
  [
    "MasterpieceUniRound.ttf",
    "Masterpiece UniRound",
    false
  ],
  [
    "MasterpieceUniSans.ttf",
    "Masterpiece UniSans",
    true
  ],
  [
    "MasterpieceUniSerif.ttf",
    "Masterpiece UniSerif",
    false
  ],
  [
    "MasterpieceUniType.ttf",
    "Masterpiece UniType",
    false
  ],
  [
    "MasterpieceYayChanZin.ttf",
    "Masterpiece YayChanZin",
    false
  ],
  [
    "Mon3-anonta1-U2K13.ttf",
    "Mon3 Anonta",
    false
  ],
  [
    "Myanmar-Angoun.ttf",
    "Myanmar Angoun",
    false
  ],
  [
    "Myanmar-Black.ttf",
    "Myanmar Black",
    false
  ],
  [
    "Myanmar-Census.ttf",
    "Myanmar Census",
    false
  ],
  [
    "Myanmar-Chatu-Light.ttf",
    "Myanmar Chatu Light",
    true
  ],
  [
    "Myanmar-Chatu.ttf",
    "Myanmar Chatu",
    false
  ],
  [
    "Myanmar-Gantgaw.ttf",
    "Myanmar Gantgaw",
    false
  ],
  [
    "Myanmar-HeadOne.ttf",
    "Myanmar HeadOne",
    false
  ],
  [
    "Myanmar-Khyay.ttf",
    "Myanmar Khyay",
    false
  ],
  [
    "Myanmar-Kuttar.ttf",
    "Myanmar Kuttar",
    false
  ],
  [
    "Myanmar-Nayone.ttf",
    "Myanmar Nayone",
    false
  ],
  [
    "Myanmar-Njaun.ttf",
    "Myanmar Njaun",
    false
  ],
  [
    "Myanmar-Paoh-rosemary.ttf",
    "Myanmar Paoh Rosemary",
    false
  ],
  [
    "Myanmar-Paoh-unicode.ttf",
    "Myanmar Paoh Unicode",
    false
  ],
  [
    "Myanmar-Pauklay.ttf",
    "Myanmar Pauklay",
    false
  ],
  [
    "Myanmar-Phetsot.ttf",
    "Myanmar Phetsot",
    false
  ],
  [
    "Myanmar-Phiksel-Smooth.ttf",
    "Myanmar Phiksel Smooth",
    false
  ],
  [
    "Myanmar-Phiksel.ttf",
    "Myanmar Phiksel",
    false
  ],
  [
    "Myanmar-Ponenyet.ttf",
    "Myanmar Ponenyet",
    false
  ],
  [
    "Myanmar-Sabae.ttf",
    "Myanmar Sabae",
    false
  ],
  [
    "Myanmar-Sagar.ttf",
    "Myanmar Sagar",
    false
  ],
  [
    "Myanmar-Sanpya.ttf",
    "Myanmar Sanpya",
    false
  ],
  [
    "Myanmar-Sans-Pro.ttf",
    "Myanmar Sans Pro",
    true
  ],
  [
    "Myanmar-Square-Light.ttf",
    "Myanmar Square Light",
    false
  ],
  [
    "Myanmar-Tagu.ttf",
    "Myanmar Tagu",
    false
  ],
  [
    "Myanmar-Thuriya.ttf",
    "Myanmar Thuriya",
    false
  ],
  [
    "Myanmar-Waso.ttf",
    "Myanmar Waso",
    false
  ],
  [
    "Myanmar-Yinmar.ttf",
    "Myanmar Yinmar",
    false
  ],
  [
    "Myanmar3.ttf",
    "Myanmar3",
    true
  ],
  [
    "NK_SSmart2.ttf",
    "NK SSmart 2",
    false
  ],
  [
    "NK_SSmart3.ttf",
    "NK SSmart 3",
    false
  ],
  [
    "NK_SSmart4.ttf",
    "NK SSmart 4",
    false
  ],
  [
    "NamKhoneUnicode.ttf",
    "NamKhone Unicode",
    false
  ],
  [
    "Padauk- Kyaungchee.ttf",
    "Padauk Kyaungchee",
    false
  ],
  [
    "Padauk-Bold.ttf",
    "Padauk Bold",
    false
  ],
  [
    "Padauk-Regular.ttf",
    "Padauk Regular",
    true
  ],
  [
    "Padauk-medium-Ghost.ttf",
    "Padauk Medium Ghost",
    false
  ],
  [
    "PadaukBook-Bold.ttf",
    "PadaukBook Bold",
    false
  ],
  [
    "PadaukBook-Regular.ttf",
    "PadaukBook Regular",
    false
  ],
  [
    "PadaukSagar.ttf",
    "Padauk Sagar",
    false
  ],
  [
    "PadaukSgaw-Bold.ttf",
    "Padauk Sgaw Bold",
    false
  ],
  [
    "PadaukSgaw-book.ttf",
    "Padauk Sgaw Book",
    false
  ],
  [
    "PadaukSgaw-bookbold.ttf",
    "Padauk Sgaw Book Bold",
    false
  ],
  [
    "PadaukSgaw.ttf",
    "Padauk Sgaw",
    false
  ],
  [
    "Pyidaungsu-Bold.ttf",
    "Pyidaungsu Bold",
    true
  ],
  [
    "Pyidaungsu-Regular.ttf",
    "Pyidaungsu Regular",
    true
  ],
  [
    "Tharlon-Regular.ttf",
    "Tharlon",
    true
  ],
  [
    "Yunghkio.ttf",
    "Yunghkio",
    false
  ]
];

function makeMyanmarFont([, label, featured]: MyanmarFontDefinition): FontFamilyOption {
  return {
    value: `MM ${label}`,
    label,
    stack: `"MM ${label}", sans-serif`,
    language: "myanmar",
    featured,
  };
}

export const fontFamilies: FontFamilyOption[] = [
  { value: "", label: "Default", stack: "DM Sans, sans-serif", language: "latin" },
  { value: "DM Sans", label: "DM Sans", stack: "DM Sans, sans-serif", language: "latin" },
  { value: "Newsreader", label: "Newsreader", stack: "Newsreader, Georgia, serif", language: "latin" },
  { value: "Libre Baskerville", label: "Libre Baskerville", stack: "Libre Baskerville, Georgia, serif", language: "latin" },
  { value: "Space Grotesk", label: "Space Grotesk", stack: "Space Grotesk, sans-serif", language: "latin" },
  { value: "DM Mono", label: "DM Mono", stack: "DM Mono, monospace", language: "latin" },
  ...myanmarFontDefinitions.map(makeMyanmarFont),
];

