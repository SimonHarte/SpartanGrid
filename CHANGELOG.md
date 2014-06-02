# Changelog

## 3.0.1

- optimised less code
- prefix all variable definitions to prevent overwriting
- remove prefixes where not needed

## 3.0.0

- adjusted grid setup api for simple and advanced usage
- only left margin/padding for reduced css and fix if grid touches window edges
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
