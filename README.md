# Spartan

A tiny, easy to use yet highly customizable, standalone grid system.

`bower install spartan-grid`

`npm install spartan-grid`

Try the [dynamic online demo](http://spartan-grid.herokuapp.com/).

## What sets Spartan apart?

Spartan will definitely convince you with its very unique [**grid creation API**](#grid-setup).
While you define some variables in other grid systems which will then be used to create a predefined grid structure, 
Spartan provides you with a sensible set of mixins to freely customize your setup and get the most out of our grid system:
**you define** how you want to use **your grid**!

- [Features](#features)
- [Websites using Spartan](#websites-using-spartan)
- [Comparison with other Grids](#comparison)
- [Getting Started](#getting-started)
- [Grid Structure](#grid-structure)
- [Basic Usage](#basic-usage)
  - [Grid Setup](#grid-setup)
  - [Grid Classes and Mixins](#grid-classes-and-mixins)
- [Advanced Usage](#advanced-usage)
- [Browser Support](#browser-support)
  - [The Safari Problem](#the-safari-problem)

## Features

- supports all common grid features:
  - fluid or static grid cells
  - independent gutter, fluid or static
  - fully responsive
  - cell offsets
  - cell reordering
- grid creation API for maximum flexibility
- straight forward, easy to use
- freely customizable css classes
- tiny: **2.2KB** of minified base css

## LessCSS Support

Note that from version 6.0.0 on we will drop LessCSS support because of lacking demand and simpler maintenance.

> For LessCSS Support you can use Spartan v5.1.0

## Websites using Spartan

- [http://www.victorinox.com/](http://www.victorinox.com/)
- [http://www.kaufland.de](http://www.kaufland.de)
- [http://report.migros.ch/](http://report.migros.ch/)
- [https://www.schwaebisch-hall.de/](https://www.schwaebisch-hall.de/)
- [https://www.visana.ch/](https://www.visana.ch/)

... and many more.

## Getting Started

### Have a Project at the Ready?

- Integrate the [source file](https://github.com/SimonHarte/SpartanGrid/blob/master/src) in your project
- Use [API mixin(s)](#grid-setup) to set up your grid

> Spartan will not generate any CSS until you use the setup API.

### Just want to fiddle around?

- Download Spartan
- Install [NodeJS](http://nodejs.org/) and run `npm install` in the project directory
- Adjust the grid setup
- Execute `npm start`

## Grid Structure

Here's a short example of Spartans base structure in a 12-cell grid:

**HTML**

```html
<div class="g-container">
	<div class="g-cell g-span-3"></div>
	<div class="g-cell g-span-3"></div>
	<div class="g-cell g-span-3"></div>
	<div class="g-cell g-span-3"></div>
</div>
```

- `.g-container` initializes a grid container with negative left margin (gutter) and uses [H5BP clearfix](https://github.com/h5bp/html5-boilerplate/blob/master/css/main.css#L161) to contain the floating `.g-cell`s.
- `.g-cell` applies default cell styles like float and padding (gutter).
- `.g-span-<cells>` applies a cell based width relative to the set maximum amount of cells.

Check out [responsive approaches](#advanced-usage) with Spartan.

## Basic Usage

### Grid Setup

There are two ways to set up a grid with Spartan, within the basic usage we only explain the simpler one. If you need more flexibility, to set up viewport dependent grids etc. go to the [advanced usage](#advanced-usage) section.

The basic grid setup requires you to call just one mixin, pass in a configuration and an optional namespace; read more about custom classes in the [documentation](#advanced-usage).

**SCSS**

```scss
@import 'src/spartan';

@include grid-bundle(<grid-width>, <gutter-width>, <grid-cells>, [grid-namespace]);
```

#### Example Setup

The following will implement a **fluid grid** with a fixed gutter of **20 pixel** and **12 cells**:

**SCSS**

```scss
@include grid-bundle(100%, 20px, 12);
```

#### Config Types

There are actually 4 different ways to pass in your configuration:

**Parameters**

```scss
@include grid-bundle(100%, 20px, 12);
```

**Named Parameters**

```scss
@include grid-bundle($width: 100%, $gutter: 20px, $cells: 12);
```

**List**

```scss
$grid-config: 100%, 20px, 12;

@include grid-bundle($grid-config);
```

**Map**

```scss
$grid-config: (
    width: 100%,
    gutter: 20px,
    cells: 12
);

@include grid-bundle($grid-config);
```

> In the case of named parameters and a config map you could even omit settings you don't need to change and rely on the grid's defaults, i.e. (width: 100%, gutter: 0, cells: 12)

#### Grid and Gutter Types

The grid and gutter type depend solely on the unit of the value you have given.
If you define your grid width as `100%` the grid will naturally use fluid percentage values, while it will
use fixed pixel values if you define it for example as `940px`.
This counts for the gutter as well since grid and gutter types can be defined completely independently.

> You can easily calculate a relative percentage gutter from other values with a built-in function: `percentage(20px / 940px)`

### Grid Classes and Mixins

Spartan generates grid classes according to your configuration,
but instead of applying these classes you can also use similar named mixins to apply the grid in your css.

**CSS**

```css
.g-span-{cells}
.g-offset-{cells}
.g-push-{cells}
.g-pull-{cells}
```

**SCSS**

```scss
@include grid-span(<cells>)
@include grid-offset(<cells>)
@include grid-push(<cells>)
@include grid-pull(<cells>)
```

#### `grid-span`

Override the width of a cell (default is full-width), equivalent to `.g-span-{cells}`. The mixin allows you to pass
in floating point numbers, which enables you to define literally **any** width.

Following an example of a 5 cell layout in a 12 cell grid:

**SCSS**

```scss
.g-cell-fifth {
	@include grid-span(12/5);
}
```

#### `grid-offset`

Indent a cell by the defined amount of grid cells, equivalent to `.g-offset-{cells}`.
While there are just positive indents in generated classes, you could also call this mixin with negative values.

#### `grid-push` and `grid-pull`

You can reorder cells visually without changing the order in HTML with these mixins.
Equivalent to `.g-push-{cells}` and `.g-pull-{cells}`, similar behavior as `.grid-offset()`.

##### `grid-reorder`

You can alternatively use the mixin `grid-reorder()` and pass in any number.
If the passed number is positive or zero, it will simply call `grid-push()` and if the number is negative `grid-pull()` instead.

## Advanced Usage

There's a detailed [documentation](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation.md) about every aspect of Spartan with different approaches to setting up your most flexible grid.

**Overview**

- [Grid Creation API](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation.md#grid-creation-api)
- [Viewport Dependent Configurations](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation.md#viewport-dependent-configurations)
- [Custom Classes](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation.md#custom-classes)
- [Semantic Grid](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation.md#semantic-grid)
- [Responsive Approaches](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation.md#responsive-approaches)

## Browser Support

**Not** supported:

- **IE7-**
