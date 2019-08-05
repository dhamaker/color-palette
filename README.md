# color-palette
Acessible Color Palette

Creates an accessible view of a color palette from a json file.  Renders a series of cards for each foreground color including swatches for background colors that meet 3:1 contrast ratio of WCAG 2.1 Level AA,.

## palette.json format

`
{
  "name" : "Example",
  "contact" : "design@example.com"
  "foreground" : [
    {
      "name" : "Black",
      "rbg" : "rgb(0,0,0)",
      "notes" : "future feature"
    }
  ],
  "background" : [
    {
      "name" : "White",
      "rbg" : "rgb(255,255,255)",
      "notes" : "future feature"
    }
  ]
}

`
