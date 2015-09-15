# Spartan

A highly customizable yet tiny, standalone grid system. Try the [dynamic online demo](http://spartan-grid.herokuapp.com/).

`bower install spartan-grid`

## What sets Spartan apart?

Spartan will definitely convince you with its very unique [**grid creation API**](#grid-setup).
While you define some variables in other grid systems which will then be used to create a predefined grid structure, 
Spartan provides you with a sensible set of mixins to freely customize your setup and get the most out of our grid system:
**you define** how you want to use **your grid**!

- [Features](#features)
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

- supports all features of other common grid systems:
	- fluid or static grid
	- fully responsive
	- block gutter (fixed gutter in a fluid grid)
	- column offsets
	- column reordering
- grid creation API for maximum flexibility
- customizable css classes
- tiny: **1.8KB** of minified base css

## Comparison

> Install [Chromoji](https://chrome.google.com/webstore/detail/chromoji-emoji-for-google/cahedbegdkagmcjfolhdlechbkeaieki?hl=en-GB) if you're using Chrome to see the icons.

|                           | [Spartan](http://spartan-grid.herokuapp.com) | [Bootstrap](http://getbootstrap.com/css/#grid) | [Foundation](http://foundation.zurb.com/) | [Profound](http://www.profoundgrid.com/) |
|---------------------------|:-------:|:-----------------:|:----------:|:-------:|
| less                      | ✅ | ✅ | ❌ | ❌ |
| scss                      | ✅ | ✅ | ✅ | ✅ |
| fluid                     | ✅ | ✅ | ✅ | ✅ |
| static                    | ✅ | ✅ | ✅ | ✅ |
| responsive                | ✅ | ✅ | ✅ | ✅ |
| block gutter              | ✅ | ✅ | ✅ | ❌ |
| column ordering           | ✅ | ✅ | ✅ | ✅ |
| offsets                   | ✅ | ✅ | ✅ | ✅ |
| multiple grids            | ✅ | ❌ | ❌ | ✅ |
| custom classes            | ✅ | ❌ | ❌ | ✅ |
| output css (min)          | **1.8-5.4KB** * | **8.3KB** | **18.5KB** | **~10KB** |

> * 1.8KB with the basic grid, 5.4KB with responsiveness for 3 viewports.

## Getting Started

- Install [Node](http://nodejs.org/) and a preprocessor:
	- Less: `npm install less -g`
	- SCSS: `npm install node-sass -g`

### Have a Project at the Ready?

- Integrate the [source file](https://github.com/SimonHarte/SpartanGrid/blob/master/src) in your project
- Use the [API mixin(s)](#grid-setup) to set up your grid

> Spartan will not generate any CSS until you use the setup API.

### Just want to fiddle around?

- Download Spartan
- Adjust the grid setup
- Execute:
	- `lessc grid-setup.less grid.css` or
	- `node-sass grid-setup.scss grid.css`

## Grid Structure

Here's a short example of Spartans base structure in a 12-column grid:

**HTML**

```html
<div class="g-row">
	<div class="g-col g-span-3"></div>
	<div class="g-col g-span-3"></div>
	<div class="g-col g-span-3"></div>
	<div class="g-col g-span-3"></div>
</div>
```

- `.g-row` initializes a grid row with negative left margin (gutter) and uses [H5BP clearfix](https://github
.com/h5bp/html5-boilerplate/blob/master/css/main.css#L161) to contain the floating `.g-col`s.
- `.g-col` applies default column styles like float and padding (gutter).
- `.g-span-<columns>` applies a column based width according ot the set maximum amount of columns.

Check out [responsive approaches](https://github.com/SimonHarte/SpartanGrid/blob/develop/Documentation.md#responsive-approaches) with Spartan.

## Basic Usage

### Grid Setup

There are two ways to set up a grid with Spartan, within the basic usage we only explain the simpler one. If you need more flexibility, to set up viewport dependent grids etc. go to the [advanced usage](#responsiveness-and-customization) section.

The basic grid setup requires you to call just one mixin, pass in a configuration and an optional prefix; read more about custom classes in the [documentation](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation.md#custom-classes).

**LessCSS**

```less
@grid-config: <grid-width>, <gutter-width>, <grid-columns>;

.grid-bundle(@grid-config, [@prefix: 'g']);
```

**SCSS**

```scss
$grid-config: <grid-width>, <gutter-width>, <grid-columns>;

@include grid-bundle($grid-config, [@prefix: 'g']);
```

#### Example Setup

**LessCSS**

```less
@grid-config: 100%, 20px, 12;

.grid-bundle(@grid-config);
```

**SCSS**

```scss
$grid-config: 100%, 20px, 12;

@include grid-bundle($grid-config);
```

#### Grid and Gutter Types

The grid and gutter type depend solely on the unit of the value you have given.
If you define your grid width as `100%` the grid will naturally use fluid percentage values, while it will
use fixed pixel values if you define it for example as `940px`.
This counts for the gutter as well since grid and gutter types can be defined completely independently.

> You can easily calculate a relative percentage gutter from pixel values with a built-in function that is present in both preprocessors,
 example: `percentage(20px / 940px)`

### Grid Classes and Mixins

Spartan generates grid classes according to your configuration per default. Instead of using
the generated classes you can also use similar named mixins to apply the grid with a precompiler.

**CSS**

```css
.g-span-{columns}
.g-offset-{columns}
.g-push-{columns}
.g-pull-{columns}
```

**LessCSS**

```less
.grid-span(<columns>)
.grid-offset(<columns>)
.grid-push(<columns>)
.grid-pull(<columns>)
```

**SCSS**

```scss
@include grid-span(<columns>)
@include grid-offset(<columns>)
@include grid-push(<columns>)
@include grid-pull(<columns>)
```

#### `grid-span`
Override the width of a column (default is full-width), equivalent to `.g-span-{columns}`. The mixin allows you to pass
in floating point numbers, which enables you to define literally **any** width.

Following an example of a 5 column layout in a 12 column grid:

**LessCSS**

```less
.g-col-fifth {
	.grid-span(12/5);
}
```

**SCSS**

```scss
.g-col-fifth {
	@include grid-span(12/5);
}
```

#### `grid-offset`
Indent a column by the defined amount of grid columns, equivalent to `.g-offset-{columns}`.
While there are just positive indents in generated classes, you could also call this mixin with negative values.

#### `grid-push` and `grid-pull`
Together with the additional class `.g-reorder` on `.g-row` you can reorder columns visually without changing the 
order in HTML. Equivalent to `.g-push-{columns}` and `.g-pull-{columns}`, similar behavior as `.grid-offset()`.

> Note that you may run into problems if these are used within certain responsive layouts as they use relative positioning.

##### `grid-reorder`

You can alternatively use the mixin `grid-row-reorder()` together with `grid-reorder()` and pass in any number.
If the passed number is positive or zero, it will simply call `grid-push()` and if the number is negative `grid-pull()` instead.

## Advanced Usage

There's a detailed documentation about every aspect of Spartan with different approaches to setting up your most flexible grid.

- [LessCSS](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation-less.md)
- [SCSS](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation-scss.md)

> You basically have the same mixins which you just need to apply with preprocessor-specific syntax

**Overview**

- Grid Creation API
	- [LessCSS](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation-less.md#grid-creation-api)
	- [SCSS](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation-scss.md#grid-creation-api)
- Viewport Dependent Configurations
	- [LessCSS](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation-less.md#viewport-dependent-configurations)
	- [SCSS](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation-scss.md#viewport-dependent-configurations)
- Custom Classes
	- [LessCSS](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation-less.md#custom-classes)
	- [SCSS](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation-scss.md#custom-classes)
- Semantic Grid
	- [LessCSS](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation-less.md#semantic-grid)
	- [SCSS](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation-scss.md#semantic-grid)
- Responsive Approaches
	- [LessCSS](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation-less.md#responsive-approaches)
	- [SCSS](https://github.com/SimonHarte/SpartanGrid/blob/master/Documentation-scss.md#responsive-approaches)

## Browser Support

**Not** supported:

- **IE7-**

**Partially** supported:

- **IE8**: basic grid working properly, no `:nth-of-type` clearing
- **Safari**: as explained [below](#the-safari-problem)

### The Safari Problem

Unfortunately all Safari browsers up to the latest version have an unfortunate subpixel rendering for widths and always round 
values down to the next integer when calculating rendered pixels. So a width declaration of for example `88.333px` or
 even `88.666px` will always be rendered as `88px`. This of course causes issues when your grid configuration 
 leads to such values or in general when you use a fluid grid, because we get a small displacement of columns.

There's an [article from John Resig](http://ejohn.org/blog/sub-pixel-problems-in-css/) about this subject.

Note that all grid systems suffer from this issue and merely provide workarounds in some cases,
Spartan does not try to do that but optimises calculations for it to render as precise as possible.
