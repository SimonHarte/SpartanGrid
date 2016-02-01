# Changelog

## 5.0.3

- added SCSS support!
- simplified and standardised API for LessCSS and SCSS
- `grid-unlock()` only needs 3 instead of 5 configuration parameters now: grid width, gutter width and columns
- grid and gutter type depend on passed types

## 4.0.2

- use :nth-of-type instead of :nth-child selector so we skip possible non-grid elements

## 4.0.1

- fix grid gutter mixin with important statement

## 4.0.0

- new mixins for semantic grid implemenation
- gutter styles now separated from `.grid-unlock()` for maximum flexibility
- gutters can be any unit (px, %, em/rem)
- more intuitive grid config order
- maximised precision of calculated values
- `.grid-core()` takes a new optional parameter to omit generation of core css
- `.grid-generate()` takes a new optional parameter to adjust the amount of classes
- less cluttering of global space with lib internally used variables

## 3.3.1

- added bower installation

## 3.3.0

- enable prefixed configuration sensitive classes
- restructure readme and documentation

## 3.1.0

- optimised grid precision, especially for safari
- no layout containers anymore -> reduced css output
- smaller fixes

## 3.0.0

- adjusted grid setup api for simple and advanced usage
- only left margin/padding for reduced css and fix if grid touches window edges
- grid default namespace "g-"
- merge `.grid-gutter()` into `.grid-unlock()`
- optimise prefixing of all grid variable definitions to prevent overwriting
- more consistent grid classes
- docs overhauled

## 2.2.0

- pass grid configuration as separate values or in a reusable variable

## 2.1.0

- custom prefixes for grid class generation

## 2.0.0

- responsibly has a new name: Spartan!
- grid creation API: `.grid-core()`, `.grid-unlock()` and `.grid-generate()`
- generate viewport dependent grid css
- all global grid mixins prefixed: `.grid-[mixin]`
- reduce generated column selectors, don't use `.row` as necessary parent

## 1.2.0

- third parameter for `.col-set()` mixin available to define offsets

## 1.1.0

- block gutter implementation finished!
- use setup variable `@grid-gutter-type` to define it as either fluid or fixed

## 1.0.0

- full calculations for either fluid or static grid
- automated generation of grid classes
- provide simple mixins to apply all grid styles
- provide mixins to set up responsive layouts
- responsive layout examples
- full documentation
